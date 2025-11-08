
import React, { useState, useEffect } from 'react';
import { PHYSICS_CATEGORIES, PHYSICS_HELPER_MESSAGES } from '../constants';
import { getFeedbackResponse, generateQuizQuestions, getConceptExplanation, saveFeedback } from '../services/geminiService';
import type { GroupQuiz, ConceptExplanation } from '../types';
import type { SoloQuizConfig } from '../App';
import LoadingSpinner from './LoadingSpinner';
import QuickRevisionView from './QuickRevisionView';
import CertificateShowcase from './CertificateShowcase';

const MainView: React.FC<{ 
    onStartSoloQuiz: (name: string, topics: string[], config: SoloQuizConfig) => void;
    onStartGroupQuizLobby: (quiz: GroupQuiz, participantId: string, isOrganizer: boolean) => void;
}> = ({ onStartSoloQuiz, onStartGroupQuizLobby }) => {
    const [mode, setMode] = useState<'revision' | 'solo-quiz' | 'group-quiz'>('revision');
    
    // Solo Quiz state
    const [studentName, setStudentName] = useState('');
    const [selectedCategoriesForQuiz, setSelectedCategoriesForQuiz] = useState<string[]>([]);
    const [soloQuizConfig, setSoloQuizConfig] = useState<Omit<SoloQuizConfig, 'categories'>>({ questionCount: 15, timerEnabled: false, timeLimit: 15 });
    
    // Group Quiz state
    const [organizerName, setOrganizerName] = useState('');
    const [joinCode, setJoinCode] = useState('');
    const [groupQuizConfig, setGroupQuizConfig] = useState({ title: '', questionCount: 10, timeLimit: 10, categories: [] as string[] });
    const [isCreatingGroup, setIsCreatingGroup] = useState(false);
    const [activeOrganizerQuiz, setActiveOrganizerQuiz] = useState<string | null>(null);

    // Quick Search State
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState<ConceptExplanation | null>(null);
    const [isSearching, setIsSearching] = useState(false);
    const [searchError, setSearchError] = useState<string | null>(null);
    
    // Common state
    const [feedbackText, setFeedbackText] = useState('');
    const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
    const [feedbackResponse, setFeedbackResponse] = useState('');
    const [feedbackError, setFeedbackError] = useState('');
    const [helperMessage, setHelperMessage] = useState('');

    useEffect(() => {
        setHelperMessage(PHYSICS_HELPER_MESSAGES[Math.floor(Math.random() * PHYSICS_HELPER_MESSAGES.length)]);
        
        const activeQuizCode = localStorage.getItem('organizer-active-quiz');
        if (activeQuizCode) {
            const quizData = localStorage.getItem(`group-quiz-${activeQuizCode}`);
            if (quizData) {
                const quiz: GroupQuiz = JSON.parse(quizData);
                if (quiz.status === 'lobby') {
                    setActiveOrganizerQuiz(activeQuizCode);
                } else {
                    localStorage.removeItem('organizer-active-quiz');
                }
            } else {
                 localStorage.removeItem('organizer-active-quiz');
            }
        }
    }, []);

    const handleStartSoloQuizClick = () => {
        const topicsForQuiz = PHYSICS_CATEGORIES
            .filter(category => selectedCategoriesForQuiz.includes(category.name))
            .flatMap(category => category.topics.map(topic => topic.name));

        if (studentName && topicsForQuiz.length > 0) {
            const configWithCategories: SoloQuizConfig = { ...soloQuizConfig, categories: selectedCategoriesForQuiz };
            onStartSoloQuiz(studentName, topicsForQuiz, configWithCategories);
        } else {
            alert("Please enter your name and select at least one category.");
        }
    };
    
    const handleCreateGroupQuiz = async () => {
        if (!organizerName.trim() || !groupQuizConfig.title.trim() || groupQuizConfig.categories.length === 0) {
            alert("Please provide your name, a quiz title, and select at least one category.");
            return;
        }
        setIsCreatingGroup(true);
        try {
            const topicsForQuiz = PHYSICS_CATEGORIES
                .filter(category => groupQuizConfig.categories.includes(category.name))
                .flatMap(category => category.topics.map(topic => topic.name));

            const questions = await generateQuizQuestions(topicsForQuiz, groupQuizConfig.questionCount);
            if (questions.length === 0) {
                throw new Error("Could not generate questions for the selected topics.");
            }
            
            const groupCode = Math.random().toString(36).substring(2, 8).toUpperCase();
            const newGroupQuiz: GroupQuiz = {
                code: groupCode,
                organizerName,
                config: groupQuizConfig,
                questions,
                participants: [],
                status: 'lobby'
            };

            localStorage.setItem(`group-quiz-${groupCode}`, JSON.stringify(newGroupQuiz));
            localStorage.setItem('organizer-active-quiz', groupCode);
            onStartGroupQuizLobby(newGroupQuiz, 'organizer', true);

        } catch (error) {
            console.error("Failed to create group quiz:", error);
            alert("An error occurred while creating the group quiz. Please try again.");
        } finally {
            setIsCreatingGroup(false);
        }
    };

    const handleJoinGroupQuiz = () => {
        if (!studentName.trim() || !joinCode.trim()) {
            alert("Please enter your name and a group code.");
            return;
        }
        const quizData = localStorage.getItem(`group-quiz-${joinCode.toUpperCase()}`);
        if (!quizData) {
            alert("Invalid group code. Please check the code and try again.");
            return;
        }
        const quiz: GroupQuiz = JSON.parse(quizData);
        if (quiz.participants.length >= 15) {
            alert("This group is full.");
            return;
        }
        if (quiz.status !== 'lobby') {
            alert("This quiz has already started and cannot be joined.");
            return;
        }

        const participantId = `p-${Date.now()}`;
        const newParticipant = { id: participantId, name: studentName, score: 0, isFinished: false };
        quiz.participants.push(newParticipant);
        localStorage.setItem(`group-quiz-${quiz.code}`, JSON.stringify(quiz));

        onStartGroupQuizLobby(quiz, participantId, false);
    };

    const handleRejoinLobby = () => {
        if (!activeOrganizerQuiz) return;
        const quizData = localStorage.getItem(`group-quiz-${activeOrganizerQuiz}`);
        if (quizData) {
            const quiz: GroupQuiz = JSON.parse(quizData);
            onStartGroupQuizLobby(quiz, 'organizer', true);
        }
    };

    const handleFeedbackSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!feedbackText.trim()) return;
        setIsSubmittingFeedback(true);
        setFeedbackError('');
        setFeedbackResponse('');
        try {
            saveFeedback(feedbackText); // Save the feedback to localStorage
            const response = await getFeedbackResponse(feedbackText);
            setFeedbackResponse(response);
            setFeedbackText('');
        } catch (err) {
            setFeedbackError('Sorry, we couldn\'t submit your feedback right now.');
        } finally {
            setIsSubmittingFeedback(false);
        }
    };

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        setIsSearching(true);
        setSearchError(null);
        setSearchResult(null);
        try {
            const result = await getConceptExplanation(searchQuery);
            setSearchResult(result);
        } catch (err) {
            setSearchError('Sorry, I couldn\'t find information on that. Please try a different term.');
        } finally {
            setIsSearching(false);
        }
    };
    
    const renderModeContent = () => {
        switch(mode) {
            case 'revision':
                 return (
                    <div>
                        <QuickRevisionView />
                    </div>
                );
            case 'solo-quiz':
                return (
                    <div>
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
                                                <input type="checkbox" id={`category-${category.name}`} checked={selectedCategoriesForQuiz.includes(category.name)} onChange={() => setSelectedCategoriesForQuiz(prev => prev.includes(category.name) ? prev.filter(c => c !== category.name) : [...prev, category.name])} className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
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

                                <button onClick={handleStartSoloQuizClick} disabled={!studentName || selectedCategoriesForQuiz.length === 0} className="w-full px-8 py-4 bg-indigo-600 text-white font-bold text-lg rounded-lg shadow-md hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-transform transform hover:scale-105">
                                    Start Quiz!
                                </button>
                            </div>
                        </div>
                    </div>
                );
            case 'group-quiz':
                 if (activeOrganizerQuiz) {
                    const quizData = localStorage.getItem(`group-quiz-${activeOrganizerQuiz}`);
                    const quizTitle = quizData ? (JSON.parse(quizData) as GroupQuiz).config.title : '';
                    return (
                        <div>
                            <div className="p-8 bg-white rounded-xl shadow-lg border border-gray-200 text-center space-y-4">
                                <h2 className="text-2xl font-bold text-gray-800">Active Quiz Lobby</h2>
                                <p className="text-gray-600">You have a quiz titled "{quizTitle}" waiting for participants.</p>
                                <p className="font-mono text-2xl font-bold text-indigo-600 bg-gray-100 py-2 px-4 rounded-lg inline-block">{activeOrganizerQuiz}</p>
                                <div className="flex justify-center gap-4 pt-4">
                                    <button onClick={handleRejoinLobby} className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700">
                                        Re-enter Lobby
                                    </button>
                                    <button onClick={() => {
                                        localStorage.removeItem(`group-quiz-${activeOrganizerQuiz}`);
                                        localStorage.removeItem('organizer-active-quiz');
                                        setActiveOrganizerQuiz(null);
                                    }} className="px-6 py-3 bg-gray-200 text-gray-800 font-bold rounded-lg hover:bg-gray-300">
                                        Abandon & Create New
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                }
                 return (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Create Group Quiz Card */}
                        <div className="p-8 bg-white rounded-xl shadow-lg border border-gray-200 space-y-4">
                            <h2 className="text-2xl font-bold text-gray-800">Create a Group Quiz</h2>
                            <p className="text-gray-600">Be the organizer! Set up a quiz for your class or study group.</p>
                            <div>
                                <label className="block font-medium text-gray-700">Your Name (Organizer):</label>
                                <input type="text" value={organizerName} onChange={e => setOrganizerName(e.target.value)} placeholder="Enter your name" className="w-full mt-1 p-2 bg-white border border-gray-300 rounded" />
                            </div>
                             <div>
                                <label className="block font-medium text-gray-700">Quiz Title:</label>
                                <input type="text" value={groupQuizConfig.title} onChange={e => setGroupQuizConfig(c => ({...c, title: e.target.value}))} placeholder="e.g., Term 1 Revision" className="w-full mt-1 p-2 bg-white border border-gray-300 rounded" />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700">Number of Questions:</label>
                                <select value={groupQuizConfig.questionCount} onChange={e => setGroupQuizConfig(c => ({...c, questionCount: Number(e.target.value)}))} className="w-full mt-1 p-2 bg-white border border-gray-300 rounded">
                                    {[5, 10, 15, 20, 25].map(n => <option key={n} value={n}>{n}</option>)}
                                </select>
                            </div>
                             <div>
                                <label className="block font-medium text-gray-700">Time Limit (Minutes):</label>
                                <select value={groupQuizConfig.timeLimit} onChange={e => setGroupQuizConfig(c => ({...c, timeLimit: Number(e.target.value)}))} className="w-full mt-1 p-2 bg-white border border-gray-300 rounded">
                                    {[5, 10, 15, 20].map(n => <option key={n} value={n}>{n}</option>)}
                                </select>
                            </div>
                             <div>
                                <label className="block font-medium text-gray-700 mb-2">Categories:</label>
                                <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto">
                                    {PHYSICS_CATEGORIES.map(category => (
                                        <label key={category.name} className="flex items-center text-sm">
                                            <input type="checkbox" checked={groupQuizConfig.categories.includes(category.name)} onChange={() => setGroupQuizConfig(c => ({...c, categories: c.categories.includes(category.name) ? c.categories.filter(cat => cat !== category.name) : [...c.categories, category.name]}))} className="h-4 w-4 rounded border-gray-300 text-indigo-600" />
                                            <span className="ml-2 text-gray-700">{category.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <button onClick={handleCreateGroupQuiz} disabled={isCreatingGroup} className="w-full py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 disabled:bg-green-300">
                                {isCreatingGroup ? <LoadingSpinner/> : 'Create Group'}
                            </button>
                        </div>
                        {/* Join Group Quiz Card */}
                        <div className="p-8 bg-white rounded-xl shadow-lg border border-gray-200 space-y-4">
                            <h2 className="text-2xl font-bold text-gray-800">Join a Group Quiz</h2>
                             <p className="text-gray-600">Enter your name and the group code from your organizer to join.</p>
                            <div>
                                <label className="block font-medium text-gray-700">Your Name:</label>
                                <input type="text" value={studentName} onChange={e => setStudentName(e.target.value)} placeholder="Enter your name" className="w-full mt-1 p-2 bg-white border border-gray-300 rounded" />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700">Group Code:</label>
                                <input type="text" value={joinCode} onChange={e => setJoinCode(e.target.value)} placeholder="Enter 6-digit code" className="w-full mt-1 p-2 bg-white border border-gray-300 rounded uppercase" />
                            </div>
                             <button onClick={handleJoinGroupQuiz} className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700">
                                Join Quiz
                            </button>
                        </div>
                    </div>
                );
        }
    }

    const navButtonClass = (buttonMode: typeof mode) => 
        `px-4 py-2 text-lg font-semibold rounded-md transition ${mode === buttonMode ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`;

    return (
        <div className="space-y-8">
            <section className="text-center p-8 bg-white rounded-xl shadow-lg border border-gray-200">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
                    IGCSE Physics at Your Fingertips
                </h2>
                <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                    Explore topics, master concepts, and test your knowledge. Your journey to acing IGCSE Physics starts here!
                </p>

                <div className="mt-6 max-w-2xl mx-auto">
                    <form onSubmit={handleSearch} className="flex gap-2">
                        <input 
                            type="text"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            placeholder="Quick search for a concept (e.g., Velocity, Ohm's Law)..."
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <button type="submit" disabled={isSearching} className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 disabled:bg-indigo-300">
                            {isSearching ? '...' : 'Search'}
                        </button>
                    </form>
                </div>

                <div className="mt-4 max-w-2xl mx-auto text-left">
                    {isSearching && <div className="flex justify-center p-4"><LoadingSpinner /></div>}
                    {searchError && <p className="text-red-500 text-center p-4">{searchError}</p>}
                    {searchResult && (
                        <div className="p-6 bg-indigo-50 rounded-lg border border-indigo-200 relative">
                            <button onClick={() => setSearchResult(null)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" aria-label="Close search result">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <h3 className="text-2xl font-bold text-indigo-800 mb-3 capitalize">{searchQuery}</h3>
                            <div className="space-y-3">
                                <div>
                                    <h4 className="font-semibold text-gray-700">Description</h4>
                                    <p className="text-gray-800">{searchResult.description}</p>
                                </div>
                                {searchResult.formula !== 'N/A' && (
                                    <div>
                                        <h4 className="font-semibold text-gray-700">Formula</h4>
                                        <p className="text-gray-800 font-mono bg-white p-2 rounded border inline-block">{searchResult.formula}</p>
                                    </div>
                                )}
                                {searchResult.siUnit !== 'N/A' && (
                                    <div>
                                        <h4 className="font-semibold text-gray-700">SI Unit</h4>
                                        <p className="text-gray-800">{searchResult.siUnit}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-6 flex justify-center gap-4 border-t pt-6 flex-wrap">
                    <button onClick={() => setMode('revision')} className={navButtonClass('revision')}>Quick Revision</button>
                    <button onClick={() => setMode('solo-quiz')} className={navButtonClass('solo-quiz')}>Solo Quiz</button>
                    <button onClick={() => setMode('group-quiz')} className={navButtonClass('group-quiz')}>Group Quiz</button>
                </div>
            </section>

             <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-9 order-1 md:order-1">
                    {renderModeContent()}
                </div>
                <div className="md:col-span-3 order-2 md:order-2">
                    <div className="p-4 bg-white rounded-lg shadow-md sticky top-20">
                         <h3 className="text-xl font-bold text-gray-800 mb-4">Have Feedback?</h3>
                        <p className="text-gray-600 mb-4 text-sm">
                            Your suggestions help improve Physics Helper for everyone!
                        </p>
                        <form onSubmit={handleFeedbackSubmit}>
                            <textarea
                                value={feedbackText}
                                onChange={(e) => setFeedbackText(e.target.value)}
                                rows={3}
                                placeholder="Your experience, suggestions..."
                                className="w-full p-2 bg-white border border-gray-300 rounded-lg text-sm"
                            ></textarea>
                            <button
                                type="submit"
                                disabled={isSubmittingFeedback || !feedbackText.trim()}
                                className="mt-2 w-full py-2 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-800 disabled:bg-gray-400 transition text-sm"
                            >
                                {isSubmittingFeedback ? 'Submitting...' : 'Send Feedback'}
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
