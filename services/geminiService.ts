import { GoogleGenAI, Type } from "@google/genai";
import type { QuizQuestion, CertificateData, Indicator, Topic, RevisionNote, SoloImprovementReport, GroupQuizReport, GroupQuiz } from '../types';
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

export const generateQuizQuestions = async (topics: string[], questionCount: number = 15): Promise<QuizQuestion[]> => {
    const prompt = `Generate ${questionCount} unique, multiple-choice quiz questions strictly based on the Cambridge IGCSE Physics (0625) syllabus for exams in 2026, 2027 and 2028 for these topics: ${topics.join(', ')}.
    IMPORTANT:
    1.  Questions must be conceptual and test the understanding of definitions, formulas (in terms of the relationships between variables), units, and core concepts for the IGCSE exam.
    2.  Absolutely NO calculation questions are allowed. The questions must not require any mathematical steps to solve.
    3.  Use the language and terminology of the syllabus strictly.
    4.  Ensure questions cover all subtopics and learning objectives for the given topics thoroughly.
    5.  Provide 4 distinct options and one correct answer for each question.
    6.  Distribute difficulty levels appropriately (easy, medium, hard).`;

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

export const getFeedbackMessage = async (isCorrect: boolean, studentName: string): Promise<string> => {
    const prompt = isCorrect 
        ? `Generate a very short, personalized, and encouraging message for ${studentName} who answered a physics question correctly.`
        : `Generate a very short, personalized, and motivational message for ${studentName} who answered incorrectly. Encourage them to keep going.`;
    
    try {
        const response = await ai.models.generateContent({ model: 'gemini-flash-lite-latest', contents: prompt });
        return response.text.trim();
    } catch (error) {
        console.error("Error getting feedback message:", error);
        return isCorrect ? "Great job!" : "Keep trying!";
    }
};

const certificateDataSchema = {
    type: Type.OBJECT,
    properties: {
        summary: { type: Type.STRING, description: "A short, positive performance summary." },
        improvementAreas: { type: Type.STRING, description: "One or two key areas for improvement, phrased constructively." }
    },
    required: ["summary", "improvementAreas"]
};

export const getCertificateData = async (studentName: string, correctAnswers: number, totalQuestions: number, topics: string[]): Promise<CertificateData> => {
    const prompt = `An IGCSE Physics student named ${studentName} just completed a quiz on the topics: ${topics.join(', ')}. They scored ${correctAnswers} out of ${totalQuestions}. Based on this, generate a short performance summary and identify potential areas for improvement, phrased constructively.`;

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


const revisionNoteSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            subTopicHeading: { type: Type.STRING },
            points: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        description: { type: Type.STRING },
                        formula: { type: Type.STRING },
                        symbolExplanation: { type: Type.STRING, description: "Explanation of symbols in the formula, formatted for clarity (e.g., 'v = velocity<br>s = distance<br>t = time'). Use 'N/A' if formula is 'N/A'." },
                        siUnit: { type: Type.STRING },
                        tableData: {
                            type: Type.OBJECT,
                            nullable: true,
                            properties: {
                                headers: { type: Type.ARRAY, items: { type: Type.STRING } },
                                rows: { type: Type.ARRAY, items: { type: Type.ARRAY, items: { type: Type.STRING } } }
                            },
                            required: ['headers', 'rows']
                        }
                    },
                    required: ['description', 'formula', 'symbolExplanation', 'siUnit']
                }
            }
        },
        required: ['subTopicHeading', 'points']
    }
};

export const generateRevisionNotes = async (topic: Topic): Promise<RevisionNote[]> => {
    // Flatten all indicators from the topic and its subtopics
    const allIndicators = (topic.indicators || []).concat(
        (topic.subTopics || []).flatMap(st => st.indicators)
    );

    const prompt = `You are an expert academic content creator specializing in the Cambridge IGCSE Physics (0625) syllabus for exams in 2026, 2027, and 2028. Your style should emulate that of a top 1% educational creator, focusing on clarity, visual structure, and professionalism.
Your task is to generate concise, professional, and effective quick revision notes for the topic: "${topic.name}".

Below is a complete list of all learning objectives (indicators) for this topic:
${JSON.stringify(allIndicators)}

**CRITICAL INSTRUCTIONS - ADHERE STRICTLY:**
1.  **Absolute Completeness:** Your highest priority is to ensure 100% coverage. You must perform a thorough scan of every single indicator provided below and ensure that every definition, concept, formula, and learning outcome is explicitly addressed in the generated notes. Do not skip or merge any distinct learning point, no matter how small. Cross-reference your output against the provided list of indicators to guarantee complete coverage.
2.  **Analyze and Group:** Systematically analyze all the provided indicators. Group related indicators together to form logical sub-topics.
3.  **Create Headings:** For each group, create a short, clear, and descriptive heading (e.g., "Speed, Velocity, & Acceleration", "Hooke's Law", "Principle of Moments"). This will be the 'subTopicHeading', which will be displayed in a larger font.
4.  **Consolidate Content:** For each heading, create a consolidated list of key points that cover ALL the information from the grouped indicators. The content must be brief, to-the-point, and easy to digest. 
5.  **Point Format:** Each point in the 'points' array MUST be a JSON object with five fields, designed for a visually structured layout:
    *   \`description\`: A short, to-the-point professional definition or explanation. **CRITICALLY IMPORTANT: Use bullet points with \`<ul>\` and \`<li>\` tags to break down information instead of using long paragraphs.** This is essential for readability. You **MUST** bold all important keywords, terms, and quantities using HTML \`<b>\` tags. For example: '<ul><li><b>Speed</b> is the rate of change of <b>distance</b>.</li><li>It is a scalar quantity.</li></ul>'.
    *   \`formula\`: The relevant formula, perfectly formatted using IGCSE symbols and simple HTML (\`<sub>\`, \`<sup>\`, \`&...;\` entities). This will be displayed in a distinct box. Use 'N/A' if not applicable.
    *   \`symbolExplanation\`: A clear explanation for each symbol in the formula, designed to appear next to the formula box. Format as a list with each symbol on a new line using \`<br>\` (e.g., 'v = velocity<br>s = distance<br>t = time'). If the formula is 'N/A', this must also be 'N/A'.
    *   \`siUnit\`: The SI unit for the main quantity, formatted with HTML (e.g. m/s<sup>2</sup>). Use 'N/A' if not applicable.
    *   \`tableData\`: Use this field **ONLY** for comparisons or structured lists (e.g., properties of radiation, conductors vs insulators). The table should be clear and concise. Otherwise, **omit this field entirely**. The description should introduce the table.
6.  **Syllabus Adherence:** All content, including definitions, formulas, symbols, and constants (e.g., g = 9.8 m/s²), must strictly align with the IGCSE Physics (0625) 2026-2028 syllabus. In the 'description', clearly label supplement-only content with "<b>(Supplement)</b>".
7.  **Efficiency:** Merge simple, related concepts into single points where it makes sense for revision.
8.  **Output Format:** Your entire response must be a single, valid JSON object that strictly adheres to the provided schema. Do not include any text outside the JSON object.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: revisionNoteSchema,
                thinkingConfig: { thinkingBudget: 32768 },
            },
        });
        const parsed = JSON.parse(response.text);
        return parsed as RevisionNote[];
    } catch (error) {
        console.error(`Error generating revision notes for "${topic.name}":`, error);
        throw new Error("Failed to generate revision notes from Gemini API.");
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