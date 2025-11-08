import { GoogleGenAI, Type } from "@google/genai";
// FIX: Import RevisionNote to be used in generateRevisionNotes function.
import type { QuizQuestion, CertificateData, Indicator, Topic, SoloImprovementReport, GroupQuizReport, GroupQuiz, FeedbackEntry, RevisionNote } from '../types';
import { PHYSICS_CATEGORIES } from "../constants";

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });
const modelFlash = 'gemini-2.5-flash';

const quizQuestionsSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            question: { type: Type.STRING },
            options: { type: Type.ARRAY, items: { type: Type.STRING } },
            correctAnswer: { type: Type.STRING },
            difficulty: { type: Type.STRING, enum: ['easy', 'medium', 'hard'] }
        },
        required: ['question', 'options', 'correctAnswer', 'difficulty']
    }
};

export const generateQuizQuestions = async (topics: string[], questionCount: number): Promise<QuizQuestion[]> => {
    const baseDifficultyCount = Math.floor(questionCount / 3);
    const remainder = questionCount % 3;
    const numEasy = baseDifficultyCount + (remainder > 0 ? 1 : 0);
    const numMedium = baseDifficultyCount + (remainder > 1 ? 1 : 0);
    const numHard = baseDifficultyCount;

    const prompt = `Generate ${questionCount} unique, multiple-choice quiz questions for an IGCSE Physics student. The questions must strictly adhere to the Cambridge IGCSE Physics (0625) syllabus for exams in 2026-2028 and be based on the core content found in the official syllabus guide for these topics: ${topics.join(', ')}.
    IMPORTANT:
    1.  The questions must be conceptually focused. Ensure they cover a mix of definitions, formulas (in terms of variable relationships), units, and both core and supplementary concepts as outlined in the syllabus.
    2.  Absolutely NO calculation questions.
    3.  Distribute the questions as evenly as possible across all the provided topics.
    4.  Generate exactly ${numEasy} easy, ${numMedium} medium, and ${numHard} hard questions.
    5.  Provide 4 distinct options and one correct answer for each question. Ensure the options are plausible and relevant.
    6.  Do not repeat questions.`;

    try {
        const response = await ai.models.generateContent({
            model: modelFlash,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: quizQuestionsSchema,
            },
        });
        const parsed = JSON.parse(response.text);
        if (!Array.isArray(parsed)) {
            console.error("Gemini API did not return an array for quiz questions:", parsed);
            throw new Error("Invalid format for quiz questions received from API.");
        }
        return parsed.map((q: any) => ({ ...q, options: q.options.slice(0, 4) }));
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

export const getCertificateData = async (studentName: string, correctAnswers: number, totalQuestions: number, topics: string[]): Promise<CertificateData> => {
    const prompt = `An IGCSE Physics student named ${studentName} just completed a quiz on the topics: ${topics.join(', ')}. They scored ${correctAnswers} out of ${totalQuestions}.
    
    Based on this, generate a short, encouraging, and positive performance summary to be displayed on their certificate. It should celebrate their achievement and strong performance on the quiz topics.`;

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
    const prompt = `An IGCSE Physics student named ${studentName} completed a quiz on the topics: ${topics.join(', ')}. They scored ${correctAnswers} out of ${totalQuestions} (${accuracy}%), which is below the 61% required for a certificate. 
    
    Generate a constructive report that includes:
    1. A list of 2-3 key areas for improvement, based on the topics they were tested on. Be specific (e.g., "Understanding the difference between speed and velocity", "Applying the principle of moments").
    2. A short, positive, and motivational message encouraging them to review these topics and try the quiz again to earn a certificate.`;

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


export const getFeedbackResponse = async (feedbackText: string): Promise<string> => {
    const prompt = `A user of the "Physics Helper" app provided this feedback: "${feedbackText}". Generate a short, polite, and encouraging thank you message acknowledging their feedback was received and will be considered.`;
    
    try {
        const response = await ai.models.generateContent({ model: 'gemini-flash-lite-latest', contents: prompt });
        return response.text.trim();
    } catch (error) {
        console.error("Error getting feedback response:", error);
        return "Thank you for your feedback! We've received it successfully.";
    }
};

const FEEDBACK_STORAGE_KEY = 'physics-helper-feedback';

export const saveFeedback = (feedbackText: string): void => {
    const getFeedbackFromStorage = (): FeedbackEntry[] => {
        try {
            const storedFeedback = localStorage.getItem(FEEDBACK_STORAGE_KEY);
            return storedFeedback ? JSON.parse(storedFeedback) : [];
        } catch (error) {
            console.error("Error parsing feedback from localStorage", error);
            return [];
        }
    };
    
    const existingFeedback = getFeedbackFromStorage();
    const newEntry: FeedbackEntry = {
        text: feedbackText,
        timestamp: new Date().toISOString(),
    };
    const updatedFeedback = [...existingFeedback, newEntry];
    localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(updatedFeedback));
};

export const getStoredFeedback = (): FeedbackEntry[] => {
    try {
        const storedFeedback = localStorage.getItem(FEEDBACK_STORAGE_KEY);
        return storedFeedback ? JSON.parse(storedFeedback) : [];
    } catch (error) {
        console.error("Error parsing feedback from localStorage", error);
        return [];
    }
};

export const clearStoredFeedback = (): void => {
    localStorage.removeItem(FEEDBACK_STORAGE_KEY);
};

const groupQuizReportSchema = {
    type: Type.OBJECT,
    properties: {
        groupSummary: { type: Type.STRING, description: "A brief summary of the group's overall performance." },
        improvementAreas: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "A list of common topics or concepts the group struggled with."
        },
        individualFeedback: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    participantName: { type: Type.STRING },
                    feedback: { type: Type.STRING, description: "Personalized, constructive feedback for each participant." }
                },
                required: ['participantName', 'feedback']
            }
        }
    },
    required: ["groupSummary", "improvementAreas", "individualFeedback"]
};

export const generateGroupQuizReport = async (quiz: GroupQuiz): Promise<GroupQuizReport> => {
    const topics = PHYSICS_CATEGORIES
        .filter(c => quiz.config.categories.includes(c.name))
        .flatMap(c => c.topics.map(t => t.name));

    const participantsData = quiz.participants.map(p => ({
        name: p.name,
        score: `${(p.score / (quiz.questions.length * 10)) * 100}%`
    }));

    const prompt = `A group quiz titled "${quiz.config.title}" on IGCSE Physics topics (${topics.join(', ')}) has just finished. Here is the list of participants and their final scores: ${JSON.stringify(participantsData)}.
    
    Generate a comprehensive report that includes:
    1. 'groupSummary': A brief, positive summary of the group's overall performance.
    2. 'improvementAreas': A list of 2-3 common areas where the group might need improvement, based on the quiz topics.
    3. 'individualFeedback': For each participant in the list, provide a short, personalized, and constructive feedback message. The feedback should acknowledge their performance (without restating the score) and offer encouragement or a specific suggestion. Ensure the name matches exactly.`;

    try {
        // Using Pro for more nuanced, personalized feedback generation
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: groupQuizReportSchema,
                thinkingConfig: { thinkingBudget: 32768 },
            },
        });
        return JSON.parse(response.text) as GroupQuizReport;
    } catch (error) {
        console.error("Error generating group quiz report:", error);
        throw new Error("Failed to generate group quiz report from Gemini API.");
    }
};

// FIX: Add generateRevisionNotes function to support QuickRevisionView.tsx
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
