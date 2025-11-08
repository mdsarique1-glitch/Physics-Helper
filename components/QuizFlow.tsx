import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { QuizQuestion, QuizResult, CertificateData, View, SoloImprovementReport } from '../types';
import { generateQuizQuestions, getFeedbackMessage, getCertificateData, getSoloImprovementReport } from '../services/geminiService';
import LoadingSpinner from './LoadingSpinner';

declare var html2canvas: any;
declare var jspdf: any;

const QuizView: React.FC<{
    studentName: string;
    topics: string[];
    onComplete: (result: QuizResult) => void;
}> = ({ studentName, topics, onComplete }) => {
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [incorrectAnswers, setIncorrectAnswers] = useState(0);
    const [feedback, setFeedback] = useState<{ message: string; isCorrect: boolean } | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    
    const TOTAL_QUESTIONS = 15;
    const isCompletedRef = useRef(false);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const fetchedQuestions = await generateQuizQuestions(topics, TOTAL_QUESTIONS);
                if (fetchedQuestions.length < TOTAL_QUESTIONS) {
                    throw new Error("Could not generate a full set of quiz questions.");
                }
                setQuestions(fetchedQuestions);
            } catch (err) {
                setError("Failed to start the quiz. An error occurred while generating questions.");
                if (!isCompletedRef.current) {
                    isCompletedRef.current = true;
                    onComplete({ correctAnswers: 0, incorrectAnswers: 0, totalQuestions: 0, error: true });
                }
            } finally {
                setLoading(false);
            }
        };
        fetchQuestions();
    }, [topics, onComplete]);

    const handleAnswer = async (selectedOption: string) => {
        if (isAnswered || questions.length === 0) return;
        
        const currentQuestion = questions[currentQuestionIndex];
        setIsAnswered(true);

        const isCorrect = selectedOption === currentQuestion.correctAnswer;
        
        const feedbackMessage = await getFeedbackMessage(isCorrect, studentName);
        setFeedback({ message: feedbackMessage, isCorrect });
        
        if (isCorrect) {
            setCorrectAnswers(c => c + 1);
        } else {
            setIncorrectAnswers(i => i + 1);
        }
        
        setTimeout(() => {
            setFeedback(null);
            setIsAnswered(false);
            if (currentQuestionIndex + 1 >= TOTAL_QUESTIONS) {
                if (!isCompletedRef.current) {
                    isCompletedRef.current = true;
                    onComplete({
                        correctAnswers: correctAnswers + (isCorrect ? 1 : 0),
                        incorrectAnswers: incorrectAnswers + (isCorrect ? 0 : 1),
                        totalQuestions: TOTAL_QUESTIONS,
                    });
                }
            } else {
                setCurrentQuestionIndex(i => i + 1);
            }
        }, 2000);
    };

    if (loading) return <div className="flex flex-col items-center justify-center h-64"><LoadingSpinner /><p className="mt-4 text-lg text-gray-600">Generating your personalized quiz...</p></div>;
    if (error) return <p className="text-center text-red-500 text-lg">{error}</p>;
    if (questions.length === 0 && !loading) return <p className="text-center text-gray-600 text-lg">No questions available.</p>;

    const currentQuestion = questions[currentQuestionIndex];
    const questionNumber = currentQuestionIndex + 1;

    return (
        <div className="max-w-3xl mx-auto p-4 md:p-8 bg-white rounded-2xl shadow-2xl">
            <div className="flex justify-between items-center mb-6">
                <div className="text-xl font-semibold text-gray-700">Correct: <span className="text-green-500">{correctAnswers}</span></div>
                <div className="text-xl font-semibold text-gray-700">Incorrect: <span className="text-red-500">{incorrectAnswers}</span></div>
            </div>

            <div className="mb-6 flex justify-between items-center">
                <div className={`text-sm font-bold uppercase px-3 py-1 rounded-full ${currentQuestion.difficulty === 'easy' ? 'bg-green-100 text-green-800' : currentQuestion.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                    {currentQuestion.difficulty}
                </div>
                <div className="text-right text-sm text-gray-500">Question {questionNumber} of {TOTAL_QUESTIONS}</div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-6 min-h-[100px]">
                <h2 className="text-2xl font-medium text-gray-800">{currentQuestion.question}</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQuestion.options.map((option) => {
                    const isCorrectOption = option === currentQuestion.correctAnswer;
                    const buttonClass = isAnswered 
                        ? (isCorrectOption ? 'bg-green-500 border-green-500 text-white' : 'bg-red-500 border-red-500 text-white')
                        : 'bg-white border-gray-300 hover:bg-indigo-50 hover:border-indigo-400';
                    return (
                        <button key={option} onClick={() => handleAnswer(option)} disabled={isAnswered} className={`p-4 rounded-lg border-2 text-lg text-left transition duration-300 ${buttonClass}`}>
                            {option}
                        </button>
                    );
                })}
            </div>
            
            {feedback && (
                <div className={`mt-6 p-4 rounded-lg text-center text-white text-lg animate-fade-in ${feedback.isCorrect ? 'bg-green-500' : 'bg-red-500'}`}>
                    {feedback.message}
                </div>
            )}
        </div>
    );
};

const Badge: React.FC<{ type: 'Gold' | 'Silver' | 'Bronze' }> = ({ type }) => {
    const config = {
        Gold: { medalColor: "gold", ribbonColor: "#ffbf00", textColor: "text-amber-600" },
        Silver: { medalColor: "#c0c0c0", ribbonColor: "#a9a9a9", textColor: "text-slate-600" },
        Bronze: { medalColor: "#cd7f32", ribbonColor: "#a0522d", textColor: "text-orange-800" },
    };
    const { medalColor, ribbonColor, textColor } = config[type];

    return (
        <div className="flex flex-col items-center mb-4 animate-fade-in">
            <svg width="100" height="100" viewBox="0 0 100 100" className="drop-shadow-lg">
                <path d="M 20 0 L 80 0 L 70 25 L 30 25 Z" fill={ribbonColor} />
                <path d="M 20 0 L 50 0 L 70 25 L 50 25 Z" fill={ribbonColor} style={{filter: 'brightness(0.9)'}} />
                <circle cx="50" cy="62" r="35" fill={medalColor} />
                <circle cx="50" cy="62" r="30" fill="none" stroke="white" strokeWidth="2" style={{opacity: 0.5}} />
                <polygon points="50,47 58,62 75,62 62,72 67,87 50,77 33,87 38,72 25,62 42,62" fill="white" />
            </svg>
            <p className={`text-2xl font-bold mt-2 ${textColor}`}>{type} Achievement</p>
        </div>
    );
};

const ImprovementReport: React.FC<{
    studentName: string;
    result: QuizResult;
    topics: string[];
    onReset: () => void;
}> = ({ studentName, result, topics, onReset }) => {
    const [report, setReport] = useState<SoloImprovementReport | null>(null);
    const [loading, setLoading] = useState(true);

    const accuracy = result.totalQuestions > 0 ? ((result.correctAnswers / result.totalQuestions) * 100).toFixed(0) : 0;

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const data = await getSoloImprovementReport(studentName, result.correctAnswers, result.totalQuestions, topics);
                setReport(data);
            } catch (error) {
                console.error(error);
                setReport({
                    improvementAreas: ["Reviewing the topics covered is a great next step."],
                    motivationalMessage: "Don't give up! A little more practice and you'll master these concepts."
                });
            } finally {
                setLoading(false);
            }
        };
        fetchReport();
    }, [studentName, result, topics]);

    return (
        <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-xl border-2 border-amber-200 text-center">
            <h2 className="text-3xl font-bold text-gray-800">Quiz Report for {studentName}</h2>
            <p className="mt-4 text-lg text-gray-600">You're on the right track! Here's a quick summary to help you improve.</p>

            <div className="my-8">
                <p className="text-5xl font-bold text-amber-600">{accuracy}%</p>
                <p className="text-gray-600">Your Score</p>
            </div>
            
            {loading ? <LoadingSpinner /> : (
                <div className="text-left space-y-4 my-6 bg-amber-50 p-6 rounded-lg">
                    <div>
                        <h4 className="font-bold text-lg text-gray-800">Areas for Improvement:</h4>
                        <ul className="list-disc list-inside mt-2 text-gray-700">
                            {report?.improvementAreas.map((area, index) => <li key={index}>{area}</li>)}
                        </ul>
                    </div>
                     <div>
                        <h4 className="font-bold text-lg text-gray-800 mt-4">A Quick Note:</h4>
                        <p className="text-gray-700 mt-2 italic">"{report?.motivationalMessage}"</p>
                    </div>
                </div>
            )}

            <p className="text-lg text-gray-800 mt-8">
                Keep pushing! Score 70% or higher on your next attempt to earn a personalized certificate.
            </p>
            
            <button onClick={onReset} className="mt-8 px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700">
                Try Again
            </button>
        </div>
    );
};

const Certificate: React.FC<{
    studentName: string;
    topics: string[];
    result: QuizResult;
    onReset: () => void;
}> = ({ studentName, topics, result, onReset }) => {
    if (result.error) {
        return (
            <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-xl border-2 border-red-200 text-center">
                <h2 className="text-3xl font-bold text-red-700">Quiz Interrupted</h2>
                <p className="mt-4 text-lg text-gray-600">
                    We're sorry for the inconvenience. The quiz was stopped due to a technical error and your results could not be recorded.
                </p>
                <p className="mt-2 text-gray-500">Please try again later.</p>
                <button onClick={onReset} className="mt-8 px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700">
                    Back to Home
                </button>
            </div>
        );
    }

    const accuracy = result.totalQuestions > 0 ? ((result.correctAnswers / result.totalQuestions) * 100) : 0;
    
    if (accuracy < 70 && result.totalQuestions > 0) {
        return <ImprovementReport studentName={studentName} result={result} topics={topics} onReset={onReset} />;
    }

    const certificateRef = useRef<HTMLDivElement>(null);
    const [certificateData, setCertificateData] = useState<CertificateData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCertData = async () => {
            if (result.totalQuestions > 0) {
                try {
                    const data = await getCertificateData(studentName, result.correctAnswers, result.totalQuestions, topics);
                    setCertificateData(data);
                } catch (error) {
                    console.error(error);
                    setCertificateData({ summary: "You showed great effort!", improvementAreas: "Reviewing topics is a great next step." });
                }
            } else {
                 setCertificateData({ summary: "The quiz ended before any questions were answered.", improvementAreas: "Try the quiz again to test your knowledge!" });
            }
            setLoading(false);
        };
        fetchCertData();
    }, [studentName, topics, result]);

    const handleDownload = async () => {
        if (!certificateRef.current) return;
        const canvas = await html2canvas(certificateRef.current, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');
        const { jsPDF } = jspdf;
        const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [canvas.width, canvas.height] });
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save(`Physics-Helper-Certificate-${studentName}.pdf`);
    };
    
    const getBadge = () => {
        if (result.totalQuestions === 0) return null;
        const accuracy = (result.correctAnswers / result.totalQuestions) * 100;
        if (accuracy === 100) return <Badge type="Gold" />;
        if (accuracy >= 90) return <Badge type="Silver" />;
        if (accuracy >= 70) return <Badge type="Bronze" />;
        return null;
    };

    const accuracyString = result.totalQuestions > 0 ? ((result.correctAnswers / result.totalQuestions) * 100).toFixed(0) : 0;

    return (
        <div className="max-w-4xl mx-auto text-center">
            <div ref={certificateRef} className="bg-white p-8 md:p-12 rounded-xl shadow-2xl border-4 border-blue-200" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23dbeafe' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}>
                {getBadge()}
                <h1 className="text-3xl md:text-4xl font-bold text-indigo-700 mb-2">Certificate of Achievement</h1>
                <p className="text-lg text-gray-600 mb-6">Physics Helper by Mohammed Sarique</p>
                <p className="text-xl my-4">This certificate is proudly presented to</p>
                <p className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 my-4">{studentName}</p>
                <p className="text-lg my-4">for successfully completing the quiz on {new Date().toLocaleDateString()}</p>

                <div className="my-6 p-4 bg-indigo-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-indigo-800">Topics Covered</h3>
                    <p className="text-gray-700 text-sm md:text-base">{topics.join(', ')}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 my-8 text-center">
                    <div>
                        <p className="text-3xl font-bold text-green-600">{result.correctAnswers}/{result.totalQuestions}</p>
                        <p className="text-gray-600">Correct Answers</p>
                    </div>
                    <div>
                        <p className="text-3xl font-bold text-blue-600">{accuracyString}%</p>
                        <p className="text-gray-600">Accuracy</p>
                    </div>
                </div>

                {loading ? <LoadingSpinner/> : (
                <div className="text-left space-y-4 my-6">
                    <div>
                        <h4 className="font-bold text-gray-800">Performance Summary:</h4>
                        <p className="text-gray-700">{certificateData?.summary}</p>
                    </div>
                     <div>
                        <h4 className="font-bold text-gray-800">Areas for Improvement:</h4>
                        <p className="text-gray-700">{certificateData?.improvementAreas}</p>
                    </div>
                </div>
                )}
                
                <div className="mt-8 border-t-2 border-dashed border-gray-300 pt-6">
                    <p className="text-lg italic text-gray-800">“Well done, {studentName}! Your hard work in Physics will take you far. Keep learning!”</p>
                    <p className="font-bold mt-2 text-indigo-600">- Mohammed Sarique</p>
                </div>
            </div>

            <div className="mt-8 flex justify-center gap-4">
                <button onClick={handleDownload} className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">Download Certificate</button>
                <button onClick={onReset} className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700">Try Another Quiz</button>
            </div>
        </div>
    );
};

interface QuizFlowProps {
  initialView: View;
  studentName: string;
  selectedTopics: string[];
  onQuizComplete: (result: QuizResult) => void;
  quizResult: QuizResult | null;
  onReset: () => void;
}

const QuizFlow: React.FC<QuizFlowProps> = ({ initialView, studentName, selectedTopics, onQuizComplete, quizResult, onReset }) => {
    switch (initialView) {
        case 'quiz':
            return <QuizView studentName={studentName} topics={selectedTopics} onComplete={onQuizComplete} />;
        case 'certificate':
            if (!quizResult) {
                return <div className="text-center"><p>No quiz result found.</p><button onClick={onReset}>Go Home</button></div>
            }
            return <Certificate studentName={studentName} topics={selectedTopics} result={quizResult} onReset={onReset} />;
        default:
            return null;
    }
}

export default QuizFlow;