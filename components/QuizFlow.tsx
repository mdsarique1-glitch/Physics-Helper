


import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, type QuizQuestion, type QuizResult, type SoloQuizConfig } from '../types';
import { generateQuizQuestions } from '../services/geminiService';
import { BIOLOGY_CATEGORIES, PHYSICS_CATEGORIES, LOADING_MESSAGES } from '../constants';
import LoadingSpinner from './LoadingSpinner';

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
    config: SoloQuizConfig;
    onComplete: (result: QuizResult) => void;
}> = ({ studentName, config, onComplete }) => {
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [incorrectAnswers, setIncorrectAnswers] = useState(0);
    const [isAnswered, setIsAnswered] = useState(false);
    const [timeLeft, setTimeLeft] = useState(config.timeLimit * 60);
    const [loadingMessage, setLoadingMessage] = useState("Generating your personalized quiz...");

    const isCompletedRef = useRef(false);
    
    const completeQuiz = useCallback((finalCorrect: number, finalIncorrect: number, totalQuestions: number) => {
        if (!isCompletedRef.current) {
            isCompletedRef.current = true;
            onComplete({
                correctAnswers: finalCorrect,
                incorrectAnswers: finalIncorrect,
                totalQuestions: totalQuestions,
                isGroupChallenge: !!config.seed,
                subject: config.subject,
            });
        }
    }, [onComplete, config.seed, config.subject]);

     useEffect(() => {
        if (loading) {
            const interval = setInterval(() => {
                setLoadingMessage(LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)]);
            }, 2000);
            return () => clearInterval(interval);
        }
    }, [loading]);

    useEffect(() => {
        const fetchQuestions = async () => {
            setLoading(true);

            if (config.seed) { // Caching logic for group quizzes
                const cacheKey = `group-quiz-${config.seed}`;
                try {
                    const cachedData = sessionStorage.getItem(cacheKey);
                    if (cachedData) {
                        const parsedQuestions: QuizQuestion[] = JSON.parse(cachedData);
                        if (Array.isArray(parsedQuestions) && parsedQuestions.length > 0) {
                           setQuestions(parsedQuestions);
                           setLoading(false);
                           return;
                        }
                    }
                } catch (e) {
                    console.warn("Could not retrieve cached quiz, fetching fresh.", e);
                    sessionStorage.removeItem(cacheKey);
                }
            }

            const allCategories = config.subject === 'biology' ? BIOLOGY_CATEGORIES : PHYSICS_CATEGORIES;
            const selectedCategories = allCategories.filter(c => config.categories.includes(c.name));

            if (selectedCategories.length === 0) {
                setError("No categories selected for the quiz. Please select different options.");
                onComplete({ correctAnswers: 0, incorrectAnswers: 0, totalQuestions: 0, error: true, subject: config.subject });
                setLoading(false);
                return;
            }

            try {
                const fetchedQuestions = await generateQuizQuestions(studentName, selectedCategories, config.questionCount, config.syllabusLevel, config.subject, config.seed);
                if (fetchedQuestions.length < config.questionCount) {
                    throw new Error("Could not generate a full set of quiz questions.");
                }
                setQuestions(fetchedQuestions);
                 if (config.seed) {
                    const cacheKey = `group-quiz-${config.seed}`;
                    try {
                        sessionStorage.setItem(cacheKey, JSON.stringify(fetchedQuestions));
                    } catch (e) {
                        console.warn("Could not cache quiz:", e);
                    }
                }
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred.";
                setError(`Failed to start the quiz. ${errorMessage}`);
                if (!isCompletedRef.current) {
                    isCompletedRef.current = true;
                    onComplete({ correctAnswers: 0, incorrectAnswers: 0, totalQuestions: 0, error: true, subject: config.subject });
                }
            } finally {
                setLoading(false);
            }
        };
        fetchQuestions();
    }, [config, onComplete, studentName]);

     useEffect(() => {
        if (!config.timerEnabled || loading || questions.length === 0) return;

        const timer = setInterval(() => {
            setTimeLeft(t => {
                if (t <= 1) {
                    clearInterval(timer);
                    const unanswered = questions.length - (correctAnswers + incorrectAnswers);
                    completeQuiz(correctAnswers, incorrectAnswers + unanswered, questions.length);
                    return 0;
                }
                return t - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [config.timerEnabled, loading, questions, correctAnswers, incorrectAnswers, completeQuiz]);

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
            if (currentQuestionIndex + 1 >= questions.length) {
                completeQuiz(updatedCorrect, updatedIncorrect, questions.length);
            } else {
                setCurrentQuestionIndex(i => i + 1);
            }
        }, 1500);
    };

    if (loading) return <div className="flex flex-col items-center justify-center h-64"><LoadingSpinner /><p className="mt-4 text-lg text-gray-600 text-center w-3/4">{loadingMessage}</p></div>;
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

            <div className="mb-6 flex justify-end items-center">
                <div className="text-right text-sm text-gray-500">Question {questionNumber} of {questions.length}</div>
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

const TierSeal: React.FC<{ type: 'Gold' | 'Silver' | 'Bronze' }> = ({ type }) => {
    const theme = {
        Gold: { sealColor: 'bg-amber-400', ringColor: 'ring-amber-200' },
        Silver: { sealColor: 'bg-slate-400', ringColor: 'ring-slate-200' },
        Bronze: { sealColor: 'bg-orange-400', ringColor: 'ring-orange-200' },
    };
    const { sealColor, ringColor } = theme[type];

    return (
        <div className={`w-20 h-20 rounded-full ${sealColor} flex items-center justify-center shadow-lg ring-4 ${ringColor}`}>
            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
            </svg>
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
    
    const accuracy = result.totalQuestions > 0 ? (result.correctAnswers / result.totalQuestions) * 100 : 0;
    const roundedAccuracy = Math.round(accuracy);
    
    const getTier = (acc: number): 'Gold' | 'Silver' | 'Bronze' => {
        if (acc >= 81) return 'Gold';
        if (acc >= 71) return 'Silver';
        return 'Bronze';
    };
    const tier = getTier(roundedAccuracy);

    const theme = {
        Gold: { borderColor: 'border-amber-300', bgColor: 'bg-amber-100', textColor: 'text-amber-800' },
        Silver: { borderColor: 'border-slate-300', bgColor: 'bg-slate-100', textColor: 'text-slate-800' },
        Bronze: { borderColor: 'border-orange-300', bgColor: 'bg-orange-100', textColor: 'text-orange-800' },
    };
    const { borderColor, bgColor, textColor } = theme[tier];
    const subjectTitle = result.subject ? result.subject.charAt(0).toUpperCase() + result.subject.slice(1) : "Science";


    return (
        <div className="max-w-md mx-auto p-2 sm:p-4 flex flex-col items-center space-y-4">
            <div ref={certRef} className="relative pt-12 pb-8 px-6 bg-white rounded-lg shadow-2xl w-full text-center overflow-hidden">
                <div className={`absolute top-0 left-0 w-24 h-24 border-t-8 border-l-8 ${borderColor} rounded-tl-lg`}></div>
                <div className={`absolute bottom-0 right-0 w-24 h-24 border-b-8 border-r-8 ${borderColor} rounded-br-lg`}></div>

                <div className="relative z-10">
                    <div className="flex justify-center mb-4">
                        <TierSeal type={tier} />
                    </div>
                    
                    <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-500">Certificate of Achievement</h2>
                    <p className="text-gray-600 mt-4">This certificate is awarded to</p>
                    
                    <h1 className="text-4xl font-serif font-bold text-gray-800 my-2">
                        {studentName}
                    </h1>

                    <p className="text-gray-600">
                        for demonstrating outstanding knowledge in IGCSE {subjectTitle}{result.isGroupChallenge ? " during a group challenge." : "."}
                    </p>
                    
                    <div className={`my-6 inline-block px-4 py-2 ${bgColor} ${textColor} rounded-full font-semibold text-sm`}>
                        {tier} Tier &bull; {roundedAccuracy}% Score
                    </div>

                    {loading ? <div className="py-4"><LoadingSpinner/></div> : (
                        <div className="text-left space-y-2 mt-4 bg-gray-50 p-4 rounded-md border border-gray-200">
                             <h4 className="font-bold text-sm text-gray-700">Performance Summary:</h4>
                             <p className="text-gray-600 text-sm">{certData?.summary}</p>
                             <h4 className="font-bold text-sm text-gray-700 mt-2">Topics Covered:</h4>
                             <p className="text-gray-600 text-sm">{result.categories?.join(', ')}</p>
                        </div>
                    )}
                    
                    <div className="mt-8 flex justify-between items-center text-xs text-gray-500">
                        <span>Date: {new Date().toLocaleDateString()}</span>
                        <span className="font-bold">Science Helper</span>
                    </div>
                </div>
            </div>
            <div className="text-center p-4 w-full flex flex-col items-center gap-4">
                <p className="p-4 bg-green-100 text-green-800 rounded-lg text-center font-semibold">
                    Congratulations! Take a screenshot to share your achievement.
                </p>
                <button onClick={onReset} className="px-8 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition">Back to Home</button>
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
    const subjectTitle = result.subject ? result.subject.charAt(0).toUpperCase() + result.subject.slice(1) : "Science";

    const accuracy = result.totalQuestions > 0 ? (result.correctAnswers / result.totalQuestions) * 100 : 0;

    return (
        <div className="max-w-sm mx-auto p-2 flex flex-col items-center space-y-4">
            <div ref={reportRef} className="p-6 bg-white rounded-lg shadow-xl text-center border-t-4 border-indigo-500 w-full">
                <h2 className="text-2xl font-bold text-gray-800">Quiz Report - IGCSE {subjectTitle}</h2>
                <p className="text-sm text-gray-500 mt-1">for <span className="font-semibold">{studentName}</span></p>
                
                <div className="my-6 text-center">
                    <p className="text-5xl font-bold text-red-500">{accuracy.toFixed(0)}<span className="text-3xl">%</span></p>
                    <p className="text-gray-600 text-sm mt-1">Score ({result.correctAnswers} / {result.totalQuestions} correct)</p>
                </div>

                <div className="my-4 text-xs text-center text-gray-500">
                    <p className="font-bold">Topics:</p>
                    <p>{result.categories?.join(', ')}</p>
                </div>

                {loading ? <div className="my-6"><LoadingSpinner /></div> : (
                    <div className="text-left my-6 bg-indigo-50 p-4 rounded-md border-l-4 border-indigo-400">
                        <h4 className="font-bold text-md text-indigo-800">Focus Areas for Improvement:</h4>
                        <ul className="list-disc list-inside mt-2 text-indigo-900 space-y-1 text-sm">
                            {report?.improvementAreas.map((area, i) => <li key={i}>{area}</li>)}
                        </ul>
                        <p className="italic text-indigo-900 mt-4 text-sm">"{report?.motivationalMessage}"</p>
                    </div>
                )}
                <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
                    <span>{new Date().toLocaleDateString()}</span>
                    <span className="font-bold">Science Helper</span>
                </div>
            </div>
            <div className="text-center p-2">
                <button onClick={onReset} className="mt-2 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition text-sm">Try Again</button>
            </div>
        </div>
    );
};

interface QuizFlowProps {
  initialView: View;
  studentName: string;
  quizConfig: SoloQuizConfig;
  quizResult: QuizResult | null;
  onQuizComplete: (result: QuizResult) => void;
  onReset: () => void;
}

const QuizFlow: React.FC<QuizFlowProps> = ({ initialView, studentName, quizConfig, quizResult, onQuizComplete, onReset }) => {
    const accuracy = quizResult && quizResult.totalQuestions > 0 ? (quizResult.correctAnswers / quizResult.totalQuestions) * 100 : 0;
    const hasCertificate = quizResult && accuracy >= 61 && !quizResult.error;

    switch (initialView) {
        case View.QUIZ:
            return <QuizView studentName={studentName} config={quizConfig} onComplete={onQuizComplete} />;
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