import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { QuizQuestion, QuizResult, CertificateData, View, GroupQuiz, Participant, GroupQuizReport } from '../types';
import { generateGroupQuizReport } from '../services/geminiService';
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
            const finalQuiz: GroupQuiz = JSON.parse(finalQuizData);
            const me = finalQuiz.participants.find(p => p.id === participantId);
            if (me && !me.isFinished) {
                me.score = score;
                me.isFinished = true;
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

const GroupResultsView: React.FC<{
    quiz: GroupQuiz;
    participantId: string;
    isOrganizer: boolean;
    onReset: () => void;
}> = ({ quiz, participantId, isOrganizer, onReset }) => {
    const [report, setReport] = useState<GroupQuizReport | null>(null);
    const [loadingReport, setLoadingReport] = useState(true);

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const data = await generateGroupQuizReport(quiz);
                setReport(data);
            } catch (error) {
                console.error("Failed to generate group report:", error);
            } finally {
                setLoadingReport(false);
            }
        };
        fetchReport();
    }, [quiz]);

    const sortedParticipants = [...quiz.participants].sort((a, b) => b.score - a.score);
    const myResult = sortedParticipants.find(p => p.id === participantId);

    const averageScore = sortedParticipants.reduce((acc, p) => acc + p.score, 0) / sortedParticipants.length;
    const highestScore = sortedParticipants[0]?.score ?? 0;
    const lowestScore = sortedParticipants[sortedParticipants.length - 1]?.score ?? 0;

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-2xl text-center">
            <h2 className="text-3xl font-bold text-indigo-700">Group Quiz Results</h2>
            <p className="text-lg mt-2 text-gray-600">{quiz.config.title}</p>

            {isOrganizer && (
                <div className="my-6 p-4 bg-indigo-50 rounded-lg grid grid-cols-3 gap-4">
                    <div><p className="text-2xl font-bold text-gray-800">{averageScore.toFixed(1)}</p><p>Avg. Score</p></div>
                    <div><p className="text-2xl font-bold text-green-600">{highestScore}</p><p>Highest Score</p></div>
                    <div><p className="text-2xl font-bold text-red-500">{lowestScore}</p><p>Lowest Score</p></div>
                </div>
            )}

            <div className="my-8 p-6 bg-gray-50 rounded-lg text-left border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Comprehensive Report</h3>
                {loadingReport ? <LoadingSpinner /> : (
                    report ? (
                        <div className="space-y-6">
                            <div>
                                <h4 className="font-bold text-lg text-indigo-800">Group Summary</h4>
                                <p className="text-gray-700 mt-1">{report.groupSummary}</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-lg text-indigo-800">Common Improvement Areas</h4>
                                <ul className="list-disc list-inside mt-1 text-gray-700">
                                    {report.improvementAreas.map((area, i) => <li key={i}>{area}</li>)}
                                </ul>
                            </div>
                        </div>
                    ) : <p className="text-center text-gray-500">Could not generate a report at this time.</p>
                )}
            </div>
            
            <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-800">Leaderboard &amp; Feedback</h3>
                <ul className="mt-4 space-y-2 text-left max-h-96 overflow-y-auto p-4 bg-gray-50 rounded-lg">
                    {sortedParticipants.map((p, index) => {
                        const feedback = report?.individualFeedback.find(f => f.participantName === p.name);
                        const scorePercent = (p.score / (quiz.questions.length * 10)) * 100;
                        return (
                            <li key={p.id} className={`p-3 rounded shadow-sm transition-all ${p.id === participantId ? 'bg-indigo-200 ring-2 ring-indigo-500' : 'bg-white'}`}>
                                <div className="flex justify-between items-center">
                                    <span className="font-bold">{index + 1}. {p.name}</span>
                                    <span className="text-lg font-semibold">{p.score} ({scorePercent.toFixed(0)}%)</span>
                                </div>
                                {feedback && (
                                    <div className="mt-2 pt-2 border-t border-gray-200">
                                        <p className="text-sm text-gray-600 italic">"{feedback.feedback}"</p>
                                    </div>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
            
            <button onClick={onReset} className="mt-8 px-8 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700">
                Back to Home
            </button>
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