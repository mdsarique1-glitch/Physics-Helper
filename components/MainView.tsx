
import React, { useState, useEffect } from 'react';
import { PHYSICS_CATEGORIES, PHYSICS_HELPER_MESSAGES } from '../constants';
import type { SoloQuizConfig } from '../types';
import LoadingSpinner from './LoadingSpinner';
import CertificateShowcase from './CertificateShowcase';
import QuickRevisionView from './QuickRevisionView';

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
    const [groupQuizConfig, setGroupQuizConfig] = useState<Omit<SoloQuizConfig, 'categories' | 'seed' | 'syllabusLevel'>>({ questionCount: 10, timerEnabled: true, timeLimit: 10 });
    const [challengeTitle, setChallengeTitle] = useState('');

    // Common state
    const [feedbackName, setFeedbackName] = useState('');
    const [feedbackText, setFeedbackText] = useState('');
    const [feedbackResponse, setFeedbackResponse] = useState('');
    const [feedbackError, setFeedbackError] = useState('');
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
        
        const seed = Math.floor(Math.random() * 1000000);
        const configToEncode = {
            c: selectedCategories,
            q: groupQuizConfig.questionCount,
            t: groupQuizConfig.timeLimit,
            i: groupQuizConfig.timerEnabled,
            l: challengeTitle,
            s: syllabusLevel,
        };

        try {
            const configString = JSON.stringify(configToEncode);
            const encodedConfig = btoa(configString);
            const code = `${seed}-${encodedConfig}`;
            setGeneratedChallengeCode(code);
        } catch (error) {
            console.error("Failed to create challenge code:", error);
            alert("Could not create challenge code.");
        }
    };

    const handleJoinChallenge = () => {
        if (!studentName.trim() || !joinCode.trim()) {
            alert("Please enter your name and a challenge code.");
            return;
        }

        try {
            const [seedStr, encodedConfig] = joinCode.split('-');
            if (!seedStr || !encodedConfig) throw new Error("Invalid code format.");

            const seed = parseInt(seedStr, 10);
            const configString = atob(encodedConfig);
            const decodedConfig = JSON.parse(configString);

            const config: SoloQuizConfig = {
                categories: decodedConfig.c,
                questionCount: decodedConfig.q,
                timeLimit: decodedConfig.t,
                timerEnabled: decodedConfig.i,
                syllabusLevel: decodedConfig.s || 'extended',
                seed: seed
            };
            onStartQuiz(studentName, config);

        } catch (error) {
            console.error("Failed to join challenge:", error);
            alert("Invalid or corrupted challenge code. Please check the code and try again.");
        }
    };
    
    const startChallengeForOrganizer = () => {
        try {
             const [seedStr, encodedConfig] = generatedChallengeCode.split('-');
             const seed = parseInt(seedStr, 10);
             const configString = atob(encodedConfig);
             const decodedConfig = JSON.parse(configString);
             const config: SoloQuizConfig = {
                categories: decodedConfig.c,
                questionCount: decodedConfig.q,
                timeLimit: decodedConfig.t,
                timerEnabled: decodedConfig.i,
                syllabusLevel: decodedConfig.s || 'extended',
                seed: seed
            };
            onStartQuiz(organizerName, config);
        } catch (e) {
            alert("Could not start the challenge due to an error.")
        }
    }


    const handleFeedbackSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!feedbackName.trim() || !feedbackText.trim()) {
            setFeedbackError("Please provide both your name and feedback.");
            setFeedbackResponse('');
            return;
        }
        
        // User's Google Form: https://forms.gle/xKgKkbSVfC2kLcJC8
        const formId = "1FAIpQLScXQ-e818r-n4g1FDKP-pY6j2i9jXn8v_wB_zG9hA-kG9sP9w";
        const nameEntryId = "entry.2005620554";
        const feedbackEntryId = "entry.1065046570";

        const encodedName = encodeURIComponent(feedbackName);
        const encodedFeedback = encodeURIComponent(feedbackText);
        
        const googleFormUrl = `https://docs.google.com/forms/d/e/${formId}/viewform?usp=pp_url&${nameEntryId}=${encodedName}&${feedbackEntryId}=${encodedFeedback}`;

        // Open the pre-filled form in a new tab
        window.open(googleFormUrl, '_blank', 'noopener,noreferrer');

        // Reset the form and show a confirmation message
        setFeedbackName('');
        setFeedbackText('');
        setFeedbackResponse("Your feedback form is ready in a new tab. Just hit 'Submit' there!");
        setFeedbackError('');
    };
    
    const renderContent = () => {
        switch(quizMode) {
            case 'revision':
                return <QuickRevisionView />;
            case 'solo':
                return (
                    <div className="p-8 bg-white rounded-xl shadow-lg border border-gray-200">
                         <h2 className="text-3xl font-bold text-gray-800 text-center">Solo Quiz Challenge</h2>
                         <div className="mt-6 max-w-2xl mx-auto text-left space-y-6">
                             <div className="mb-4">
                                <label htmlFor="studentName" className="block text-lg font-medium text-gray-700 mb-2">Enter your name:</label>
                                <input id="studentName" type="text" value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder="e.g., Albert Einstein" className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                            </div>

                            <CertificateShowcase />
                            
                            <div className="mb-4">
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
                 return (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Create Group Challenge Card */}
                        <div className="p-8 bg-white rounded-xl shadow-lg border border-gray-200 space-y-4">
                            <h2 className="text-2xl font-bold text-gray-800">Create a Group Challenge</h2>
                            <p className="text-gray-600">Set up a quiz and get a code to share with your friends.</p>
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
                             <p className="text-gray-600">Enter your name and the challenge code from your friend to start.</p>
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
        <div className="space-y-8">
            <section className="text-center p-8 bg-white rounded-xl shadow-lg border border-gray-200">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
                    IGCSE Physics Assessment Hub
                </h2>
                <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                    Test your knowledge on definitions, formulas, and concepts from the 2026-2028 IGCSE syllabus.
                </p>
                <div className="mt-8 flex justify-center gap-2 border-t pt-6 bg-gray-50 p-2 rounded-xl">
                    <button onClick={() => setQuizMode('solo')} className={navButtonClass('solo')}>Solo Quiz</button>
                    <button onClick={() => setQuizMode('group')} className={navButtonClass('group')}>Group Challenge</button>
                    <button onClick={() => setQuizMode('revision')} className={navButtonClass('revision')}>Quick Revision</button>
                </div>
            </section>

             <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-9 order-1 md:order-1">
                    {renderContent()}
                </div>
                <div className="md:col-span-3 order-2 md:order-2">
                    <div className="p-4 bg-white rounded-lg shadow-md sticky top-20">
                         <h3 className="text-xl font-bold text-gray-800 mb-4">Have Feedback?</h3>
                        <p className="text-gray-600 mb-4 text-sm">
                            Your suggestions help improve Physics Helper for everyone!
                        </p>
                        <form onSubmit={handleFeedbackSubmit}>
                            <input
                                type="text"
                                value={feedbackName}
                                onChange={(e) => setFeedbackName(e.target.value)}
                                placeholder="Your Name"
                                className="w-full p-2 mb-2 bg-white border border-gray-300 rounded-lg text-sm"
                                aria-label="Your Name for Feedback"
                            />
                            <textarea
                                value={feedbackText}
                                onChange={(e) => setFeedbackText(e.target.value)}
                                rows={3}
                                placeholder="Your experience, suggestions..."
                                className="w-full p-2 bg-white border border-gray-300 rounded-lg text-sm"
                                aria-label="Your Feedback"
                            ></textarea>
                            <button
                                type="submit"
                                disabled={!feedbackName.trim() || !feedbackText.trim()}
                                className="mt-2 w-full py-2 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-800 disabled:bg-gray-400 transition text-sm"
                            >
                                Send via Google Form
                            </button>
                        </form>
                        {feedbackError && <p className="mt-2 text-center text-red-500 text-xs">{feedbackError}</p>}
                        {feedbackResponse && <p className="mt-2 text-center text-green-600 text-xs">{feedbackResponse}</p>}
                        
                        <div className="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                            <h4 className="font-bold text-blue-800">A Message from Physics Helper</h4>
                            <p className="text-sm text-blue-700 italic mt-1">"{helperMessage}"</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MainView;