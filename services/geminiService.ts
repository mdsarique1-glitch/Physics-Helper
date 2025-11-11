import { GoogleGenAI, Type } from "@google/genai";
import type { QuizQuestion, CertificateData, Indicator, Topic, SoloImprovementReport, RevisionNote, Category, SubTopic, QuestionExplanation } from '../types';

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });
const modelFlash = 'gemini-2.5-flash';
const modelPro = 'gemini-2.5-pro';

const singleQuestionSchema = {
    type: Type.OBJECT,
    properties: {
        question: { type: Type.STRING },
        options: { type: Type.ARRAY, items: { type: Type.STRING } },
        correctAnswer: { 
            type: Type.STRING,
            description: "The text of the correct answer. This MUST be an exact match to one of the strings provided in the 'options' array."
        },
    },
    required: ['question', 'options', 'correctAnswer']
};

const parseGeminiJson = <T>(text: string): T => {
    const match = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    const jsonString = match ? match[1] : text;
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        console.error("Failed to parse JSON from Gemini response:", jsonString);
        throw new Error("Invalid JSON format received from API.");
    }
};

const withRetry = async <T>(fn: () => Promise<T>, retries = 2, delay = 500): Promise<T> => {
    let lastError: Error | null = new Error('Retry logic failed without catching an error.');
    for (let i = 0; i <= retries; i++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error as Error;
            if (i < retries) {
                console.warn(`API call attempt ${i + 1} of ${retries + 1} failed. Retrying in ${delay * (i + 1)}ms...`, lastError.message);
                await new Promise(res => setTimeout(res, delay * (i + 1)));
            }
        }
    }
    console.error(`API call failed after ${retries + 1} attempts.`);
    throw lastError;
};

const apiCallWithFallback = async <T>(
    apiFn: (model: string) => Promise<T>,
    primaryModel: string = modelFlash,
    fallbackModel: string = modelPro
): Promise<T> => {
    try {
        return await apiFn(primaryModel);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        if (errorMessage.includes('[503]') || errorMessage.includes('UNAVAILABLE')) {
            console.warn(`Primary model '${primaryModel}' is busy. Falling back to '${fallbackModel}'.`);
            return await apiFn(fallbackModel);
        }
        throw error;
    }
};


// Mulberry32: A simple, seeded pseudo-random number generator.
const mulberry32 = (seed: number) => {
    return () => {
        let t = seed += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
};

const shuffleArray = <T>(array: T[], prng: () => number = Math.random): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(prng() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

const generateSingleQuestion = async (
    syllabusPoint: string,
    subject: 'physics' | 'biology' | 'chemistry',
    seed: number
): Promise<QuizQuestion> => {
    const subjectTitle = subject.charAt(0).toUpperCase() + subject.slice(1);
    
    let questionStyleGuidelines = '';
    if (subject === 'physics') {
        questionStyleGuidelines = `**Question Style:** The question should test conceptual understanding, definitions, formulas, or SI units related to the syllabus point.`;
    } else if (subject === 'biology') {
        questionStyleGuidelines = `**Question Style:** The question should test understanding of definitions, biological processes, structure/function, or conceptual application related to the syllabus point.`;
    } else { // subject is 'chemistry'
        questionStyleGuidelines = `**Question Style:** The question should test understanding of definitions, chemical properties, reactions, or foundational concepts related to the syllabus point.`;
    }

    const prompt = `You are an expert IGCSE ${subjectTitle} tutor. Generate one high-quality multiple-choice question based strictly on the following syllabus point.

**Syllabus Point:**
"${syllabusPoint}"

**Critical Guidelines for the Question:**
- The question must exclusively test the concept mentioned in the syllabus point.
- ${questionStyleGuidelines}
- **Correct Answer Match:** The value for 'correctAnswer' must be an exact, verbatim copy of one of the strings from the 'options' array.
- **Plausible Options:** Provide 4 distinct and plausible answer options. Incorrect options (distractors) must be well-crafted to target common student misconceptions.
- **No Calculations:** The question should test recognition and understanding, not mathematical calculation.`;

    const makeApiCall = async (model: string) => {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                systemInstruction: `You are an expert IGCSE ${subjectTitle} tutor specializing in creating high-quality, syllabus-aligned multiple-choice questions.`,
                responseMimeType: "application/json",
                responseSchema: singleQuestionSchema,
                seed: seed,
            },
        });
        return parseGeminiJson<QuizQuestion>(response.text);
    };

    const parsed = await apiCallWithFallback(makeApiCall);

    if (!parsed.question || !Array.isArray(parsed.options) || parsed.options.length === 0 || !parsed.correctAnswer) {
        console.error("Received malformed single question from API:", parsed);
        throw new Error("Invalid format for a single quiz question received from API.");
    }
    return parsed;
};

export const generateQuizQuestions = async (
    studentName: string,
    categories: Category[],
    questionCount: number,
    syllabusLevel: 'core' | 'extended',
    subject: 'physics' | 'biology' | 'chemistry',
    seed?: number
): Promise<QuizQuestion[]> => {
    // For solo quizzes (no seed provided), create one to ensure variety per session.
    // For group quizzes, use the provided seed for consistency.
    const quizSeed = seed ?? Math.floor(Math.random() * 1000000);
    const prng = mulberry32(quizSeed);

    const getAllSyllabusPoints = (cats: Category[]): string[] => {
        const points: string[] = [];
        cats.forEach(category => {
            const processTopic = (topic: Topic, path: string) => {
                if (syllabusLevel === 'core' && topic.isSupplement) return;
                
                const currentPath = `${path} > ${topic.name}`;

                if (topic.indicators) {
                    topic.indicators.forEach(indicator => {
                        if (syllabusLevel === 'core' && indicator.isSupplement) return;
                        points.push(`${currentPath}: ${indicator.name}`);
                    });
                }

                if (topic.subTopics) {
                    topic.subTopics.forEach(subTopic => {
                        if (syllabusLevel === 'core' && subTopic.isSupplement) return;
                        const subTopicPath = `${currentPath} > ${subTopic.name}`;
                         if (subTopic.indicators) {
                            subTopic.indicators.forEach(indicator => {
                                if (syllabusLevel === 'core' && indicator.isSupplement) return;
                                points.push(`${subTopicPath}: ${indicator.name}`);
                            });
                        }
                    });
                }
            };

            category.topics.forEach(topic => processTopic(topic, category.name));
        });
        return points;
    };

    const allPoints = getAllSyllabusPoints(categories);
    if (allPoints.length < questionCount) {
        throw new Error(`Not enough syllabus content for a ${questionCount}-question quiz in the selected topics. Please select more topics or a smaller quiz size.`);
    }

    const shuffledPoints = shuffleArray(allPoints, prng);
    // Deterministically select exactly one syllabus point for each question.
    const pointsForQuiz = shuffledPoints.slice(0, questionCount);

    const BATCH_SIZE = 5;
    const generatedQuestions: QuizQuestion[] = [];
    
    // Process requests in batches to avoid overwhelming the API
    for (let i = 0; i < pointsForQuiz.length; i += BATCH_SIZE) {
        const batchPoints = pointsForQuiz.slice(i, i + BATCH_SIZE);
        const batchPromises = batchPoints.map((point, indexInBatch) => {
            const overallIndex = i + indexInBatch;
            const questionSeed = quizSeed + overallIndex; // Ensure deterministic seed for each question
            
            // KEY CHANGE: Wrap the individual API call in a retry mechanism.
            // This prevents a single failed request from restarting the entire quiz generation.
            return withRetry(() => generateSingleQuestion(point, subject, questionSeed));
        });
        
        try {
            const batchResults = await Promise.all(batchPromises);
            generatedQuestions.push(...batchResults);
        } catch (error) {
            console.error("A batch of questions failed to generate despite individual retries.", error);
            // If a batch fails after all retries, the entire quiz generation fails.
            // This is better than the old system which would have restarted from scratch.
            throw new Error("The AI model failed to generate a portion of the quiz. Please try again.");
        }
    }
    
    // Use a separate deterministic PRNG for shuffling the options to keep it independent of question generation.
    const prngForShuffle = mulberry32(quizSeed + 1);

    const validatedQuestions = generatedQuestions.map((q: any) => {
        if (!q || !q.question || !Array.isArray(q.options) || q.options.length === 0 || !q.correctAnswer) {
            console.warn("Received malformed question from API, skipping:", q);
            return null;
        }

        let options = q.options.slice(0, 4);
        let correctAnswer = q.correctAnswer;

        const saneCorrectAnswer = correctAnswer.trim().toLowerCase();
        const matchingOption = options.find((opt: string) => opt.trim().toLowerCase() === saneCorrectAnswer);
        
        if (matchingOption) {
            correctAnswer = matchingOption;
        } else {
            console.warn(`Correct answer from API ("${correctAnswer}") was not in options. Auto-correcting question options.`, { question: q.question, options: options });
            // Replace the last option to guarantee correctness
            if (options.length < 4) {
                options.push(correctAnswer);
            } else {
                options[options.length - 1] = correctAnswer;
            }
        }
        
        const shuffledOptions = shuffleArray(options, prngForShuffle);

        return { 
            question: q.question,
            options: shuffledOptions, 
            correctAnswer: correctAnswer 
        };
    }).filter((q): q is QuizQuestion => q !== null);

    if (validatedQuestions.length !== questionCount) {
         throw new Error(`The AI failed to generate the required number of valid questions. Expected ${questionCount}, got ${validatedQuestions.length}.`);
    }

    return validatedQuestions;
};

const certificateDataSchema = {
    type: Type.OBJECT,
    properties: {
        summary: { type: Type.STRING, description: "A short, encouraging, and positive performance summary celebrating the student's achievement." }
    },
    required: ["summary"]
};

export const getCertificateData = async (studentName: string, correctAnswers: number, totalQuestions: number, topics: string[], subject: 'physics' | 'biology' | 'chemistry', isGroupChallenge?: boolean): Promise<CertificateData> => {
    let prompt: string;
    const subjectTitle = subject.charAt(0).toUpperCase() + subject.slice(1);

    if (isGroupChallenge) {
        prompt = `
Task: Generate a short, positive performance summary for a student's certificate from a group challenge.

**Context:**
- Subject: IGCSE ${subjectTitle}
- Type: Group Challenge
- Score: ${correctAnswers} out of ${totalQuestions}
- Topics Covered: ${topics.join(', ')}

**Instructions:**
- The summary must celebrate the achievement in the context of a group challenge.
- Do NOT mention any student names.

**Required Output (JSON):**
- **summary**: A single string for the certificate summary.
`;
    } else {
        prompt = `
Task: Generate a short, positive performance summary for an IGCSE ${subjectTitle} student's certificate.

**Student Profile:**
- Name: ${studentName}
- Score: ${correctAnswers} out of ${totalQuestions}
- Topics Covered: ${topics.join(', ')}

**Required Output (JSON):**
- **summary**: A single string celebrating the student's achievement on the quiz topics.
`;
    }

    const apiCall = async () => {
        const makeApiCall = async (model: string) => {
            const response = await ai.models.generateContent({
                model,
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: certificateDataSchema,
                },
            });
            const data = parseGeminiJson<CertificateData>(response.text);
            if (!data.summary) {
                throw new Error("API returned invalid certificate data format (missing summary).");
            }
            return data;
        };
        return apiCallWithFallback(makeApiCall);
    };
    
    return withRetry(apiCall).catch(error => {
        console.error("Error getting certificate data after retries:", error);
        throw new Error("Failed to get certificate data from Gemini API.");
    });
};

const soloImprovementReportSchema = {
    type: Type.OBJECT,
    properties: {
        improvementAreas: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A list of 2-3 specific topics or concepts the student should focus on for improvement."
        },
        motivationalMessage: {
            type: Type.STRING,
            description: "A short, encouraging message motivating the student to study more and retake the quiz to earn a certificate."
        }
    },
    required: ["improvementAreas", "motivationalMessage"]
};

export const getSoloImprovementReport = async (studentName: string, correctAnswers: number, totalQuestions: number, topics: string[], subject: 'physics' | 'biology' | 'chemistry'): Promise<SoloImprovementReport> => {
    const accuracy = ((correctAnswers / totalQuestions) * 100).toFixed(0);
    const subjectTitle = subject.charAt(0).toUpperCase() + subject.slice(1);
    const prompt = `
Task: Generate a constructive improvement report for an IGCSE ${subjectTitle} student who did not pass their quiz.

**Student Profile:**
- Name: ${studentName}
- Score: ${correctAnswers} out of ${totalQuestions} (${accuracy}%)
- Topics Covered: ${topics.join(', ')}

**Required Output (JSON):**
1.  **improvementAreas**: An array of 2-3 specific, actionable topics from the list above that the student should review. For example, for Physics: "Distinguishing between scalar and vector quantities". For Biology: "The role of osmosis in plant cells".
2.  **motivationalMessage**: A brief, encouraging message to motivate the student to try again.

Generate a JSON object that strictly follows this structure.`;

    const apiCall = async () => {
        const makeApiCall = async (model: string) => {
            const response = await ai.models.generateContent({
                model,
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: soloImprovementReportSchema,
                },
            });
            const report = parseGeminiJson<SoloImprovementReport>(response.text);
            if (!report.improvementAreas || !report.motivationalMessage) {
                throw new Error("API returned invalid report data format.");
            }
            return report;
        };
        return apiCallWithFallback(makeApiCall);
    };
    
    return withRetry(apiCall).catch(error => {
        console.error("Error getting solo improvement report after retries:", error);
        throw new Error("Failed to get solo improvement report from Gemini API.");
    });
};

const explanationSchema = {
    type: Type.OBJECT,
    properties: {
        explanation: { 
            type: Type.STRING, 
            description: "A clear, concise explanation for a student. It should first explain why the correct answer is right, and then briefly explain why the user's selected answer is a common misconception, if applicable. Use basic HTML for formatting like <strong> and <em>." 
        }
    },
    required: ["explanation"]
};

export const generateQuestionExplanation = async (question: QuizQuestion, incorrectAnswer: string): Promise<QuestionExplanation> => {
    const prompt = `
Task: Explain a multiple-choice question to an IGCSE student who answered it incorrectly.

**Question Details:**
- Question: "${question.question}"
- Options: ${JSON.stringify(question.options)}
- Correct Answer: "${question.correctAnswer}"
- Student's Incorrect Answer: "${incorrectAnswer}"

**Instructions:**
1.  Start by clearly explaining why "${question.correctAnswer}" is the correct answer.
2.  Then, explain why the student's choice, "${incorrectAnswer}", is incorrect. Address the common misconception if possible.
3.  Keep the tone encouraging and educational.
4.  Use simple HTML tags like <strong> for emphasis and <em> for italics where appropriate.
5.  The entire explanation should be concise, ideally 2-4 sentences.

**Required Output (JSON):**
- **explanation**: A single string containing the full explanation.
`;

    const apiCall = async () => {
        const makeApiCall = async (model: string) => {
            const response = await ai.models.generateContent({
                model,
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: explanationSchema,
                },
            });
            const data = parseGeminiJson<QuestionExplanation>(response.text);
            if (!data.explanation) {
                throw new Error("API returned invalid explanation data format.");
            }
            return data;
        };
        return apiCallWithFallback(makeApiCall);
    };

    return withRetry(apiCall, 1).catch(error => {
        console.error("Error getting question explanation after retries:", error);
        throw new Error("Failed to get question explanation from the AI.");
    });
};


const revisionNotesSchema = {
    type: Type.ARRAY,
    description: "An array of revision notes, where each note corresponds to a sub-topic.",
    items: {
        type: Type.OBJECT,
        properties: {
            subTopicHeading: { type: Type.STRING, description: "The heading for the sub-topic." },
            points: {
                type: Type.ARRAY,
                description: "An array of key revision points for this sub-topic.",
                items: {
                    type: Type.OBJECT,
                    properties: {
                        description: { type: Type.STRING, description: "A detailed explanation of the concept, including definitions. Can use basic HTML for formatting like <strong>, <em>, <sub>, <sup>." },
                        formula: { type: Type.STRING, description: "The relevant formula, if any. Use HTML for special characters (e.g., E = mc<sup>2</sup>). Use 'N/A' if not applicable." },
                        symbolExplanation: { type: Type.STRING, description: "Explanation of symbols in the formula. Use 'N/A' if no formula. Can use basic HTML." },
                        siUnit: { type: Type.STRING, description: "The SI unit for the main quantity. Use 'N/A' if not applicable." },
                        tableData: {
                            type: Type.OBJECT,
                            description: "Optional table for comparative data.",
                            properties: {
                                headers: { type: Type.ARRAY, items: { type: Type.STRING } },
                                rows: { type: Type.ARRAY, items: { type: Type.ARRAY, items: { type: Type.STRING } } }
                            },
                            required: ['headers', 'rows']
                        }
                    },
                    required: ['description']
                }
            }
        },
        required: ['subTopicHeading', 'points']
    }
};

export const generateRevisionNotes = async (topic: Topic, subject: 'physics' | 'biology' | 'chemistry'): Promise<RevisionNote[]> => {
    const indicatorsList = topic.indicators?.map(i => i.name).join('; ') || 'N/A';
    const subTopicsList = topic.subTopics?.map(st => `Sub-topic: ${st.name}, Indicators: ${st.indicators.map(i => i.name).join('; ')}`).join('\\n') || 'N/A';
    const subjectTitle = subject.charAt(0).toUpperCase() + subject.slice(1);

    const prompt = `Generate concise revision notes for an IGCSE ${subjectTitle} student on the topic "${topic.name}".
    The notes must cover the following syllabus points (indicators):
    - For the main topic: ${indicatorsList}
    - For sub-topics:
    ${subTopicsList}

    IMPORTANT INSTRUCTIONS:
    1.  Organize the notes by sub-topic. If there are no named sub-topics, group related indicators under logical headings.
    2.  For each concept/indicator, provide a clear 'description'.
    3.  If a concept has a formula, provide the 'formula' using HTML for formatting (e.g., F = ma, E<sub>k</sub> = ½mv<sup>2</sup>). If no formula, use "N/A".
    4.  If a formula is provided, explain the symbols in 'symbolExplanation'. If no formula, use "N/A".
    5.  Provide the 'siUnit' where applicable. If not, use "N/A".
    6.  Use the 'tableData' field ONLY for information that is best represented in a table (e.g., comparing properties, types of waves). For other content, use the description.
    7.  All text content can include basic HTML tags for formatting: <strong>, <em>, <sub>, <sup>.
    8.  The output must be structured precisely according to the provided JSON schema.`;

    const apiCall = async () => {
        const makeApiCall = async (model: string) => {
            const response = await ai.models.generateContent({
                model,
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: revisionNotesSchema,
                },
            });
            return parseGeminiJson<RevisionNote[]>(response.text);
        };
        return apiCallWithFallback(makeApiCall);
    };

    return withRetry(apiCall).catch(error => {
        console.error(`Error generating ${subject} revision notes for topic "${topic.name}" after retries:`, error);
        throw new Error(`Failed to generate ${subject} revision notes from Gemini API.`);
    });
};

export const getFriendlyErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
        const message = error.message;
        // Check for specific Gemini API error format
        if (message.includes('[503]') || message.includes('UNAVAILABLE')) {
             return "The AI model is currently busy and could not generate the quiz. Please try again in a moment.";
        }
        // Fallback for other errors or if the above check is not robust enough
        try {
            const parsed = JSON.parse(message);
            if (parsed.error && parsed.error.message) {
                if (parsed.error.code === 503 || parsed.error.status === 'UNAVAILABLE') {
                    return "The AI model is currently busy and could not generate the quiz. Please try again in a moment.";
                }
                return `An AI error occurred: ${parsed.error.message}`;
            }
        } catch (e) {
            // Not a valid JSON, return the original message
             if (message.includes('API key not valid')) {
                return "The API key is not valid. Please check your configuration.";
            }
            return message;
        }
    }
    return "An unexpected error occurred.";
};
