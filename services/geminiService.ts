import { GoogleGenAI, Type } from "@google/genai";
import type { QuizQuestion, CertificateData, Indicator, Topic, SoloImprovementReport, RevisionNote, Category, SubTopic } from '../types';

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });
const modelFlash = 'gemini-2.5-flash';
const modelPro = 'gemini-2.5-pro';

const quizQuestionsSchema = {
    type: Type.ARRAY,
    items: {
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
    }
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

export const generateQuizQuestions = async (
    studentName: string,
    categories: Category[],
    questionCount: number,
    syllabusLevel: 'core' | 'extended',
    subject: 'physics' | 'biology',
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
    const selectedPoints = shuffledPoints.slice(0, Math.min(shuffledPoints.length, questionCount * 3)); 
    const syllabusContent = selectedPoints.join('\n');

    const nameForPrompt = seed ? "a group of students" : studentName;
    const subjectTitle = subject.charAt(0).toUpperCase() + subject.slice(1);
    
    let questionStyleGuidelines = '';
    if (subject === 'physics') {
        questionStyleGuidelines = `-   **Varied Question Styles:** Create a balanced and comprehensive quiz by using a mix of question formats that cover:
    -   **Definitions:** Questions that directly test the definition of key terms (e.g., "What is the definition of velocity?").
    -   **Conceptual Understanding:** Scenarios, "which of the following is true/false", and questions that test the application of principles.
    -   **Formulas:** Questions that require identifying the correct formula for a given physical law or concept.
    -   **SI Units:** Questions that test the knowledge of standard SI units for various physical quantities.
    Ensure there is a healthy mix of all four types throughout the quiz.`;
    } else { // subject is 'biology'
        questionStyleGuidelines = `-   **Varied Question Styles:** Create a balanced and comprehensive quiz by using a mix of question formats that cover:
    -   **Definitions and Important Terms:** Questions that test the definition of key biological terms (e.g., "What is meant by the term 'homeostasis'?").
    -   **Process Understanding:** Questions that test the understanding of biological processes, their sequence, and their purpose (e.g., "Which of the following correctly describes the process of osmosis?").
    -   **Structure and Function:** Questions that require identifying biological structures from a description or stating their function (e.g., "What is the primary function of the mitochondria in an animal cell?").
    -   **Conceptual Application & Comparison:** Questions that present a scenario or ask to compare/contrast different concepts (e.g., "What is a key difference between mitosis and meiosis?").
    Ensure there is a healthy mix of all four types throughout the quiz.`;
    }


    const prompt = `You are an expert IGCSE ${subjectTitle} tutor. Your task is to generate exactly ${questionCount} high-quality, unique, and engaging multiple-choice quiz questions for ${nameForPrompt}.

**Syllabus Content to use:**
The questions must be created strictly and exclusively from the detailed IGCSE ${subjectTitle} syllabus points provided below. The syllabus content has been intentionally randomized to ensure unbiased topic selection.
\`\`\`
${syllabusContent}
\`\`\`

**Mandatory Question Generation Process:**
To ensure a fair and comprehensive quiz, you MUST follow this process:
1.  **Analyze Syllabus Structure:** First, carefully review all the provided syllabus points to understand the breadth of the material.
2.  **Plan for Broad Coverage:** Create a mental plan to distribute the ${questionCount} questions as evenly as possible across ALL provided points. Your goal is to achieve maximum coverage. Do not concentrate questions on only the first few points listed.
3.  **Generate Questions:** Generate each question according to your plan, ensuring each one directly assesses a specific syllabus point.

**Critical Guidelines for Each Question:**
${questionStyleGuidelines}
-   **Correct Answer Match:** The value for 'correctAnswer' must be an exact, verbatim copy of one of the strings from the 'options' array.
-   **Plausible Options:** Provide 4 distinct and plausible answer options. Incorrect options (distractors) must be well-crafted to target common student misconceptions.
-   **Syllabus Adherence:** Do not introduce any concepts or information not explicitly mentioned in the provided syllabus content.
-   **Uniqueness:** Every question generated must be unique.
-   **No Calculations:** Questions should test recognition and understanding, but should **not** require mathematical calculations to solve.`;
    
    const apiCall = async () => {
        const response = await ai.models.generateContent({
            model: modelPro,
            contents: prompt,
            config: {
                systemInstruction: `You are an expert IGCSE ${subjectTitle} tutor specializing in creating high-quality, syllabus-aligned multiple-choice questions.`,
                responseMimeType: "application/json",
                responseSchema: quizQuestionsSchema,
                thinkingConfig: { thinkingBudget: 32768 },
                seed: quizSeed,
            },
        });
        const parsed = parseGeminiJson<any[]>(response.text);
        if (!Array.isArray(parsed)) {
            console.error("Gemini API did not return an array for quiz questions:", parsed);
            throw new Error("Invalid format for quiz questions received from API.");
        }
        
        const prngForShuffle = mulberry32(quizSeed + 1);

        const validatedQuestions = parsed.map((q: any) => {
            if (!q.question || !Array.isArray(q.options) || q.options.length === 0 || !q.correctAnswer) {
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
                options[options.length - 1] = correctAnswer;
            }
            
            const shuffledOptions = shuffleArray(options, prngForShuffle);

            return { 
                question: q.question,
                options: shuffledOptions, 
                correctAnswer: correctAnswer 
            };
        }).filter((q): q is QuizQuestion => q !== null);

        return validatedQuestions;
    };

    return withRetry(apiCall);
};

const certificateDataSchema = {
    type: Type.OBJECT,
    properties: {
        summary: { type: Type.STRING, description: "A short, encouraging, and positive performance summary celebrating the student's achievement." }
    },
    required: ["summary"]
};

export const getCertificateData = async (studentName: string, correctAnswers: number, totalQuestions: number, topics: string[], subject: 'physics' | 'biology', isGroupChallenge?: boolean): Promise<CertificateData> => {
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
        const response = await ai.models.generateContent({
            model: modelFlash,
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

export const getSoloImprovementReport = async (studentName: string, correctAnswers: number, totalQuestions: number, topics: string[], subject: 'physics' | 'biology'): Promise<SoloImprovementReport> => {
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
        const response = await ai.models.generateContent({
            model: modelFlash,
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
    
    return withRetry(apiCall).catch(error => {
        console.error("Error getting solo improvement report after retries:", error);
        throw new Error("Failed to get solo improvement report from Gemini API.");
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

export const generateRevisionNotes = async (topic: Topic, subject: 'physics' | 'biology'): Promise<RevisionNote[]> => {
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
        const response = await ai.models.generateContent({
            model: modelFlash,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: revisionNotesSchema,
            },
        });
        return parseGeminiJson<RevisionNote[]>(response.text);
    };

    return withRetry(apiCall).catch(error => {
        console.error(`Error generating ${subject} revision notes for topic "${topic.name}" after retries:`, error);
        throw new Error(`Failed to generate ${subject} revision notes from Gemini API.`);
    });
};