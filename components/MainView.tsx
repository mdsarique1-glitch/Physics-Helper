

import React, { useState, useEffect } from 'react';
import { PHYSICS_CATEGORIES, PHYSICS_HELPER_MESSAGES } from '../constants';
import type { SoloQuizConfig } from '../types';
import CertificateShowcase from './CertificateShowcase';
import QuickRevisionView from './QuickRevisionView';

const decodeChallengeCode = (code: string): SoloQuizConfig => {
    if (!code || code.length < 6 || code.length > 8) { // Basic validation
        throw new Error("Invalid challenge code format. Please check the code and try again.");
    }
    
    const combined = parseInt(code, 36);
    if (isNaN(combined)) {
        throw new Error("Invalid challenge code: The code is corrupted.");
    }
    
    const seed = combined >> 12;
    const packed = combined & 0xFFF; // 12-bit mask (4095)

    const syllabusLevel = (packed & 1) === 1 ? 'extended' : 'core';
    const timeValue = (packed >> 1) & 3;
    const groupTimeOptions = [0, 5, 10, 15];
    const timeLimit = groupTimeOptions[timeValue] || 0;
    const timerEnabled = timeLimit > 0;
    const questionValue = (packed >> 3) & 7;
    const questionOptions = [5, 10, 15, 20, 25];
    const questionCount = questionOptions[questionValue] || 10;
    const categoryBitmask = (packed >> 6) & 63; // 6 bits for categories
    const categoryIndices: number[] = [];
    for (let i = 0; i < PHYSICS_CATEGORIES.length; i++) {
        if ((categoryBitmask >> i) & 1) {
            categoryIndices.push(i);
        }
    }
    const categories = categoryIndices.map(i => PHYSICS_CATEGORIES[i]?.name).filter((name): name is string => !!name);

    if (categories.length === 0) {
        throw new Error("No categories found in challenge code.");
    }

    return {
        categories,
        questionCount,
        timeLimit,
        timerEnabled,
        syllabusLevel,
        seed
    };
};

const AssistantMessage: React.FC<{ message: string }> = ({ message }) => (
    <div className="p-6 bg-indigo-50 border border-indigo-200 rounded-2xl shadow-sm">
        <div className="flex items-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-bold text-indigo-900">Message from Physics Helper</h3>
        </div>
        <p className="text-indigo-800 text-base italic pl-9">"{message}"</p>
    </div>
);


const MainView: React.FC<{ 
    onStartQuiz: (name: string, config: SoloQuizConfig) => void;
}> = ({ onStartQuiz }) => {
    const [quizMode, setQuizMode] = useState<'solo' | 'group' | 'revision'>('solo');
    
    // Solo & Group state
    const [studentName, setStudentName] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [syllabusLevel, setSyllabusLevel] = useState<'core' | 'extended'>('extended');

    // Solo Config
    const [soloQuizConfig, setSoloQuizConfig] = useState<Omit<SoloQuizConfig, 'categories' | 'seed' | 'syllabusLevel'>>({ questionCount: 15, timerEnabled: false, timeLimit: 15 });
    
    // Group Challenge State
    const [organizerName, setOrganizerName] = useState('');
    const [joinCode, setJoinCode] = useState('');
    const [generatedChallengeCode, setGeneratedChallengeCode] = useState('');
    const [groupQuizConfig, setGroupQuizConfig] = useState<Omit<SoloQuizConfig, 'categories' | 'seed' | 'syllabusLevel'>>({ questionCount: 10, timerEnabled: false, timeLimit: 10 });
    const [challengeTitle, setChallengeTitle] = useState('');

    // Common state
    const [helperMessage, setHelperMessage] = useState('');

    useEffect(() => {
        setHelperMessage(PHYSICS_HELPER_MESSAGES[Math.floor(Math.random() * PHYSICS_HELPER_MESSAGES.length)]);
    }, []);

    const handleStartSoloQuizClick = () => {
        if (studentName && selectedCategories.length > 0) {
            const config: SoloQuizConfig = { ...soloQuizConfig, categories: selectedCategories, syllabusLevel };
            onStartQuiz(studentName, config);
        } else {
            alert("Please enter your name and select at least one category.");
        }
    };
    
    const handleCreateChallenge = () => {
        if (!organizerName.trim() || !challengeTitle.trim() || selectedCategories.length === 0) {
            alert("Please provide your name, a challenge title, and select at least one category.");
            return;
        }
    
        const seed = Math.floor(100000 + Math.random() * 900000); // 6-digit seed
        const categoryIndices = selectedCategories.map(name =>
            PHYSICS_CATEGORIES.findIndex(cat => cat.name === name)
        ).filter(index => index !== -1);
    
        let packed = 0;
        const syllabusValue = syllabusLevel === 'extended' ? 1 : 0;
        packed |= syllabusValue;
        const groupTimeOptions = [0, 5, 10, 15];
        const timeIndex = groupTimeOptions.indexOf(groupQuizConfig.timerEnabled ? groupQuizConfig.timeLimit : 0);
        packed |= ((timeIndex > -1 ? timeIndex : 0) << 1);
        const questionOptions = [5, 10, 15, 20, 25];
        const questionIndex = questionOptions.indexOf(groupQuizConfig.questionCount);
        packed |= ((questionIndex > -1 ? questionIndex : 0) << 3);
        const categoryBitmask = categoryIndices.reduce((acc, index) => acc | (1 << index), 0);
        packed |= (categoryBitmask << 6);
    
        // Combine seed and packed config into a single number
        const combined = (seed << 12) | packed;
        
        // Convert to a shorter, base-36 string
        const code = combined.toString(36).toUpperCase();
        setGeneratedChallengeCode(code);
    };

    const handleJoinChallenge = () => {
        if (!studentName.trim() || !joinCode.trim()) {
            alert("Please enter your name and a challenge code.");
            return;
        }
        try {
            const config = decodeChallengeCode(joinCode.trim().toUpperCase());
            onStartQuiz(studentName, config);
        } catch (error) {
            const message = error instanceof Error ? error.message : "An unknown error occurred.";
            alert(message);
        }
    };
    
    const startChallengeForOrganizer = () => {
        try {
            const config = decodeChallengeCode(generatedChallengeCode);
            onStartQuiz(organizerName, config);
        } catch (error) {
            const message = error instanceof Error ? error.message : "Could not start the challenge due to an error.";
            alert(message);
        }
    }

    const renderContent = () => {
        switch(quizMode) {
            case 'revision':
                return <QuickRevisionView />;
            case 'solo':
                return (
                    <div className="space-y-6">
                         <h2 className="text-3xl font-bold text-gray-800 text-center">Solo Quiz Challenge</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                           <div className="md:col-span-2 space-y-6">
                               <div className="space-y-6">
                                    <div>
                                        <label htmlFor="studentName" className="block text-lg font-medium text-gray-700 mb-2">Enter your name:</label>
                                        <input id="studentName" type="text" value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder="e.g., Albert Einstein" className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                    </div>
                                    
                                    <div>
                                        <p className="text-lg font-medium text-gray-700 mb-2">Select quiz categories:</p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {PHYSICS_CATEGORIES.map(category => (
                                                <div key={category.name} className="flex items-center">
                                                    <input type="checkbox" id={`category-${category.name}`} checked={selectedCategories.includes(category.name)} onChange={() => setSelectedCategories(prev => prev.includes(category.name) ? prev.filter(c => c !== category.name) : [...prev, category.name])} className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                    <label htmlFor={`category-${category.name}`} className="ml-3 text-gray-700">{category.name}</label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border rounded-lg">
                                        <div>
                                            <label htmlFor="questionCount" className="block text-lg font-medium text-gray-700 mb-2">Number of Questions:</label>
                                            <select id="questionCount" value={soloQuizConfig.questionCount} onChange={e => setSoloQuizConfig(c => ({...c, questionCount: Number(e.target.value)}))} className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                                {Array.from({length: 16}, (_, i) => i + 15).map(n => <option key={n} value={n}>{n} Questions</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="timerEnabled" className="block text-lg font-medium text-gray-700 mb-2">Timer:</label>
                                            <div className="flex items-center space-x-4">
                                                <label className="flex items-center cursor-pointer">
                                                    <input type="checkbox" checked={soloQuizConfig.timerEnabled} onChange={e => setSoloQuizConfig(c => ({...c, timerEnabled: e.target.checked}))} className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                    <span className="ml-2 text-gray-700">Enable Timer</span>
                                                </label>
                                                {soloQuizConfig.timerEnabled && (
                                                    <select value={soloQuizConfig.timeLimit} onChange={e => setSoloQuizConfig(c => ({...c, timeLimit: Number(e.target.value)}))} className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                                        <option value={5}>5 mins</option>
                                                        <option value={10}>10 mins</option>
                                                        <option value={15}>15 mins</option>
                                                    </select>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="p-4 border rounded-lg">
                                        <label className="block text-lg font-medium text-gray-700 mb-2">Syllabus Level:</label>
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0">
                                            <label className="flex items-center cursor-pointer">
                                                <input type="radio" name="syllabusLevelSolo" value="extended" checked={syllabusLevel === 'extended'} onChange={() => setSyllabusLevel('extended')} className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300" />
                                                <span className="ml-2 text-gray-700">Extended (Core + Supplement)</span>
                                            </label>
                                            <label className="flex items-center cursor-pointer">
                                                <input type="radio" name="syllabusLevelSolo" value="core" checked={syllabusLevel === 'core'} onChange={() => setSyllabusLevel('core')} className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300" />
                                                <span className="ml-2 text-gray-700">Core Only</span>
                                            </label>
                                        </div>
                                    </div>


                                    <button onClick={handleStartSoloQuizClick} disabled={!studentName || selectedCategories.length === 0} className="w-full px-8 py-4 bg-indigo-600 text-white font-bold text-lg rounded-lg shadow-md hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-transform transform hover:scale-105">
                                        Start Quiz!
                                    </button>
                                </div>
                            </div>
                            <div className="md:col-span-1 space-y-6">
                                <CertificateShowcase />
                                <AssistantMessage message={helperMessage} />
                            </div>
                        </div>
                    </div>
                );
            case 'group':
                 if (generatedChallengeCode) {
                    return (
                        <div className="p-8 bg-white rounded-xl shadow-lg border border-gray-200 text-center space-y-4">
                            <h2 className="text-2xl font-bold text-green-700">Challenge Created!</h2>
                            <p className="text-gray-600">Share this code with your friends to start the challenge.</p>
                            <div className="p-4 bg-gray-100 rounded-lg">
                                <p className="font-mono text-xl md:text-2xl font-bold text-indigo-600 break-words">{generatedChallengeCode}</p>
                            </div>
                            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                                <button onClick={startChallengeForOrganizer} className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700">
                                    Start My Quiz
                                </button>
                                <button onClick={() => { setGeneratedChallengeCode(''); setSelectedCategories([]); }} className="px-6 py-3 bg-gray-200 text-gray-800 font-bold rounded-lg hover:bg-gray-300">
                                    Create New Challenge
                                </button>
                            </div>
                        </div>
                    );
                }
                 const groupTimeOptions = [5, 10, 15];
                 return (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Create Group Challenge Card */}
                        <div className="p-8 bg-white rounded-xl shadow-lg border border-gray-200 space-y-4">
                            <h2 className="text-2xl font-bold text-gray-800">Create a Group Challenge</h2>
                             <div className="p-3 bg-blue-50 border-l-4 border-blue-400 text-blue-800 text-sm rounded-r-lg">
                                <p><span className="font-semibold">How it works:</span> Set up the quiz options and generate a unique code. Share it with your friends to ensure everyone gets the same questions. Good luck!</p>
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700">Your Name (Organizer):</label>
                                <input type="text" value={organizerName} onChange={e => setOrganizerName(e.target.value)} placeholder="Enter your name" className="w-full mt-1 p-2 bg-white border border-gray-300 rounded" />
                            </div>
                             <div>
                                <label className="block font-medium text-gray-700">Challenge Title:</label>
                                <input type="text" value={challengeTitle} onChange={e => setChallengeTitle(e.target.value)} placeholder="e.g., Term 1 Revision" className="w-full mt-1 p-2 bg-white border border-gray-300 rounded" />
                            </div>
                             <div>
                                <label className="block font-medium text-gray-700">Number of Questions:</label>
                                <select value={groupQuizConfig.questionCount} onChange={e => setGroupQuizConfig(c => ({...c, questionCount: Number(e.target.value)}))} className="w-full mt-1 p-2 bg-white border border-gray-300 rounded">
                                    {[5, 10, 15, 20, 25].map(n => <option key={n} value={n}>{n}</option>)}
                                </select>
                            </div>
                             <div>
                                <label className="block font-medium text-gray-700">Timer:</label>
                                <div className="flex items-center space-x-4 mt-1">
                                    <label className="flex items-center cursor-pointer">
                                        <input 
                                            type="checkbox" 
                                            checked={groupQuizConfig.timerEnabled} 
                                            onChange={e => setGroupQuizConfig(c => ({...c, timerEnabled: e.target.checked}))} 
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600" 
                                        />
                                        <span className="ml-2 text-sm text-gray-700">Enable</span>
                                    </label>
                                    {groupQuizConfig.timerEnabled && (
                                        <select 
                                            value={groupQuizConfig.timeLimit} 
                                            onChange={e => setGroupQuizConfig(c => ({...c, timeLimit: Number(e.target.value)}))} 
                                            className="flex-grow p-2 bg-white border border-gray-300 rounded text-sm"
                                        >
                                            {groupTimeOptions.map(time => (
                                                <option key={time} value={time}>{time} mins</option>
                                            ))}
                                        </select>
                                    )}
                                </div>
                            </div>
                             <div className="mt-2">
                                <label className="block font-medium text-gray-700 mb-1">Syllabus Level:</label>
                                <div className="flex items-center space-x-4">
                                    <label className="flex items-center">
                                        <input type="radio" name="syllabusLevelGroup" value="extended" checked={syllabusLevel === 'extended'} onChange={() => setSyllabusLevel('extended')} className="h-4 w-4 text-indigo-600"/>
                                        <span className="ml-2 text-sm text-gray-700">Extended</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input type="radio" name="syllabusLevelGroup" value="core" checked={syllabusLevel === 'core'} onChange={() => setSyllabusLevel('core')} className="h-4 w-4 text-indigo-600"/>
                                        <span className="ml-2 text-sm text-gray-700">Core</span>
                                    </label>
                                </div>
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700 mb-2">Categories:</label>
                                <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto p-2 border rounded-md">
                                    {PHYSICS_CATEGORIES.map(category => (
                                        <label key={category.name} className="flex items-center text-sm">
                                            <input type="checkbox" checked={selectedCategories.includes(category.name)} onChange={() => setSelectedCategories(c => c.includes(category.name) ? c.filter(cat => cat !== category.name) : [...c, category.name])} className="h-4 w-4 rounded border-gray-300 text-indigo-600" />
                                            <span className="ml-2 text-gray-700">{category.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <button onClick={handleCreateChallenge} className="w-full py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600">
                                Create Challenge Code
                            </button>
                        </div>
                        {/* Join Group Challenge Card */}
                        <div className="p-8 bg-white rounded-xl shadow-lg border border-gray-200 space-y-4">
                            <h2 className="text-2xl font-bold text-gray-800">Join a Group Challenge</h2>
                            <div className="p-3 bg-indigo-50 border-l-4 border-indigo-400 text-indigo-800 text-sm rounded-r-lg">
                                <p><span className="font-semibold">Ready to play?</span> Get the code from the challenge organizer. Enter it below along with your name.</p>
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700">Your Name:</label>
                                <input type="text" value={studentName} onChange={e => setStudentName(e.target.value)} placeholder="Enter your name" className="w-full mt-1 p-2 bg-white border border-gray-300 rounded" />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700">Challenge Code:</label>
                                <input type="text" value={joinCode} onChange={e => setJoinCode(e.target.value)} placeholder="Enter code" className="w-full mt-1 p-2 bg-white border border-gray-300 rounded" />
                            </div>
                             <button onClick={handleJoinChallenge} className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700">
                                Join Challenge
                            </button>
                        </div>
                    </div>
                );
        }
    }

    const navButtonClass = (buttonMode: typeof quizMode) => 
        `px-6 py-3 text-lg font-semibold rounded-lg transition-colors duration-300 ${quizMode === buttonMode ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-100'}`;

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <section className="bg-white rounded-xl shadow-lg border border-gray-200">
                <div className="p-6 border-b">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800">
                        IGCSE Physics Assessment Hub
                    </h2>
                    <p className="mt-2 text-gray-600">
                        Test your knowledge, challenge friends, or revise key topics from the 2026-2028 syllabus.
                    </p>
                </div>
                <div className="flex justify-center gap-2 border-b bg-gray-50 p-2 rounded-b-xl">
                    <button onClick={() => setQuizMode('solo')} className={navButtonClass('solo')}>Solo Quiz</button>
                    <button onClick={() => setQuizMode('group')} className={navButtonClass('group')}>Group Challenge</button>
                    <button onClick={() => setQuizMode('revision')} className={navButtonClass('revision')}>Quick Revision</button>
                </div>
                <div className="p-4 md:p-6">
                    {renderContent()}
                </div>
            </section>
        </div>
    );
};

export default MainView;