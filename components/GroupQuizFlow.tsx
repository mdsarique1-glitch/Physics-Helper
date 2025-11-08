import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { QuizQuestion, QuizResult, CertificateData, View, GroupQuiz, Participant, GroupQuizReport, SoloImprovementReport } from '../types';
import { generateGroupQuizReport, getCertificateData, getSoloImprovementReport } from '../services/geminiService';
import { PHYSICS_CATEGORIES } from '../constants';
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

const QuizLobby: React.FC<{
    quiz: GroupQuiz;
    isOrganizer: boolean;
    onQuizStart: (quiz: GroupQuiz) => void;
}> = ({ quiz, isOrganizer, onQuizStart }) => {
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
        const updatedQuiz = { ...quiz, status: 'inprogress' as 'inprogress', startTime: Date.now() };
        localStorage.setItem(`group-quiz-${quiz.code}`, JSON.stringify(updatedQuiz));
        onQuizStart(updatedQuiz);
    };

    return (
        <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-2xl text-center">
            <h2 className="text-3xl font-bold text-indigo-700">Group Quiz Lobby</h2>
            <p className="text-lg mt-2 text-gray-600">{quiz.config.title}</p>
            <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
                <p className="text-gray-800">Share this code with participants:</p>
                <p className="text-4xl font-mono font-bold text-indigo-600 tracking-widest my-2 bg-white py-2 rounded">{quiz.code}</p>
            </div>
            <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-800">Participants ({participants.length}/15)</h3>
                <ul className="mt-4 space-y-2 text-left max-h-60 overflow-y-auto p-4 bg-gray-50 rounded-lg">
                    {participants.map(p => (
                        <li key={p.id} className="p-2 bg-white rounded shadow-sm">{p.name} {p.id === 'organizer' && '(Organizer)'}</li>
                    ))}
                </ul>
            </div>
            <div className="mt-8">
                {isOrganizer ? (
                    <button onClick={handleStartQuiz} className="w-full py-4 bg-green-500 text-white font-bold text-lg rounded-lg shadow-md hover:bg-green-600">
                        Start Quiz for Everyone
                    </button>
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
            }
             onQuizComplete(finalQuiz);
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

    // Re-implementing Certificate and related components locally for simplicity
    const Badge: React.FC<{ type: 'Gold' | 'Silver' | 'Bronze' }> = ({ type }) => {
        const config = { Gold: { mc: "gold", rc: "#ffbf00", tc: "text-amber-600" }, Silver: { mc: "#c0c0c0", rc: "#a9a9a9", tc: "text-slate-600" }, Bronze: { mc: "#cd7f32", rc: "#a0522d", tc: "text-orange-800" } };
        const { mc, rc, tc } = config[type];
        return (<div className="flex flex-col items-center mb-4"><svg width="100" height="100" viewBox="0 0 100 100"><path d="M 20 0 L 80 0 L 70 25 L 30 25 Z" fill={rc} /><circle cx="50" cy="62" r="35" fill={mc} /><polygon points="50,47 58,62 75,62 62,72 67,87 50,77 33,87 38,72 25,62 42,62" fill="white" /></svg><p className={`text-2xl font-bold mt-2 ${tc}`}>{type} Achievement</p></div>);
    };

    const ImprovementReport: React.FC = () => {
        const [report, setReport] = useState<SoloImprovementReport | null>(null);
        const [loading, setLoading] = useState(true);
        const accuracy = ((result.correctAnswers / result.totalQuestions) * 100).toFixed(0);
        useEffect(() => { getSoloImprovementReport(participant.name, result.correctAnswers, result.totalQuestions, topics).then(setReport).catch(console.error).finally(() => setLoading(false)); }, []);
        return (<div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-xl text-center"><h2 className="text-3xl font-bold text-gray-800">Quiz Report for {participant.name}</h2><div className="my-8"><p className="text-5xl font-bold text-amber-600">{accuracy}%</p><p className="text-gray-600">Your Score</p></div>{loading ? <LoadingSpinner /> : (<div className="text-left my-6 bg-amber-50 p-6 rounded-lg"><h4>Areas for Improvement:</h4><ul className="list-disc list-inside">{report?.improvementAreas.map((area, i) => <li key={i}>{area}</li>)}</ul><h4 className="mt-4">A Quick Note:</h4><p className="italic">"{report?.motivationalMessage}"</p></div>)}<button onClick={onReset} className="mt-8 px-8 py-3 bg-indigo-600 text-white rounded-lg">Back to Home</button></div>);
    };

    const Certificate: React.FC = () => {
        const certRef = useRef<HTMLDivElement>(null);
        const [certData, setCertData] = useState<CertificateData | null>(null);
        const [loading, setLoading] = useState(true);
        useEffect(() => { getCertificateData(participant.name, result.correctAnswers, result.totalQuestions, topics).then(setCertData).catch(console.error).finally(() => setLoading(false)); }, []);
        const handleDownload = async () => { if (!certRef.current) return; const canvas = await html2canvas(certRef.current, { scale: 2 }); const imgData = canvas.toDataURL('image/png'); const { jsPDF } = jspdf; const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [canvas.width, canvas.height] }); pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height); pdf.save(`Certificate-${participant.name}.pdf`); };
        const getBadge = () => { const acc = (result.correctAnswers / result.totalQuestions) * 100; if (acc === 100) return <Badge type="Gold" />; if (acc >= 90) return <Badge type="Silver" />; if (acc >= 70) return <Badge type="Bronze" />; return null; };
        const accStr = ((result.correctAnswers / result.totalQuestions) * 100).toFixed(0);
        return (<div className="max-w-4xl mx-auto text-center"><div ref={certRef} className="bg-white p-8 md:p-12 rounded-xl shadow-2xl border-4 border-blue-200">{getBadge()}<h1 className="text-3xl md:text-4xl font-bold text-indigo-700">Certificate of Achievement</h1><p className="text-xl my-4">This certificate is proudly presented to</p><p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 my-4">{participant.name}</p><p className="text-lg my-4">for successfully completing the group quiz on {new Date().toLocaleDateString()}</p><div className="grid grid-cols-3 gap-4 my-8 text-center"><div><p className="text-3xl font-bold text-green-600">{result.correctAnswers}/{result.totalQuestions}</p><p>Correct</p></div><div><p className="text-3xl font-bold text-purple-600">#{result.rank}</p><p>Group Rank</p></div><div><p className="text-3xl font-bold text-blue-600">{accStr}%</p><p>Accuracy</p></div></div>{loading ? <LoadingSpinner/> : (<div className="text-left space-y-4 my-6"><h4>Performance Summary:</h4><p>{certData?.summary}</p><h4>Areas for Improvement:</h4><p>{certData?.improvementAreas}</p></div>)}</div><div className="mt-8 flex justify-center gap-4"><button onClick={handleDownload} className="px-6 py-3 bg-blue-600 text-white rounded-lg">Download</button><button onClick={onReset} className="px-6 py-3 bg-gray-600 text-white rounded-lg">Back to Home</button></div></div>);
    };

    const accuracy = (result.correctAnswers / result.totalQuestions) * 100;
    return accuracy >= 70 ? <Certificate /> : <ImprovementReport />;
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

    const sortedParticipants = [...quizState.participants].sort((a, b) => b.score - a.score);
    const myResult = sortedParticipants.find(p => p.id === participantId);
    if (!myResult) return <p>Could not find your results.</p>;

    if (view === 'certificate') {
        return <GroupCertificateView quiz={quizState} participant={myResult} onReset={onReset} />;
    }

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-2xl text-center">
            <h2 className="text-3xl font-bold text-indigo-700">Group Quiz Results</h2>
            <p className="text-lg mt-2 text-gray-600">{quizState.config.title}</p>
            
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
                        <p className="text-xl font-bold">Your Score: {myResult.score}</p>
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
                                    {(isOrganizer && feedback) && <div className="mt-2 pt-2 border-t"><p className="text-sm text-gray-600 italic">"{feedback.feedback}"</p></div>}
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
            
            <div className="mt-8 flex justify-center gap-4">
                {isOrganizer ? (
                    quizState.reportShared ? (
                        <button disabled className="px-8 py-3 bg-gray-400 text-white rounded-lg">Results Shared</button>
                    ) : (
                        <button onClick={handleShareReport} className="px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600">Share Results with Participants</button>
                    )
                ) : (
                    <button onClick={() => setView('certificate')} className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">View My Certificate</button>
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
}

const GroupQuizFlow: React.FC<GroupQuizFlowProps> = ({ initialView, groupQuiz, participantId, isOrganizer, onQuizStart, onQuizComplete, onReset }) => {
    switch (initialView) {
        case 'group_quiz_lobby':
            return <QuizLobby quiz={groupQuiz} isOrganizer={isOrganizer} onQuizStart={onQuizStart} />;
        case 'group_quiz':
            return <GroupQuizView quiz={groupQuiz} participantId={participantId} onQuizComplete={onQuizComplete} />;
        case 'group_quiz_results':
            return <GroupResultsView quiz={groupQuiz} participantId={participantId} isOrganizer={isOrganizer} onReset={onReset} />;
        default:
            return null;
    }
}

export default GroupQuizFlow;