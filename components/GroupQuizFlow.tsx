import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { QuizQuestion, QuizResult, CertificateData, View, GroupQuiz, Participant, GroupQuizReport, SoloImprovementReport } from '../types';
import { generateGroupQuizReport, getCertificateData, getSoloImprovementReport } from '../services/geminiService';
import { PHYSICS_CATEGORIES, MOTIVATIONAL_QUOTES } from '../constants';
import LoadingSpinner from './LoadingSpinner';
import CertificateShowcase from './CertificateShowcase';

// FIX: Add global window declarations for html2canvas to resolve TypeScript errors.
declare global {
    interface Window {
        html2canvas: any;
    }
}

const waitForHtml2Canvas = (timeout = 3000): Promise<any> => {
    return new Promise((resolve, reject) => {
        const startTime = Date.now();
        const check = () => {
            if (typeof window.html2canvas !== 'undefined') {
                resolve(window.html2canvas);
            } else if (Date.now() - startTime > timeout) {
                reject(new Error("html2canvas library failed to load in time."));
            } else {
                setTimeout(check, 100);
            }
        };
        check();
    });
};

const Timer: React.FC<{ seconds: number }> = ({ seconds }) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return (
        <div className="text-2xl font-bold text-indigo-600 bg-white px-4 py-2 rounded-lg shadow">
            {String(minutes).padStart(2, '0')}:{String(remainingSeconds).padStart(2, '0')}
        </div>
    );
};

const QuizLobby: React.FC<{
    quiz: GroupQuiz;
    isOrganizer: boolean;
    onQuizStart: (quiz: GroupQuiz) => void;
    onGoBack?: () => void;
}> = ({ quiz, isOrganizer, onQuizStart, onGoBack }) => {
    const [participants, setParticipants] = useState(quiz.participants);

    useEffect(() => {
        const interval = setInterval(() => {
            const updatedQuizData = localStorage.getItem(`group-quiz-${quiz.code}`);
            if (updatedQuizData) {
                const updatedQuiz: GroupQuiz = JSON.parse(updatedQuizData);
                setParticipants(updatedQuiz.participants);
                if (updatedQuiz.status === 'inprogress') {
                    onQuizStart(updatedQuiz);
                }
            }
        }, 2000); // Poll for updates
        return () => clearInterval(interval);
    }, [quiz.code, onQuizStart]);

    const handleStartQuiz = () => {
        if (participants.length === 0) {
            alert("Please wait for participants to join before starting the quiz.");
            return;
        }
        const updatedQuiz = { ...quiz, status: 'inprogress' as 'inprogress', startTime: Date.now() };
        localStorage.setItem(`group-quiz-${quiz.code}`, JSON.stringify(updatedQuiz));
        localStorage.removeItem('organizer-active-quiz');
        onQuizStart(updatedQuiz);
    };

    return (
        <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-2xl text-center relative">
            {isOrganizer && onGoBack && (
                <button onClick={onGoBack} className="absolute top-4 left-4 text-indigo-600 hover:text-indigo-800 font-semibold flex items-center p-2 rounded-lg hover:bg-indigo-50 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Back to Setup
                </button>
            )}
            <h2 className="text-3xl font-bold text-indigo-700 mt-8 md:mt-0">Group Quiz Lobby</h2>
            <p className="text-lg mt-2 text-gray-600">{quiz.config.title}</p>
            <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
                <p className="text-gray-800">Share this code with participants:</p>
                <p className="text-4xl font-mono font-bold text-indigo-600 tracking-widest my-2 bg-white py-2 rounded">{quiz.code}</p>
            </div>

            <CertificateShowcase />

            <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-800">Participants ({participants.length}/15)</h3>
                <ul className="mt-4 space-y-2 text-left max-h-60 overflow-y-auto p-4 bg-gray-50 rounded-lg">
                    <li className="p-2 bg-yellow-100 rounded shadow-sm font-bold">{quiz.organizerName} (Organizer)</li>
                    {participants.map(p => (
                        <li key={p.id} className="p-2 bg-white rounded shadow-sm">{p.name}</li>
                    ))}
                </ul>
            </div>
            <div className="mt-8">
                {isOrganizer ? (
                    <div>
                        <button 
                            onClick={handleStartQuiz} 
                            disabled={participants.length === 0}
                            className="w-full py-4 bg-green-500 text-white font-bold text-lg rounded-lg shadow-md hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            Start Quiz for Everyone
                        </button>
                        {participants.length === 0 && <p className="text-sm text-gray-500 mt-2">Waiting for participants to join...</p>}
                    </div>
                ) : (
                    <div className="flex flex-col items-center">
                        <LoadingSpinner />
                        <p className="mt-4 text-gray-600">Waiting for the organizer to start the quiz...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const OrganizerQuizInProgressView: React.FC<{
    quiz: GroupQuiz;
    onQuizComplete: (quiz: GroupQuiz) => void;
}> = ({ quiz, onQuizComplete }) => {
    const [participants, setParticipants] = useState(quiz.participants);
    const [timeLeft, setTimeLeft] = useState(() => {
        const endTime = quiz.startTime! + quiz.config.timeLimit * 60 * 1000;
        return Math.max(0, Math.floor((endTime - Date.now()) / 1000));
    });

    const totalParticipants = participants.length;
    const finishedParticipants = participants.filter(p => p.isFinished).length;

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(t => Math.max(0, t - 1));
        }, 1000);
        return () => clearInterval(timer);
    }, []);


    useEffect(() => {
        const pollInterval = setInterval(() => {
            const updatedQuizData = localStorage.getItem(`group-quiz-${quiz.code}`);
            if (updatedQuizData) {
                const updatedQuiz: GroupQuiz = JSON.parse(updatedQuizData);
                setParticipants(updatedQuiz.participants);

                const allFinished = updatedQuiz.participants.length > 0 && updatedQuiz.participants.every(p => p.isFinished);
                
                if (allFinished || timeLeft <= 0) {
                    updatedQuiz.status = 'finished';
                    localStorage.setItem(`group-quiz-${quiz.code}`, JSON.stringify(updatedQuiz));
                    clearInterval(pollInterval);
                    onQuizComplete(updatedQuiz);
                }
            }
        }, 2000);
        return () => clearInterval(pollInterval);
    }, [quiz.code, onQuizComplete, timeLeft]);

    return (
        <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-2xl text-center">
            <h2 className="text-3xl font-bold text-indigo-700">Quiz in Progress...</h2>
             <div className="my-4 flex justify-center">
                <Timer seconds={timeLeft} />
            </div>
            <p className="text-lg mt-2 text-gray-600">{quiz.config.title}</p>
            <div className="my-8">
                <LoadingSpinner />
                <p className="mt-4 text-xl font-semibold text-gray-800">
                    {finishedParticipants} / {totalParticipants} participants have finished.
                </p>
                <p className="text-gray-600 mt-2">The results will be shown once everyone is done or the timer ends.</p>
            </div>
            <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-800">Live Status</h3>
                <ul className="mt-4 space-y-2 text-left max-h-60 overflow-y-auto p-4 bg-gray-50 rounded-lg">
                    {participants.map(p => (
                        <li key={p.id} className="p-2 bg-white rounded shadow-sm flex justify-between items-center">
                            <span>{p.name}</span>
                            {p.isFinished 
                                ? <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">Finished</span>
                                : <span className="text-xs font-bold text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full">In Progress</span>
                            }
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const GroupQuizView: React.FC<{
    quiz: GroupQuiz;
    participantId: string;
    onQuizComplete: (quiz: GroupQuiz) => void;
}> = ({ quiz, participantId, onQuizComplete }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(Math.max(0, Math.floor((quiz.startTime! + quiz.config.timeLimit * 60000 - Date.now()) / 1000)));
    const [isAnswered, setIsAnswered] = useState(false);

    const endQuiz = useCallback(() => {
        const finalQuizData = localStorage.getItem(`group-quiz-${quiz.code}`);
        if(finalQuizData) {
            let finalQuiz: GroupQuiz = JSON.parse(finalQuizData);
            const me = finalQuiz.participants.find(p => p.id === participantId);
            if (me && !me.isFinished) {
                me.score = score;
                me.isFinished = true;

                // Check if all participants are finished
                const allFinished = finalQuiz.participants.every(p => p.isFinished);
                if (allFinished) {
                    finalQuiz.status = 'finished';
                }
                localStorage.setItem(`group-quiz-${quiz.code}`, JSON.stringify(finalQuiz));
                 onQuizComplete(finalQuiz);
            }
        }
    }, [quiz.code, participantId, score, onQuizComplete]);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(t => {
                if (t <= 1) {
                    clearInterval(timer);
                    endQuiz();
                    return 0;
                }
                return t - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [endQuiz]);

    const handleAnswer = (selectedOption: string) => {
        if (isAnswered) return;
        setIsAnswered(true);

        if (selectedOption === quiz.questions[currentQuestionIndex].correctAnswer) {
            setScore(s => s + 10);
        }

        setTimeout(() => {
            if (currentQuestionIndex + 1 >= quiz.questions.length) {
                endQuiz();
            } else {
                setCurrentQuestionIndex(i => i + 1);
                setIsAnswered(false);
            }
        }, 1000);
    };

    const currentQuestion = quiz.questions[currentQuestionIndex];

    return (
        <div className="max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-2xl">
            <div className="flex justify-between items-center mb-6">
                <div className="text-xl font-semibold text-gray-700">Score: <span className="text-green-500">{score}</span></div>
                <Timer seconds={timeLeft} />
            </div>
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <p className="text-sm text-gray-500 mb-2">Question {currentQuestionIndex + 1} of {quiz.questions.length}</p>
                <h2 className="text-2xl font-medium text-gray-800">{currentQuestion.question}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQuestion.options.map(option => (
                    <button key={option} onClick={() => handleAnswer(option)} disabled={isAnswered} className={`p-4 rounded-lg border-2 text-lg text-left transition ${isAnswered ? 'cursor-not-allowed' : 'hover:bg-indigo-50'}`}>
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

const CertificateBadge: React.FC<{ type: 'Gold' | 'Silver' | 'Bronze' }> = ({ type }) => {
    const config = {
        Gold: {
            gradient: "url(#gold-gradient)",
            textColor: "text-amber-700",
            title: "Gold Achievement"
        },
        Silver: {
            gradient: "url(#silver-gradient)",
            textColor: "text-slate-700",
            title: "Silver Achievement"
        },
        Bronze: {
            gradient: "url(#bronze-gradient)",
            textColor: "text-orange-800",
            title: "Bronze Achievement"
        },
    };
    const { gradient, textColor, title } = config[type];

    return (
        <div className="flex flex-col items-center gap-4 mb-6">
            <svg width="120" height="120" viewBox="0 0 120 120">
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

const GroupCertificateView: React.FC<{
    quiz: GroupQuiz;
    participant: Participant;
    onReset: () => void;
}> = ({ quiz, participant, onReset }) => {
    const sortedParticipants = [...quiz.participants].sort((a, b) => b.score - a.score);
    const rank = sortedParticipants.findIndex(p => p.id === participant.id) + 1;
    
    const result: QuizResult = {
        correctAnswers: participant.score / 10,
        totalQuestions: quiz.questions.length,
        incorrectAnswers: quiz.questions.length - (participant.score / 10),
        rank: rank,
    };
    
    const topics = PHYSICS_CATEGORIES
        .filter(c => quiz.config.categories.includes(c.name))
        .flatMap(c => c.topics.map(t => t.name));

    const ImprovementReport: React.FC = () => {
        const reportRef = useRef<HTMLDivElement>(null);
        const [report, setReport] = useState<SoloImprovementReport | null>(null);
        const [loading, setLoading] = useState(true);
        
        const accuracy = ((result.correctAnswers / result.totalQuestions) * 100);
        const motivationalQuote = MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];

        useEffect(() => { getSoloImprovementReport(participant.name, result.correctAnswers, result.totalQuestions, topics).then(setReport).catch(console.error).finally(() => setLoading(false)); }, []);

        const handleDownload = async () => {
            if (!reportRef.current) return;
            try {
                const html2canvas = await waitForHtml2Canvas();
                const canvas = await html2canvas(reportRef.current, { scale: 2, useCORS: true, backgroundColor: null });
                const image = canvas.toDataURL('image/jpeg', 0.95);
                
                const link = document.createElement('a');
                link.href = image;
                link.download = `Physics-Helper-Report-${participant.name}.jpg`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

            } catch (error) {
                console.error("Failed to download report as Image:", error);
                alert("Sorry, we couldn't generate the image. Please check your internet connection, disable any ad-blockers, and try again.");
            }
        };

        return (
            <div className="max-w-3xl mx-auto text-center p-4">
                <div ref={reportRef} className="p-8 bg-white rounded-xl shadow-xl text-center border-t-8 border-indigo-500">
                    <h2 className="text-4xl font-bold text-gray-800">Quiz Report for {participant.name}</h2>
                    <p className="text-gray-600 mt-2">Quiz Date: {new Date().toLocaleDateString()}</p>
                    <div className="my-4 text-center">
                        <p className="font-bold text-gray-700">Quiz Categories:</p>
                        <p className="text-gray-600">{quiz.config.categories.join(', ')}</p>
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
                        <h4 className="font-bold text-lg text-indigo-800">Areas for Improvement:</h4>
                        <ul className="list-disc list-inside mt-2 text-indigo-900 space-y-1">{report?.improvementAreas.map((area, i) => <li key={i}>{area}</li>)}</ul>
                        <h4 className="font-bold text-lg text-indigo-800 mt-6">A Quick Note:</h4>
                        <p className="italic text-indigo-900 mt-1">"{report?.motivationalMessage}"</p>
                    </div>)}
                    <p className="mt-8 text-gray-500 italic">"{motivationalQuote}"</p>
                    <div className="mt-6 pt-4 border-t-2 border-gray-300/50 flex items-center justify-start">
                        <div className="text-left">
                            <p className="font-bold text-lg text-indigo-800">Physics Helper</p>
                            <p className="text-xs text-gray-600">Your companion for IGCSE Physics</p>
                        </div>
                    </div>
                </div>
                 <div className="mt-8 flex justify-center flex-wrap gap-4">
                    <button onClick={handleDownload} className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">Download Image</button>
                    <button onClick={onReset} className="px-6 py-3 bg-indigo-600 text-white rounded-lg">Back to Home</button>
                </div>
            </div>
        );
    };

    const Certificate: React.FC = () => {
        const certRef = useRef<HTMLDivElement>(null);
        const [certData, setCertData] = useState<CertificateData | null>(null);
        const [loading, setLoading] = useState(true);

        const motivationalQuote = MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];

        useEffect(() => { getCertificateData(participant.name, result.correctAnswers, result.totalQuestions, topics).then(setCertData).catch(console.error).finally(() => setLoading(false)); }, []);
        
        const accuracy = (result.correctAnswers / result.totalQuestions) * 100;
        const roundedAccuracy = Math.round(accuracy);
        
        const getTier = (acc: number): 'Gold' | 'Silver' | 'Bronze' => {
            if (acc >= 81) return 'Gold';
            if (acc >= 71) return 'Silver';
            return 'Bronze';
        };
        const tier = getTier(roundedAccuracy);

        const theme = {
            Gold: { bg: 'bg-yellow-100', border: 'border-amber-400' },
            Silver: { bg: 'bg-slate-200', border: 'border-slate-400' },
            Bronze: { bg: 'bg-orange-200', border: 'border-orange-400' },
        };
        const { bg, border } = theme[tier];

        const handleDownload = async () => { 
            if (!certRef.current) return;
            try {
                const html2canvas = await waitForHtml2Canvas();
                const canvas = await html2canvas(certRef.current, { scale: 2, useCORS: true, backgroundColor: null }); 
                const imgData = canvas.toDataURL('image/jpeg', 0.95);
                
                const link = document.createElement('a');
                link.href = imgData;
                link.download = `Physics-Helper-Certificate-${participant.name}.jpg`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

            } catch (error) {
                console.error("Failed to download certificate as Image:", error);
                alert("Sorry, we couldn't generate the image. Please check your internet connection, disable any ad-blockers, and try again.");
            }
        };
        
        return (
            <div className="max-w-4xl mx-auto p-4">
                <div ref={certRef} className={`p-8 md:p-12 rounded-2xl shadow-2xl border-4 ${bg} ${border} text-center`}>
                    <CertificateBadge type={tier} />
                    <p className="text-xl text-gray-600 my-2">This certificate is proudly presented to</p>
                    <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500 my-4 tracking-tight">{participant.name}</h1>
                    <p className="text-lg text-gray-700">for outstanding performance in the Group Physics Quiz on {new Date().toLocaleDateString()}.</p>
                    <div className="my-6 text-center">
                        <p className="font-bold text-gray-700">Quiz Categories:</p>
                        <p className="text-gray-600">{quiz.config.categories.join(', ')}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-4 my-8 text-center max-w-lg mx-auto">
                        <div className="p-4 bg-white/50 rounded-lg"><p className="text-3xl font-bold text-green-600">{result.correctAnswers}/{result.totalQuestions}</p><p className="text-gray-600 text-sm">Correct</p></div>
                        <div className="p-4 bg-white/50 rounded-lg"><p className="text-3xl font-bold text-purple-600">#{result.rank}</p><p className="text-gray-600 text-sm">Group Rank</p></div>
                        <div className="p-4 bg-white/50 rounded-lg"><p className="text-3xl font-bold text-blue-600">{roundedAccuracy}%</p><p className="text-gray-600 text-sm">Score</p></div>
                    </div>
                    {loading ? <div className="py-4"><LoadingSpinner/></div> : (<div className="text-left space-y-4 my-6 bg-white/60 p-6 rounded-lg"><h4 className="font-bold text-lg text-gray-800">Performance Summary:</h4><p className="text-gray-700">{certData?.summary}</p></div>)}
                    <p className="mt-8 text-gray-500 italic">"{motivationalQuote}"</p>
                     <div className="mt-6 pt-4 border-t-2 border-gray-300/50 flex items-center justify-start">
                        <div className="text-left">
                            <p className="font-bold text-lg text-indigo-800">Physics Helper</p>
                            <p className="text-xs text-gray-600">Your companion for IGCSE Physics</p>
                        </div>
                    </div>
                </div>
                <div className="mt-8 flex justify-center flex-wrap gap-4">
                    <button onClick={handleDownload} className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">Download Image</button>
                    <button onClick={onReset} className="px-6 py-3 bg-gray-600 text-white rounded-lg">Back to Home</button>
                </div>
            </div>
        );
    };

    const accuracy = (result.correctAnswers / result.totalQuestions) * 100;
    return accuracy >= 61 ? <Certificate /> : <ImprovementReport />;
};


const GroupResultsView: React.FC<{
    quiz: GroupQuiz;
    participantId: string;
    isOrganizer: boolean;
    onReset: () => void;
}> = ({ quiz, participantId, isOrganizer, onReset }) => {
    const [view, setView] = useState<'leaderboard' | 'certificate'>('leaderboard');
    const [report, setReport] = useState<GroupQuizReport | null>(null);
    const [loadingReport, setLoadingReport] = useState(isOrganizer);
    const [quizState, setQuizState] = useState(quiz);
    const reportRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOrganizer) {
            generateGroupQuizReport(quizState)
                .then(setReport)
                .catch(err => console.error("Failed to generate group report:", err))
                .finally(() => setLoadingReport(false));
        }
    }, [isOrganizer, quizState]);

    useEffect(() => {
        const interval = setInterval(() => {
            const updatedQuizData = localStorage.getItem(`group-quiz-${quiz.code}`);
            if (updatedQuizData) {
                setQuizState(JSON.parse(updatedQuizData));
            }
        }, 2500);
        return () => clearInterval(interval);
    }, [quiz.code]);

    const handleShareReport = () => {
        const updatedQuiz = { ...quizState, reportShared: true };
        localStorage.setItem(`group-quiz-${quiz.code}`, JSON.stringify(updatedQuiz));
        setQuizState(updatedQuiz);
    };

    const handleDownloadReport = async () => {
        if (!reportRef.current) return;
        try {
            const html2canvas = await waitForHtml2Canvas();
            const canvas = await html2canvas(reportRef.current, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
            const imgData = canvas.toDataURL('image/jpeg', 0.95);
            
            const link = document.createElement('a');
            link.href = imgData;
            link.download = `Group-Report-${quiz.config.title}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

        } catch (error) {
            console.error("Failed to download report as Image:", error);
            alert("Sorry, we couldn't generate the image. Please check your internet connection, disable any ad-blockers, and try again.");
        }
    };

    const sortedParticipants = [...quizState.participants].sort((a, b) => b.score - a.score);
    const myResult = sortedParticipants.find(p => p.id === participantId);
    
    // For a non-organizer, myResult could be undefined if they are not in the participants list
    if (!isOrganizer && !myResult) return <p>Could not find your results.</p>;


    if (view === 'certificate' && myResult) {
        return <GroupCertificateView quiz={quizState} participant={myResult} onReset={onReset} />;
    }

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-2xl text-center">
            <h2 className="text-3xl font-bold text-indigo-700">Group Quiz Results</h2>
            <p className="text-lg mt-2 text-gray-600">{quizState.config.title}</p>
            
            <div ref={reportRef} className="p-4 bg-white">
                {isOrganizer && (
                    <div className="my-6 p-6 bg-gray-50 rounded-lg text-left border border-gray-200">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Organizer's Report</h3>
                        {loadingReport ? <LoadingSpinner /> : report ? (
                            <div className="space-y-6">
                                <div><h4 className="font-bold text-lg text-indigo-800">Group Summary</h4><p className="text-gray-700 mt-1">{report.groupSummary}</p></div>
                                <div><h4 className="font-bold text-lg text-indigo-800">Common Improvement Areas</h4><ul className="list-disc list-inside mt-1 text-gray-700">{report.improvementAreas.map((area, i) => <li key={i}>{area}</li>)}</ul></div>
                            </div>
                        ) : <p className="text-center text-gray-500">Could not generate a report.</p>}
                    </div>
                )}
                
                <div className="mt-6">
                    <h3 className="text-xl font-semibold text-gray-800">Leaderboard &amp; Feedback</h3>
                    {(!isOrganizer && !quizState.reportShared) ? (
                        <div className="mt-4 p-6 bg-indigo-50 rounded-lg">
                            <p className="text-xl font-bold">Your Score: {myResult?.score}</p>
                            <div className="my-4"><LoadingSpinner /></div>
                            <p className="text-gray-600">Waiting for the organizer to share the final results...</p>
                        </div>
                    ) : (
                        <ul className="mt-4 space-y-2 text-left max-h-96 overflow-y-auto p-4 bg-gray-50 rounded-lg">
                            {sortedParticipants.map((p, index) => {
                                const feedback = report?.individualFeedback.find(f => f.participantName === p.name);
                                return (
                                    <li key={p.id} className={`p-3 rounded shadow-sm ${p.id === participantId ? 'bg-indigo-200 ring-2 ring-indigo-500' : 'bg-white'}`}>
                                        <div className="flex justify-between items-center"><span className="font-bold">{index + 1}. {p.name}</span><span className="text-lg font-semibold">{p.score}</span></div>
                                        {(quizState.reportShared && feedback) && <div className="mt-2 pt-2 border-t"><p className="text-sm text-gray-600 italic">"{feedback.feedback}"</p></div>}
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            </div>
            
            <div className="mt-8 flex justify-center flex-wrap gap-4">
                {isOrganizer ? (
                   <>
                        {quizState.reportShared ? (
                            <button disabled className="px-8 py-3 bg-gray-400 text-white rounded-lg">Results Shared</button>
                        ) : (
                            <button onClick={handleShareReport} className="px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600">Share Results</button>
                        )}
                        <button onClick={handleDownloadReport} className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Download Report (Image)</button>
                   </>
                ) : (
                    <button onClick={() => setView('certificate')} className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">View My Certificate/Report</button>
                )}
                <button onClick={onReset} className="px-8 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700">Back to Home</button>
            </div>
        </div>
    );
};


interface GroupQuizFlowProps {
    initialView: View;
    groupQuiz: GroupQuiz;
    participantId: string;
    isOrganizer: boolean;
    onQuizStart: (quiz: GroupQuiz) => void;
    onQuizComplete: (quiz: GroupQuiz) => void;
    onReset: () => void;
    onGoBack?: () => void;
}

const GroupQuizFlow: React.FC<GroupQuizFlowProps> = ({ initialView, groupQuiz, participantId, isOrganizer, onQuizStart, onQuizComplete, onReset, onGoBack }) => {
    switch (initialView) {
        case 'group_quiz_lobby':
            return <QuizLobby quiz={groupQuiz} isOrganizer={isOrganizer} onQuizStart={onQuizStart} onGoBack={onGoBack} />;
        case 'group_quiz':
            if (isOrganizer) {
                return <OrganizerQuizInProgressView quiz={groupQuiz} onQuizComplete={onQuizComplete} />;
            }
            return <GroupQuizView quiz={groupQuiz} participantId={participantId} onQuizComplete={onQuizComplete} />;
        case 'group_quiz_results':
            return <GroupResultsView quiz={groupQuiz} participantId={participantId} isOrganizer={isOrganizer} onReset={onReset} />;
        default:
            return null;
    }
}

export default GroupQuizFlow;