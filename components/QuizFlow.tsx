import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, type QuizQuestion, type QuizResult } from '../types';
import type { SoloQuizConfig } from '../App';
import { generateQuizQuestions } from '../services/geminiService';
import { MOTIVATIONAL_QUOTES } from '../constants';
import LoadingSpinner from './LoadingSpinner';

declare var html2canvas: any;
declare var jspdf: any;

const Timer: React.FC<{ seconds: number }> = ({ seconds }) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return (
        <div className="text-2xl font-bold text-indigo-600 bg-white px-4 py-2 rounded-lg shadow">
            {String(minutes).padStart(2, '0')}:{String(remainingSeconds).padStart(2, '0')}
        </div>
    );
};

const QuizView: React.FC<{
    studentName: string;
    topics: string[];
    config: SoloQuizConfig;
    onComplete: (result: QuizResult) => void;
}> = ({ studentName, topics, config, onComplete }) => {
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [incorrectAnswers, setIncorrectAnswers] = useState(0);
    const [isAnswered, setIsAnswered] = useState(false);
    const [timeLeft, setTimeLeft] = useState(config.timeLimit * 60);
    
    const isCompletedRef = useRef(false);
    
    const completeQuiz = useCallback((finalCorrect: number, finalIncorrect: number) => {
        if (!isCompletedRef.current) {
            isCompletedRef.current = true;
            onComplete({
                correctAnswers: finalCorrect,
                incorrectAnswers: finalIncorrect,
                totalQuestions: config.questionCount,
            });
        }
    }, [onComplete, config.questionCount]);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const fetchedQuestions = await generateQuizQuestions(topics, config.questionCount);
                if (fetchedQuestions.length < config.questionCount) {
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
    }, [topics, config.questionCount, onComplete]);

     useEffect(() => {
        if (!config.timerEnabled || loading) return;

        const timer = setInterval(() => {
            setTimeLeft(t => {
                if (t <= 1) {
                    clearInterval(timer);
                    // Quiz ends, calculate results with remaining unanswered as incorrect
                    const unanswered = config.questionCount - (correctAnswers + incorrectAnswers);
                    completeQuiz(correctAnswers, incorrectAnswers + unanswered);
                    return 0;
                }
                return t - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [config.timerEnabled, loading, correctAnswers, incorrectAnswers, config.questionCount, completeQuiz]);

    const handleAnswer = (selectedOption: string) => {
        if (isAnswered || questions.length === 0) return;
        
        const currentQuestion = questions[currentQuestionIndex];
        setIsAnswered(true);

        const isCorrect = selectedOption === currentQuestion.correctAnswer;
        
        const updatedCorrect = correctAnswers + (isCorrect ? 1 : 0);
        const updatedIncorrect = incorrectAnswers + (isCorrect ? 0 : 1);

        if (isCorrect) {
            setCorrectAnswers(updatedCorrect);
        } else {
            setIncorrectAnswers(updatedIncorrect);
        }
        
        setTimeout(() => {
            setIsAnswered(false);
            if (currentQuestionIndex + 1 >= config.questionCount) {
                completeQuiz(updatedCorrect, updatedIncorrect);
            } else {
                setCurrentQuestionIndex(i => i + 1);
            }
        }, 1500);
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
                {config.timerEnabled && <Timer seconds={timeLeft} />}
                <div className="text-xl font-semibold text-gray-700">Incorrect: <span className="text-red-500">{incorrectAnswers}</span></div>
            </div>

            <div className="mb-6 flex justify-between items-center">
                <div className={`text-sm font-bold uppercase px-3 py-1 rounded-full ${currentQuestion.difficulty === 'easy' ? 'bg-green-100 text-green-800' : currentQuestion.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                    {currentQuestion.difficulty}
                </div>
                <div className="text-right text-sm text-gray-500">Question {questionNumber} of {config.questionCount}</div>
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

        </div>
    );
};


const CertificateBadge: React.FC<{ type: 'Gold' | 'Silver' | 'Bronze' }> = ({ type }) => {
    const config = {
        Gold: {
            gradient: "url(#gold-gradient)",
            shadow: "drop-shadow(0 5px 8px rgba(255, 215, 0, 0.5))",
            textColor: "text-amber-700",
            title: "Gold Achievement"
        },
        Silver: {
            gradient: "url(#silver-gradient)",
            shadow: "drop-shadow(0 5px 8px rgba(192, 192, 192, 0.5))",
            textColor: "text-slate-700",
            title: "Silver Achievement"
        },
        Bronze: {
            gradient: "url(#bronze-gradient)",
            shadow: "drop-shadow(0 5px 8px rgba(205, 127, 50, 0.5))",
            textColor: "text-orange-800",
            title: "Bronze Achievement"
        },
    };
    const { gradient, shadow, textColor, title } = config[type];

    return (
        <div className="flex flex-col items-center gap-4 mb-6">
            <svg width="120" height="120" viewBox="0 0 120 120" style={{ filter: shadow }}>
                <defs>
                    <radialGradient id="gold-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                        <stop offset="0%" stopColor="#FFF7B0" />
                        <stop offset="100%" stopColor="#FFD700" />
                    </radialGradient>
                    <radialGradient id="silver-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                        <stop offset="0%" stopColor="#F5F5F5" />
                        <stop offset="100%" stopColor="#B0B0B0" />
                    </radialGradient>
                    <radialGradient id="bronze-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                        <stop offset="0%" stopColor="#F0D1B3" />
                        <stop offset="100%" stopColor="#CD7F32" />
                    </radialGradient>
                </defs>
                <path d="M60 2 L75.45 31.18 L108.51 35.21 L84.26 58.82 L90.9 91.82 L60 76.5 L29.1 91.82 L35.74 58.82 L11.49 35.21 L44.55 31.18 Z" fill={gradient}/>
                <path d="M60 48 L62.83 54.06 L69.42 54.06 L64.3 57.94 L65.66 64.31 L60 60.94 L54.34 64.31 L55.7 57.94 L50.58 54.06 L57.17 54.06 Z" fill="white" opacity="0.9"/>
            </svg>
            <h3 className={`text-3xl font-bold ${textColor}`}>{title}</h3>
        </div>
    );
};

const CertificateView: React.FC<{
    studentName: string;
    result: QuizResult;
    onReset: () => void;
}> = ({ studentName, result, onReset }) => {
    const certRef = useRef<HTMLDivElement>(null);
    const certData = result.certificateData;
    const loading = !certData;

    const motivationalQuote = MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
    
    const accuracy = result.totalQuestions > 0 ? (result.correctAnswers / result.totalQuestions) * 100 : 0;
    const tier = accuracy === 100 ? 'Gold' : accuracy >= 90 ? 'Silver' : 'Bronze';

    const theme = {
        Gold: { bg: 'bg-gradient-to-br from-yellow-50 via-amber-100 to-yellow-200', border: 'border-amber-400' },
        Silver: { bg: 'bg-gradient-to-br from-slate-100 via-gray-200 to-slate-300', border: 'border-slate-400' },
        Bronze: { bg: 'bg-gradient-to-br from-orange-100 via-amber-200 to-orange-200', border: 'border-orange-400' },
    };
    
    const { bg, border } = theme[tier];

    const handleDownload = async () => {
        if (!certRef.current) return;
        const canvas = await html2canvas(certRef.current, { scale: 2, backgroundColor: null }); // Use null for transparent bg on canvas
        const imgData = canvas.toDataURL('image/png');
        const { jsPDF } = jspdf;
        const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [canvas.width, canvas.height] });
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save(`Physics-Helper-Certificate-${studentName}.pdf`);
    };

    const handleShare = () => {
        const shareUrl = 'https://ai.google.dev/gemini-api/docs/models/gemini';
        if (navigator.share) {
            navigator.share({
                title: 'I earned a certificate on Physics Helper!',
                text: `I just earned a ${tier} certificate on the Physics Helper app with a score of ${accuracy.toFixed(0)}%! I was tested on ${result.categories?.join(', ')}.`,
                url: shareUrl,
            }).catch(console.error);
        } else {
            alert('Share feature is not supported on this browser.');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div ref={certRef} className={`p-8 md:p-12 rounded-2xl shadow-2xl border-4 ${bg} ${border} text-center`}>
                <CertificateBadge type={tier} />

                <p className="text-xl text-gray-600 my-2">This certificate is proudly presented to</p>
                <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500 my-4 tracking-tight">
                    {studentName}
                </h1>
                <p className="text-lg text-gray-700">for outstanding performance in the IGCSE Physics Quiz on {new Date().toLocaleDateString()}.</p>
                
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8 text-center max-w-md mx-auto">
                    <div className="p-4 bg-white/50 rounded-lg">
                        <p className="text-4xl font-bold text-green-600">{result.correctAnswers}/{result.totalQuestions}</p>
                        <p className="text-gray-600">Correct Answers</p>
                    </div>
                    <div className="p-4 bg-white/50 rounded-lg">
                        <p className="text-4xl font-bold text-blue-600">{accuracy.toFixed(0)}%</p>
                        <p className="text-gray-600">Score</p>
                    </div>
                </div>

                {loading ? <div className="py-4"><LoadingSpinner/></div> : (
                    <div className="text-left space-y-4 my-6 bg-white/60 p-6 rounded-lg">
                        <div className="mb-4">
                            <h4 className="font-bold text-lg text-gray-800">Quiz Categories:</h4>
                            <p className="text-gray-700">{result.categories?.join(', ')}</p>
                        </div>
                        <h4 className="font-bold text-lg text-gray-800">Performance Summary:</h4>
                        <p className="text-gray-700">{certData?.summary}</p>
                        <h4 className="font-bold text-lg text-gray-800">Areas for Improvement:</h4>
                        <p className="text-gray-700">{certData?.improvementAreas}</p>
                    </div>
                )}
                <p className="mt-8 text-gray-500 italic">"{motivationalQuote}"</p>
            </div>
            <div className="mt-8 flex justify-center flex-wrap gap-4">
                <button onClick={handleDownload} className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">Download PDF</button>
                <button onClick={handleShare} className="px-6 py-3 bg-teal-500 text-white font-semibold rounded-lg shadow-md hover:bg-teal-600 transition">Share</button>
                <button onClick={onReset} className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition">Back to Home</button>
            </div>
        </div>
    );
};

const ImprovementReportView: React.FC<{
    studentName: string;
    result: QuizResult;
    onReset: () => void;
}> = ({ studentName, result, onReset }) => {
    const reportRef = useRef<HTMLDivElement>(null);
    const report = result.improvementReport;
    const loading = !report;
    const motivationalQuote = MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];

    const accuracy = result.totalQuestions > 0 ? (result.correctAnswers / result.totalQuestions) * 100 : 0;

    const handleDownload = async () => {
        if (!reportRef.current) return;
        const canvas = await html2canvas(reportRef.current, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');
        const { jsPDF } = jspdf;
        const pdf = new jsPDF({ orientation: 'portrait', unit: 'px', format: [canvas.width, canvas.height] });
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save(`Physics-Helper-Report-${studentName}.pdf`);
    };

    const handleShare = () => {
        const shareUrl = 'https://ai.google.dev/gemini-api/docs/models/gemini';
        if (navigator.share) {
            navigator.share({
                title: 'My Physics Quiz Report',
                text: `I just took a quiz on Physics Helper! My score was ${accuracy.toFixed(0)}%. Time to review and improve!`,
                url: shareUrl,
            }).catch(console.error);
        } else {
            alert('Share feature is not supported on this browser.');
        }
    };

    return (
        <div className="max-w-3xl mx-auto text-center p-4">
            <div ref={reportRef} className="p-8 bg-white rounded-xl shadow-xl text-center border-t-8 border-indigo-500">
                <h2 className="text-4xl font-bold text-gray-800">Quiz Report for {studentName}</h2>
                <p className="text-gray-600 mt-2">Quiz Date: {new Date().toLocaleDateString()}</p>
                
                <div className="my-4 text-center">
                    <p className="font-bold text-gray-700">Quiz Categories:</p>
                    <p className="text-gray-600">{result.categories?.join(', ')}</p>
                </div>

                <div className="my-8 flex justify-center items-center gap-4">
                    <div className="text-right">
                        <p className="text-5xl font-bold text-red-500">{accuracy.toFixed(0)}%</p>
                        <p className="text-gray-600">Your Score</p>
                    </div>
                    <div className="text-left">
                        <p className="text-2xl font-bold text-gray-700">{result.correctAnswers} / {result.totalQuestions}</p>
                        <p className="text-gray-600">Correct Answers</p>
                    </div>
                </div>

                {loading ? <LoadingSpinner /> : (
                    <div className="text-left my-6 bg-indigo-50 p-6 rounded-lg border-l-4 border-indigo-400">
                        <h4 className="font-bold text-lg text-indigo-800">Focus Areas for Improvement:</h4>
                        <ul className="list-disc list-inside mt-2 text-indigo-900 space-y-1">
                            {report?.improvementAreas.map((area, i) => <li key={i}>{area}</li>)}
                        </ul>
                        <h4 className="font-bold text-lg text-indigo-800 mt-6">A Quick Note:</h4>
                        <p className="italic text-indigo-900 mt-1">"{report?.motivationalMessage}"</p>
                    </div>
                )}
                <p className="mt-8 text-gray-500 italic">"{motivationalQuote}"</p>
            </div>
            <div className="mt-8 flex justify-center flex-wrap gap-4">
                <button onClick={handleDownload} className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">Download Report</button>
                <button onClick={handleShare} className="px-6 py-3 bg-teal-500 text-white font-semibold rounded-lg shadow-md hover:bg-teal-600 transition">Share</button>
                <button onClick={onReset} className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition">Try Again</button>
            </div>
        </div>
    );
};

interface QuizFlowProps {
  initialView: View;
  studentName: string;
  selectedTopics: string[];
  quizConfig: SoloQuizConfig;
  quizResult: QuizResult | null;
  onQuizComplete: (result: QuizResult) => void;
  onReset: () => void;
}

const QuizFlow: React.FC<QuizFlowProps> = ({ initialView, studentName, selectedTopics, quizConfig, quizResult, onQuizComplete, onReset }) => {
    const accuracy = quizResult && quizResult.totalQuestions > 0 ? (quizResult.correctAnswers / quizResult.totalQuestions) * 100 : 0;
    const hasCertificate = quizResult && accuracy >= 70 && !quizResult.error;

    switch (initialView) {
        case View.QUIZ:
            return <QuizView studentName={studentName} topics={selectedTopics} config={quizConfig} onComplete={onQuizComplete} />;
        case View.CERTIFICATE:
            if (!quizResult) {
                return <p>An error occurred displaying the results.</p>;
            }
             if (quizResult.error) {
                 return <div className="text-center"><p className="text-red-500 text-lg mb-4">We're sorry, but an error occurred while generating your quiz.</p><button onClick={onReset} className="px-6 py-3 bg-indigo-600 text-white rounded-lg">Back to Home</button></div>;
            }
            return hasCertificate 
                ? <CertificateView studentName={studentName} result={quizResult} onReset={onReset} />
                : <ImprovementReportView studentName={studentName} result={quizResult} onReset={onReset} />;
        default:
            return null;
    }
};

export default QuizFlow;