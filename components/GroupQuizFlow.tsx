import React, { useState, useEffect, useCallback } from 'react';
import type { GroupChallenge, Participant, QuizResult } from '../types';
import { View } from '../types';
import QuizFlow from './QuizFlow';
import LoadingSpinner from './LoadingSpinner';

const STORAGE_KEY_PREFIX = 'group-challenge-';

const GroupQuizFlow: React.FC<{
    challenge: GroupChallenge;
    currentUser: { name: string; role: 'ORGANIZER' | 'PARTICIPANT' };
    onReset: () => void;
}> = ({ challenge: initialChallenge, currentUser, onReset }) => {
    const [challenge, setChallenge] = useState<GroupChallenge>(initialChallenge);
    const [participantQuizResult, setParticipantQuizResult] = useState<QuizResult | null>(null);

    const storageKey = `${STORAGE_KEY_PREFIX}${challenge.id}`;

    const updateChallenge = useCallback((updatedChallenge: GroupChallenge) => {
        setChallenge(updatedChallenge);
        localStorage.setItem(storageKey, JSON.stringify(updatedChallenge));
    }, [storageKey]);

    useEffect(() => {
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === storageKey && event.newValue) {
                setChallenge(JSON.parse(event.newValue));
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [storageKey]);
    
    const handleStartChallenge = () => {
        const updatedChallenge: GroupChallenge = { ...challenge, status: 'IN_PROGRESS' };
        updateChallenge(updatedChallenge);
    };

    const handleParticipantQuizComplete = (result: QuizResult) => {
        const updatedParticipants = challenge.participants.map(p =>
            p.name === currentUser.name ? { ...p, status: 'COMPLETED' as const, score: result.correctAnswers } : p
        );
        const allCompleted = updatedParticipants.every(p => p.status === 'COMPLETED');
        const updatedChallenge: GroupChallenge = {
            ...challenge,
            participants: updatedParticipants,
            status: allCompleted ? 'COMPLETED' : 'IN_PROGRESS',
        };
        updateChallenge(updatedChallenge);
        setParticipantQuizResult(result);
    };

    const isParticipantCompleted = challenge.participants.find(p => p.name === currentUser.name)?.status === 'COMPLETED';
    
    const renderOrganizerView = () => {
        const completedCount = challenge.participants.filter(p => p.status === 'COMPLETED').length;
        const sortedParticipants = [...challenge.participants].sort((a, b) => (b.score ?? -1) - (a.score ?? -1));

        return (
            <div className="p-8 bg-white rounded-xl shadow-lg border border-gray-200">
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">{challenge.title}</h2>
                    <p className="text-gray-500">Organized by {challenge.organizerName}</p>
                </div>

                {challenge.status === 'LOBBY' && (
                    <div className="text-center space-y-4 mb-6">
                        <p className="text-gray-600">Share this code with participants:</p>
                        <div className="p-4 bg-gray-100 rounded-lg">
                            <p className="font-mono text-xl md:text-2xl font-bold text-indigo-600 break-words">{challenge.id}</p>
                        </div>
                        <p className="text-sm text-gray-500">Code expires in 15 minutes. Max 15 participants.</p>
                    </div>
                )}
                
                <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2 text-gray-700 text-center">
                        Leaderboard ({completedCount}/{challenge.participants.length} Completed)
                    </h3>
                    <div className="space-y-2 max-h-60 overflow-y-auto p-2 border rounded-md">
                        {sortedParticipants.length > 0 ? sortedParticipants.map((p, i) => (
                            <div key={p.name} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <span className="font-semibold">{i + 1}. {p.name}</span>
                                {p.status === 'COMPLETED' ? (
                                    <span className="font-bold text-green-600">{p.score} / {challenge.config.questionCount}</span>
                                ) : (
                                    <span className="text-sm text-yellow-600 italic">In Progress...</span>
                                )}
                            </div>
                        )) : <p className="text-center text-gray-500 p-4">No participants have joined yet.</p>}
                    </div>
                </div>

                {challenge.status === 'LOBBY' && (
                    <button 
                        onClick={handleStartChallenge} 
                        disabled={challenge.participants.length === 0}
                        className="w-full py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        Start Challenge for Everyone
                    </button>
                )}
                
                {challenge.status === 'COMPLETED' && (
                    <p className="text-center font-bold text-green-700 bg-green-100 p-3 rounded-lg">
                        Challenge complete! All participants have finished.
                    </p>
                )}
                <button onClick={onReset} className="w-full mt-4 py-2 bg-gray-200 text-gray-800 font-bold rounded-lg hover:bg-gray-300">
                    Exit to Main Menu
                </button>
            </div>
        );
    };

    const renderParticipantView = () => {
        if (challenge.status === 'LOBBY') {
            return (
                <div className="p-8 bg-white rounded-xl shadow-lg border border-gray-200 text-center space-y-4">
                    <h2 className="text-2xl font-bold text-gray-800">Welcome, {currentUser.name}!</h2>
                    <p className="text-lg text-gray-600">You have joined "{challenge.title}".</p>
                    <LoadingSpinner />
                    <p className="text-indigo-600 font-semibold animate-pulse">Waiting for the organizer to start the quiz...</p>
                    <div className="pt-4">
                        <h3 className="text-md font-bold text-gray-700">Joined Participants ({challenge.participants.length}/15):</h3>
                        <div className="text-sm text-gray-500 mt-2 max-h-32 overflow-y-auto">
                            {challenge.participants.map(p => <p key={p.name}>{p.name}</p>)}
                        </div>
                    </div>
                </div>
            );
        }

        if (challenge.status === 'IN_PROGRESS' && !isParticipantCompleted) {
             return <QuizFlow
                initialView={View.QUIZ}
                studentName={currentUser.name}
                quizConfig={challenge.config}
                onQuizComplete={handleParticipantQuizComplete}
                quizResult={null}
                onReset={onReset}
              />
        }
        
        // Show leaderboard after completion
        const completedCount = challenge.participants.filter(p => p.status === 'COMPLETED').length;
        const sortedParticipants = [...challenge.participants].sort((a, b) => (b.score ?? -1) - (a.score ?? -1));

        return (
             <div className="p-8 bg-white rounded-xl shadow-lg border border-gray-200">
                 <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">Challenge Results</h2>
                    <p className="text-gray-500">{challenge.title}</p>
                </div>
                 <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2 text-gray-700 text-center">
                        Leaderboard ({completedCount}/{challenge.participants.length} Completed)
                    </h3>
                    <div className="space-y-2 max-h-60 overflow-y-auto p-2 border rounded-md">
                        {sortedParticipants.map((p, i) => (
                            <div key={p.name} className={`flex justify-between items-center p-3 rounded-lg ${p.name === currentUser.name ? 'bg-indigo-100 border-2 border-indigo-400' : 'bg-gray-50'}`}>
                                <span className="font-semibold">{i + 1}. {p.name}</span>
                                {p.status === 'COMPLETED' ? (
                                    <span className="font-bold text-green-600">{p.score} / {challenge.config.questionCount}</span>
                                ) : (
                                    <span className="text-sm text-yellow-600 italic">In Progress...</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                {challenge.status === 'COMPLETED' ? 
                     <p className="text-center font-bold text-green-700 bg-green-100 p-3 rounded-lg">Challenge complete!</p> :
                     <p className="text-center text-yellow-700 bg-yellow-100 p-3 rounded-lg">Waiting for other participants to finish...</p>
                }
                 <button onClick={onReset} className="w-full mt-4 py-2 bg-gray-200 text-gray-800 font-bold rounded-lg hover:bg-gray-300">
                    Back to Main Menu
                </button>
             </div>
        )
    };

    return currentUser.role === 'ORGANIZER' ? renderOrganizerView() : renderParticipantView();
};

export default GroupQuizFlow;
