import { GoogleGenAI, Type } from "@google/genai";
import type { QuizQuestion, CertificateData, Indicator, Topic, SoloImprovementReport, GroupQuizReport, GroupQuiz } from '../types';
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

    const prompt = `Generate ${questionCount} unique, multiple-choice quiz questions strictly based on the Cambridge IGCSE Physics (0625) syllabus for exams in 2026, 2027 and 2028 for these topics: ${topics.join(', ')}.
    IMPORTANT:
    1.  The questions must be conceptually focused, testing understanding of definitions, formulas (in terms of variable relationships), units, and core principles.
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
        summary: { type: Type.STRING, description: "A short, positive performance summary." },
        improvementAreas: { type: Type.STRING, description: "One or two clear, specific, and actionable areas for improvement, phrased constructively." }
    },
    required: ["summary", "improvementAreas"]
};

export const getCertificateData = async (studentName: string, correctAnswers: number, totalQuestions: number, topics: string[]): Promise<CertificateData> => {
    const prompt = `An IGCSE Physics student named ${studentName} just completed a quiz on the topics: ${topics.join(', ')}. They scored ${correctAnswers} out of ${totalQuestions}. Based on this, generate:
    1.  A short, positive performance summary.
    2.  One or two clear, specific, and actionable areas for improvement, phrased constructively. For example, instead of 'review motion,' suggest 'focus on differentiating between distance-time and speed-time graphs.'`;

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
    const prompt = `An IGCSE Physics student named ${studentName} completed a quiz on the topics: ${topics.join(', ')}. They scored ${correctAnswers} out of ${totalQuestions} (${accuracy}%), which is below the 70% pass mark. 
    
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
