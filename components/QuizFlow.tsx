import React, { useState, useEffect, useCallback, useRef, memo } from 'react';
import { View, type QuizQuestion, type QuizResult, type SoloQuizConfig, Indicator } from '../types';
import { generateQuizQuestions } from '../services/geminiService';
import { MOTIVATIONAL_QUOTES, PHYSICS_CATEGORIES } from '../constants';
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
            const indicatorsForQuiz: Indicator[] = config.categories.flatMap(categoryName => {
                const category = PHYSICS_CATEGORIES.find(c => c.name === categoryName);
                if (!category) return [];

                const allIndicators: Indicator[] = [];

                category.topics.forEach(topic => {
                    if (topic.indicators) {
                        allIndicators.push(...topic.indicators);
                    }
                    if (topic.subTopics) {
                        topic.subTopics.forEach(subTopic => {
                            if (subTopic.indicators) {
                                allIndicators.push(...subTopic.indicators);
                            }
                        });
                    }
                });

                return allIndicators;
            }).filter(indicator => {
                if (config.syllabusLevel === 'core') {
                    return !indicator.isSupplement;
                }
                return true; // for 'extended', include all
            });

            if (indicatorsForQuiz.length === 0) {
                setError("No syllabus points found for the selected categories and syllabus level. Please select different options.");
                onComplete({ correctAnswers: 0, incorrectAnswers: 0, totalQuestions: 0, error: true });
                setLoading(false);
                return;
            }

            try {
                const fetchedQuestions = await generateQuizQuestions(indicatorsForQuiz, config.questionCount, config.seed);
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
    }, [config, onComplete]);

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

const TierSeal: React.FC<{ type: 'Gold' | 'Silver' | 'Bronze' }> = ({ type }) => {
    const themes = {
        Gold: {
            gradientFrom: 'from-amber-400',
            gradientTo: 'to-yellow-500',
            shadow: 'shadow-yellow-500/50',
            textColor: 'text-yellow-800',
        },
        Silver: {
            gradientFrom: 'from-slate-400',
            gradientTo: 'to-gray-500',
            shadow: 'shadow-slate-500/50',
            textColor: 'text-gray-800',
        },
        Bronze: {
            gradientFrom: 'from-orange-500',
            gradientTo: 'to-amber-600',
            shadow: 'shadow-orange-500/50',
            textColor: 'text-orange-900',
        },
    };
    const theme = themes[type];

    return (
        <div className={`relative w-20 h-20`}>
            <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradientFrom} ${theme.gradientTo} rounded-full shadow-lg ${theme.shadow} flex items-center justify-center`}>
                <svg className="w-12 h-12 text-white drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
                     <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
                </svg>
            </div>
            <div className={`absolute -inset-1 rounded-full border-2 border-white/50`}></div>
        </div>
    );
};

const CornerFlourish: React.FC<{ position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'; color: string }> = ({ position, color }) => {
    const posClasses = {
        'top-left': 'top-2 left-2',
        'top-right': 'top-2 right-2 transform rotate-90',
        'bottom-left': 'bottom-2 left-2 transform -rotate-90',
        'bottom-right': 'bottom-2 right-2 transform rotate-180',
    };
    return (
        <svg className={`absolute w-12 h-12 ${posClasses[position]} ${color}`} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 5 H95 V15 H15 V95 H5 V5 Z" fill="currentColor" fillOpacity="0.1"/>
            <path d="M10 10 H90 V20 H20 V90 H10 V10 Z" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4"/>
        </svg>
    );
};

const CertificateView: React.FC<{
    studentName: string;
    result: QuizResult;
    onReset: () => void;
}> = memo(({ studentName, result, onReset }) => {
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
        Gold: { color: 'text-amber-500', bgColor: 'bg-amber-50', borderColor: 'border-amber-200' },
        Silver: { color: 'text-slate-500', bgColor: 'bg-slate-50', borderColor: 'border-slate-200' },
        Bronze: { color: 'text-orange-600', bgColor: 'bg-orange-50', borderColor: 'border-orange-200' },
    };
    const { color, bgColor, borderColor } = theme[tier];

    return (
        <div className="max-w-xs mx-auto p-2 sm:p-4 flex flex-col items-center space-y-4">
             <div className="relative p-6 bg-[#f7f5f2] rounded-lg shadow-2xl w-full text-center overflow-hidden border border-gray-300">
                <CornerFlourish position="top-left" color={color} />
                <CornerFlourish position="top-right" color={color} />
                <CornerFlourish position="bottom-left" color={color} />
                <CornerFlourish position="bottom-right" color={color} />
                
                <div className="relative z-10">
                    <div className="flex justify-center mb-3">
                        <TierSeal type={tier} />
                    </div>
                    
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">Certificate of Achievement</p>
                    <p className="text-xs text-gray-500 mt-2">This certificate is proudly presented to</p>
                    
                    <h1 className="text-3xl font-serif font-bold text-gray-800 my-2 break-words">
                        {studentName}
                    </h1>

                    <p className="text-xs text-gray-500">for demonstrating outstanding knowledge in IGCSE Physics.</p>
                    
                    <div className={`my-4 inline-block px-3 py-1 ${bgColor} ${color} rounded-full font-semibold text-xs border ${borderColor}`}>
                        {tier} Tier &bull; {roundedAccuracy}% Score
                    </div>

                    {loading ? <div className="py-2"><LoadingSpinner/></div> : (
                        <div className="text-left space-y-1 mt-3 bg-white/60 p-3 rounded-md border border-gray-200">
                             <h4 className="font-bold text-xs text-gray-700">Performance Summary:</h4>
                             <p className="text-gray-600 text-xs italic">"{certData?.summary}"</p>
                             <h4 className="font-bold text-xs text-gray-700 mt-1">Topics Covered:</h4>
                             <p className="text-gray-600 text-xs">{result.categories?.join(', ')}</p>
                        </div>
                    )}
                    
                     <div className="mt-4 pt-2 border-t border-gray-300/50 flex justify-between items-center text-[10px] text-gray-400">
                        <span>Date: {new Date().toLocaleDateString()}</span>
                        <span className="font-bold font-serif">Physics Helper</span>
                    </div>
                </div>
            </div>
            <div className="text-center p-2">
                <p className="text-gray-600 text-xs font-semibold">Take a screenshot to save and share your certificate!</p>
                <button onClick={onReset} className="mt-3 px-6 py-2 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition text-sm">Back to Home</button>
            </div>
        </div>
    );
});

const ImprovementReportView: React.FC<{
    studentName: string;
    result: QuizResult;
    onReset: () => void;
}> = memo(({ studentName, result, onReset }) => {
    const report = result.improvementReport;
    const loading = !report;

    const accuracy = result.totalQuestions > 0 ? (result.correctAnswers / result.totalQuestions) * 100 : 0;

    return (
        <div className="max-w-xs mx-auto p-2 flex flex-col items-center space-y-4">
            <div className="p-5 bg-white rounded-xl shadow-xl w-full border-t-4 border-indigo-500">
                <div className="text-center">
                    <h2 className="text-xl font-bold text-gray-800">Improvement Report</h2>
                    <p className="text-xs text-gray-500 mt-1">for <span className="font-semibold">{studentName}</span></p>
                </div>
                
                <div className="my-5 text-center bg-red-50 p-3 rounded-lg border border-red-200">
                    <p className="text-4xl font-bold text-red-500">{accuracy.toFixed(0)}<span className="text-2xl">%</span></p>
                    <p className="text-gray-600 text-xs mt-1">Score ({result.correctAnswers} / {result.totalQuestions} correct)</p>
                </div>

                {loading ? <div className="py-4"><LoadingSpinner/></div> : (
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-sm font-bold text-gray-700">Areas to Improve:</h3>
                            <ul className="list-disc list-inside text-sm text-gray-600 mt-1 pl-2 space-y-1">
                                {report?.improvementAreas.map((area, i) => <li key={i}>{area}</li>)}
                            </ul>
                        </div>
                        <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                            <p className="text-sm text-indigo-800 italic">"{report?.motivationalMessage}"</p>
                        </div>
                    </div>
                )}
                
                {result.error && (
                    <div className="mt-4 text-center p-3 bg-red-50 text-red-700 rounded-lg border border-red-200 text-sm">
                        <p>An error occurred. Your result might be incomplete.</p>
                    </div>
                )}
            </div>
            <div className="text-center p-2">
                <p className="text-gray-600 text-xs font-semibold">Study hard and try again to earn a certificate!</p>
                <button onClick={onReset} className="mt-3 px-6 py-2 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition text-sm">Back to Home</button>
            </div>
        </div>
    );
});

interface QuizFlowProps {
  initialView: View;
  studentName: string;
  quizConfig: SoloQuizConfig;
  onQuizComplete: (result: QuizResult) => void;
  quizResult: QuizResult | null;
  onReset: () => void;
}

const QuizFlow: React.FC<QuizFlowProps> = ({
  initialView,
  studentName,
  quizConfig,
  onQuizComplete,
  quizResult,
  onReset,
}) => {
  if (initialView === View.QUIZ) {
    return <QuizView studentName={studentName} config={quizConfig} onComplete={onQuizComplete} />;
  }

  if (initialView === View.CERTIFICATE && quizResult) {
    const accuracy = quizResult.totalQuestions > 0 ? (quizResult.correctAnswers / quizResult.totalQuestions) * 100 : 0;
    const hasCertificate = accuracy >= 61 && !quizResult.error;

    if (hasCertificate) {
      return <CertificateView studentName={studentName} result={quizResult} onReset={onReset} />;
    } else {
      return <ImprovementReportView studentName={studentName} result={quizResult} onReset={onReset} />;
    }
  }

  // This should not happen in the normal flow, but it's a safe fallback.
  return null;
};

export default QuizFlow;