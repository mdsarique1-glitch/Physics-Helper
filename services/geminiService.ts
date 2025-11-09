import { GoogleGenAI, Type } from "@google/genai";
// FIX: Import RevisionNote to be used in generateRevisionNotes function.
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
            correctAnswer: { type: Type.STRING },
        },
        required: ['question', 'options', 'correctAnswer']
    }
};

const shuffleArray = <T>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
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

    const formatSyllabus = (cats: Category[]): string => {
        const shuffledCategories = shuffleArray(cats);

        return shuffledCategories.map(category => {
            let categoryString = `Category: ${category.name}\n`;
            
            // FIX: Filter topics based on syllabus level to avoid including supplementary topics in core quizzes.
            const shuffledTopics = shuffleArray(category.topics)
                .filter(topic => syllabusLevel === 'extended' || !topic.isSupplement);

            shuffledTopics.forEach(topic => {
                categoryString += `  Topic: ${topic.name}\n`;
                
                const filterAndFormatIndicators = (indicators: Indicator[]): string => {
                    return shuffleArray(indicators)
                        .filter(ind => syllabusLevel === 'extended' || !ind.isSupplement)
                        .map(ind => `      - ${ind.name}\n`)
                        .join('');
                };

                if (topic.indicators) {
                    categoryString += filterAndFormatIndicators(topic.indicators);
                }
                if (topic.subTopics) {
                    // FIX: Filter sub-topics based on syllabus level to avoid including supplementary sub-topics in core quizzes.
                    const shuffledSubTopics = shuffleArray(topic.subTopics)
                        .filter(subTopic => syllabusLevel === 'extended' || !subTopic.isSupplement);

                    shuffledSubTopics.forEach(subTopic => {
                        categoryString += `    Sub-topic: ${subTopic.name}\n`;
                        if (subTopic.indicators) {
                           categoryString += filterAndFormatIndicators(subTopic.indicators);
                        }
                    });
                }
            });
            return categoryString;
        }).join('\n');
    };

    const syllabusContent = formatSyllabus(categories);

    if (!syllabusContent.trim()) {
        throw new Error("No syllabus points found for the selected categories and syllabus level.");
    }

    const prompt = `You are an expert IGCSE Physics tutor. Your task is to generate exactly ${questionCount} high-quality, unique, and engaging multiple-choice quiz questions for a student named ${studentName}.

**Syllabus Content to use:**
The questions must be created strictly and exclusively from the detailed IGCSE Physics syllabus points provided below. The syllabus content has been intentionally randomized to ensure unbiased topic selection.
\`\`\`
${syllabusContent}
\`\`\`

**Mandatory Question Generation Process:**
To ensure a fair and comprehensive quiz, you MUST follow this process:
1.  **Analyze Syllabus Structure:** First, carefully review all the provided categories, topics, and sub-topics to understand the breadth of the material.
2.  **Plan for Broad Coverage:** Create a mental plan to distribute the ${questionCount} questions as evenly as possible across ALL provided topics and sub-topics. Your goal is to achieve maximum coverage. Do not concentrate questions on only a few points or the first few topics listed. For example, if a category has 5 topics, and you need 5 questions, pull one from each topic.
3.  **Generate Questions:** Generate each question according to your plan, ensuring each one directly assesses a specific syllabus indicator.

**Critical Guidelines for Each Question:**
-   **Conceptual Focus:** Questions must test a deep understanding of concepts, not just rote memorization. Absolutely NO calculation-based questions.
-   **Varied Question Styles:** Use a mix of question formats: definitions, scenarios, "which of the following is true/false", etc. Avoid repetitive phrasing.
-   **Plausible Options:** Provide 4 distinct and plausible answer options. Incorrect options (distractors) must be well-crafted to target common student misconceptions.
-   **Syllabus Adherence:** Do not introduce any concepts or information not explicitly mentioned in the provided syllabus content.
-   **Uniqueness:** Every question generated must be unique.`;

    try {
        const response = await ai.models.generateContent({
            model: modelPro,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: quizQuestionsSchema,
                thinkingConfig: { thinkingBudget: 32768 },
                ...(seed && { seed }),
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