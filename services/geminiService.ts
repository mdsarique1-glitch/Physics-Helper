

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
    seed?: number
): Promise<QuizQuestion[]> => {
    const prng = seed ? mulberry32(seed) : Math.random;

    // New robust method: Flatten all syllabus points into a single list, then shuffle it once.
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
    if (allPoints.length === 0) {
        throw new Error("No syllabus points found for the selected categories and syllabus level.");
    }

    // Sort the points alphabetically to ensure the input to the shuffle is always deterministic.
    allPoints.sort();

    const shuffledPoints = shuffleArray(allPoints, prng);
    // Provide a generous number of points to the AI, ensuring it has enough context.
    const selectedPoints = shuffledPoints.slice(0, Math.min(shuffledPoints.length, questionCount * 5)); 
    const syllabusContent = selectedPoints.join('\n');

    const nameForPrompt = seed ? "a group of students" : studentName;
    const prompt = `You are an expert IGCSE Physics tutor. Your task is to generate exactly ${questionCount} high-quality, unique, and engaging multiple-choice quiz questions for ${nameForPrompt}.

**Syllabus Content to use:**
The questions must be created strictly and exclusively from the detailed IGCSE Physics syllabus points provided below. The syllabus content has been intentionally randomized to ensure unbiased topic selection.
\`\`\`
${syllabusContent}
\`\`\`

**Mandatory Question Generation Process:**
To ensure a fair and comprehensive quiz, you MUST follow this process:
1.  **Analyze Syllabus Structure:** First, carefully review all the provided syllabus points to understand the breadth of the material.
2.  **Plan for Broad Coverage:** Create a mental plan to distribute the ${questionCount} questions as evenly as possible across ALL provided points. Your goal is to achieve maximum coverage. Do not concentrate questions on only the first few points listed.
3.  **Generate Questions:** Generate each question according to your plan, ensuring each one directly assesses a specific syllabus point.

**Critical Guidelines for Each Question:**
-   **Conceptual Focus:** Questions must test a deep understanding of concepts, not just rote memorization. Absolutely NO calculation-based questions.
-   **Correct Answer Match:** The value for 'correctAnswer' must be an exact, verbatim copy of one of the strings from the 'options' array.
-   **Plausible Options:** Provide 4 distinct and plausible answer options. Incorrect options (distractors) must be well-crafted to target common student misconceptions.
-   **Syllabus Adherence:** Do not introduce any concepts or information not explicitly mentioned in the provided syllabus content.
-   **Uniqueness:** Every question generated must be unique.
-   **Varied Question Styles:** Use a mix of question formats: definitions, scenarios, "which of the following is true/false", etc. Avoid repetitive phrasing.`;

    try {
        const response = await ai.models.generateContent({
            model: modelFlash, // Switched to the faster model
            contents: prompt,
            config: {
                // Added a system instruction to prime the model for its expert role
                systemInstruction: "You are an expert IGCSE Physics tutor specializing in creating high-quality, syllabus-aligned multiple-choice questions.",
                responseMimeType: "application/json",
                responseSchema: quizQuestionsSchema,
                // Instructed the model to use its maximum thinking time to ensure high-quality questions
                thinkingConfig: { thinkingBudget: 24576 },
                ...(seed && { seed }),
            },
        });
        const parsed = JSON.parse(response.text);
        if (!Array.isArray(parsed)) {
            console.error("Gemini API did not return an array for quiz questions:", parsed);
            throw new Error("Invalid format for quiz questions received from API.");
        }
        
        // Use a separate PRNG for shuffling options if needed, to not interfere with question selection logic
        const prngForShuffle = seed ? mulberry32(seed + 1) : Math.random;

        const validatedQuestions = parsed.map((q: any) => {
            if (!q.question || !Array.isArray(q.options) || !q.correctAnswer) {
                // Pass through malformed questions, they might fail later but won't be auto-corrected.
                return { ...q, options: q.options?.slice(0, 4) || [] };
            }

            const options = q.options.slice(0, 4);
            const correctAnswer = q.correctAnswer;

            // 1. Check for an exact match
            if (options.includes(correctAnswer)) {
                return { ...q, options };
            }

            // 2. If no exact match, try a lenient match (case-insensitive, trimmed)
            const saneCorrectAnswer = correctAnswer.trim().toLowerCase();
            const matchingOption = options.find((opt: string) => opt.trim().toLowerCase() === saneCorrectAnswer);
            if (matchingOption) {
                return { ...q, options, correctAnswer: matchingOption };
            }
            
            // 3. Fallback: Correct the options list to include the intended answer
            console.warn(`Correct answer from API ("${correctAnswer}") was not in options. Auto-correcting question options.`, { question: q.question, options: options });
            const newOptions = [...options];
            newOptions[3] = correctAnswer; // Replace the last option
            
            return { ...q, options: shuffleArray(newOptions, prngForShuffle), correctAnswer: correctAnswer };
        });

        return validatedQuestions;

    } catch (error) {
        console.error("Error generating quiz questions:", error);
        throw new Error("Failed to generate quiz questions from Gemini API.");
    }
};

const certificateDataSchema = {
    type: Type.OBJECT,
    properties: {
        summary: { type: Type.STRING, description: "A short, encouraging, and positive performance summary celebrating the student's achievement." }
    },
    required: ["summary"]
};

export const getCertificateData = async (studentName: string, correctAnswers: number, totalQuestions: number, topics: string[], isGroupChallenge?: boolean): Promise<CertificateData> => {
    let prompt: string;

    if (isGroupChallenge) {
        prompt = `
Task: Generate a short, positive performance summary for a student's certificate from a group challenge.

**Context:**
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
Task: Generate a short, positive performance summary for an IGCSE Physics student's certificate.

**Student Profile:**
- Name: ${studentName}
- Score: ${correctAnswers} out of ${totalQuestions}
- Topics Covered: ${topics.join(', ')}

**Required Output (JSON):**
- **summary**: A single string celebrating the student's achievement on the quiz topics.
`;
    }

    try {
        const response = await ai.models.generateContent({
            model: modelFlash,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: certificateDataSchema,
            },
        });
        return JSON.parse(response.text) as CertificateData;
    } catch (error) {
        console.error("Error getting certificate data:", error);
        throw new Error("Failed to get certificate data from Gemini API.");
    }
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

export const getSoloImprovementReport = async (studentName: string, correctAnswers: number, totalQuestions: number, topics: string[]): Promise<SoloImprovementReport> => {
    const accuracy = ((correctAnswers / totalQuestions) * 100).toFixed(0);
    const prompt = `
Task: Generate a constructive improvement report for an IGCSE Physics student who did not pass their quiz.

**Student Profile:**
- Name: ${studentName}
- Score: ${correctAnswers} out of ${totalQuestions} (${accuracy}%)
- Topics Covered: ${topics.join(', ')}

**Required Output (JSON):**
1.  **improvementAreas**: An array of 2-3 specific, actionable topics from the list above that the student should review. For example, "Distinguishing between scalar and vector quantities" or "Applying the principle of moments".
2.  **motivationalMessage**: A brief, encouraging message to motivate the student to study and try again.

Generate a JSON object that strictly follows this structure.`;

    try {
        const response = await ai.models.generateContent({
            model: modelFlash,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: soloImprovementReportSchema,
            },
        });
        return JSON.parse(response.text) as SoloImprovementReport;
    } catch (error) {
        console.error("Error getting solo improvement report:", error);
        throw new Error("Failed to get solo improvement report from Gemini API.");
    }
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

export const generateRevisionNotes = async (topic: Topic): Promise<RevisionNote[]> => {
    const indicatorsList = topic.indicators?.map(i => i.name).join('; ') || 'N/A';
    const subTopicsList = topic.subTopics?.map(st => `Sub-topic: ${st.name}, Indicators: ${st.indicators.map(i => i.name).join('; ')}`).join('\\n') || 'N/A';

    const prompt = `Generate concise revision notes for an IGCSE Physics student on the topic "${topic.name}".
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

    try {
        const response = await ai.models.generateContent({
            model: modelFlash,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: revisionNotesSchema,
            },
        });
        return JSON.parse(response.text) as RevisionNote[];
    } catch (error) {
        console.error(`Error generating revision notes for topic "${topic.name}":`, error);
        throw new Error("Failed to generate revision notes from Gemini API.");
    }
};