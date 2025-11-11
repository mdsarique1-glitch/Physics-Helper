
import React, { useState, useEffect } from 'react';
import { PHYSICS_CATEGORIES, BIOLOGY_CATEGORIES, CHEMISTRY_CATEGORIES } from '../constants';
import type { SoloQuizConfig } from '../types';

const GROUP_QUESTION_OPTIONS = [5, 10, 15, 20, 25, 30, 35, 40];

const decodeChallengeCode = (code: string): SoloQuizConfig => {
    const parts = code.split('-');
    if (parts.length < 2 || parts.length > 3 || !parts[0] || !parts[1]) {
        throw new Error("Invalid challenge code format.");
    }

    const seed = parseInt(parts[0], 36);
    const packed = parseInt(parts[1], 36);

    if (isNaN(seed) || isNaN(packed)) {
        throw new Error("Invalid challenge code: The code is corrupted.");
    }
    
    let organizerName: string | undefined;
    let challengeTitle: string | undefined;

    if (parts.length === 3 && parts[2]) {
        try {
            const decodedMetadata = atob(parts[2]);
            // Try parsing as JSON first (old format)
            try {
                const jsonData = JSON.parse(decodedMetadata);
                organizerName = jsonData.organizer;
                challengeTitle = jsonData.title;
            } catch (jsonError) {
                // If JSON fails, assume pipe-separated format (new format)
                const metadataParts = decodedMetadata.split('|');
                if (metadataParts.length === 2) {
                    organizerName = metadataParts[0];
                    challengeTitle = metadataParts[1];
                } else {
                    console.warn("Could not parse metadata part of the code.");
                }
            }
        } catch (e) {
            console.warn("Could not decode or parse challenge metadata.", e);
        }
    }
    
    const subjectValue = packed & 3;
    const subject = subjectValue === 1 ? 'biology' : subjectValue === 2 ? 'chemistry' : 'physics';
    const ALL_CATEGORIES = subject === 'biology' ? BIOLOGY_CATEGORIES : subject === 'chemistry' ? CHEMISTRY_CATEGORIES : PHYSICS_CATEGORIES;

    const syllabusLevel = ((packed >> 2) & 1) === 1 ? 'extended' : 'core';
    const timeValue = (packed >> 3) & 3;
    const groupTimeOptions = [0, 5, 10, 15];
    const timeLimit = groupTimeOptions[timeValue] || 0;
    const timerEnabled = timeLimit > 0;
    const questionValue = (packed >> 5) & 7;
    const questionCount = GROUP_QUESTION_OPTIONS[questionValue] || 10;
    
    const categoryBitmask = (packed >> 8);
    const categoryIndices: number[] = [];
    for (let i = 0; i < ALL_CATEGORIES.length; i++) {
        if ((categoryBitmask >> i) & 1) {
            categoryIndices.push(i);
        }
    }
    const categories = categoryIndices.map(i => ALL_CATEGORIES[i]?.name).filter((name): name is string => !!name);

    if (categories.length === 0) {
        throw new Error("No categories found in challenge code.");
    }

    return {
        subject,
        categories,
        questionCount,
        timeLimit,
        timerEnabled,
        syllabusLevel,
        seed,
        organizerName,
        challengeTitle,
    };
};

const GROUP_TIME_OPTIONS_ENCODE = [0, 5, 10, 15];
const GROUP_TIME_OPTIONS_DISPLAY = [5, 10, 15];

const GroupQuizFlow: React.FC<{
    subject: 'physics' | 'biology' | 'chemistry';
    onStartQuiz: (name: string, config: SoloQuizConfig) => void;
}> = ({ subject, onStartQuiz }) => {
    const [studentName, setStudentName] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [syllabusLevel, setSyllabusLevel] = useState<'core' | 'extended'>('extended');
    const [organizerName, setOrganizerName] = useState('');
    const [joinCode, setJoinCode] = useState('');
    const [generatedChallengeCode, setGeneratedChallengeCode] = useState('');
    const [groupQuizConfig, setGroupQuizConfig] = useState<Omit<SoloQuizConfig, 'categories' | 'seed' | 'syllabusLevel' | 'subject'>>({ questionCount: 10, timerEnabled: false, timeLimit: 10 });
    const [challengeTitle, setChallengeTitle] = useState('');
    const [joinError, setJoinError] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        setStudentName('');
        setSelectedCategories([]);
        setSyllabusLevel('extended');
        setOrganizerName('');
        setJoinCode('');
        setGeneratedChallengeCode('');
        setChallengeTitle('');
        setJoinError('');
        setCopied(false);
    }, [subject]);

    const handleCreateChallenge = () => {
        const organizer = organizerName.trim();
        const title = challengeTitle.trim();
    
        if (!organizer || !title || selectedCategories.length === 0) {
            alert("Please provide your name, a challenge title, and select at least one category.");
            return;
        }
        
        if (organizer.length > 20 || title.length > 30) {
            alert("Organizer name must be 20 characters or less, and title must be 30 characters or less to keep the code short.");
            return;
        }
    
        const ALL_CATEGORIES = subject === 'biology' ? BIOLOGY_CATEGORIES : subject === 'chemistry' ? CHEMISTRY_CATEGORIES : PHYSICS_CATEGORIES;
        const seed = Math.floor(10000 + Math.random() * 90000);
        const categoryIndices = selectedCategories.map(name =>
            ALL_CATEGORIES.findIndex(cat => cat.name === name)
        ).filter(index => index !== -1);
    
        let packed = 0;
        const subjectValue = subject === 'biology' ? 1 : subject === 'chemistry' ? 2 : 0;
        packed |= subjectValue;
        const syllabusValue = syllabusLevel === 'extended' ? 1 : 0;
        packed |= (syllabusValue << 2);
        const timeIndex = GROUP_TIME_OPTIONS_ENCODE.indexOf(groupQuizConfig.timerEnabled ? groupQuizConfig.timeLimit : 0);
        packed |= ((timeIndex > -1 ? timeIndex : 0) << 3);
        const questionIndex = GROUP_QUESTION_OPTIONS.indexOf(groupQuizConfig.questionCount);
        packed |= ((questionIndex > -1 ? questionIndex : 0) << 5);
        const categoryBitmask = categoryIndices.reduce((acc, index) => acc | (1 << index), 0);
        packed |= (categoryBitmask << 8);
    
        const metadata = `${organizer}|${title}`;
        const encodedMetadata = btoa(metadata);

        const code = `${seed.toString(36).toUpperCase()}-${packed.toString(36).toUpperCase()}-${encodedMetadata}`;
        setGeneratedChallengeCode(code);
    };

    const handleJoinChallenge = () => {
        setJoinError('');
        if (!studentName.trim() || !joinCode.trim()) {
            setJoinError("Please enter your name and a challenge code.");
            return;
        }
        try {
            const code = joinCode.trim().toUpperCase();
            const config = decodeChallengeCode(code);
            config.challengeCode = code;
            onStartQuiz(studentName, config);
        } catch (error) {
            const message = error instanceof Error ? error.message : "An unknown error occurred.";
            setJoinError(message);
        }
    };
    
    const startChallengeForOrganizer = () => {
        try {
            const config = decodeChallengeCode(generatedChallengeCode);
            config.challengeCode = generatedChallengeCode;
            onStartQuiz(organizerName, config);
        } catch (error) {
            const message = error instanceof Error ? error.message : "Could not start the challenge due to an error.";
            alert(message);
        }
    }

    const handleCopyCode = () => {
        if (!generatedChallengeCode) return;
        navigator.clipboard.writeText(generatedChallengeCode).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }).catch(err => {
            console.error('Failed to copy code: ', err);
            alert('Failed to copy code.');
        });
    };

    const ALL_CATEGORIES = subject === 'biology' ? BIOLOGY_CATEGORIES : subject === 'chemistry' ? CHEMISTRY_CATEGORIES : PHYSICS_CATEGORIES;
    const subjectTitle = subject.charAt(0).toUpperCase() + subject.slice(1);

    if (generatedChallengeCode) {
        return (
            <div className="p-8 bg-white rounded-xl shadow-lg border border-gray-200 text-center space-y-4">
                <h2 className="text-2xl font-bold text-green-700">Challenge Created!</h2>
                <p className="text-gray-600">Share this code with your friends to start the challenge.</p>
                <div className="p-3 bg-gray-100 rounded-lg flex flex-col sm:flex-row items-center justify-center sm:space-x-4 space-y-2 sm:space-y-0">
                    <p className="font-mono text-xl md:text-2xl font-bold text-indigo-600 break-words">{generatedChallengeCode}</p>
                    <button 
                        onClick={handleCopyCode} 
                        className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors w-24 flex-shrink-0 ${copied ? 'bg-green-500 text-white' : 'bg-indigo-500 text-white hover:bg-indigo-600'}`}
                    >
                        {copied ? 'Copied!' : 'Copy Code'}
                    </button>
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
            <div className="p-8 bg-white rounded-xl shadow-lg border border-gray-200 space-y-4">
                <h2 className="text-2xl font-bold text-gray-800">Create a {subjectTitle} Group Challenge</h2>
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
                        {GROUP_QUESTION_OPTIONS.map(n => <option key={n} value={n}>{n}</option>)}
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
                                {GROUP_TIME_OPTIONS_DISPLAY.map(time => (
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
                        {ALL_CATEGORIES.map(category => (
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
                    {joinError && <p className="text-red-500 text-sm mt-1">{joinError}</p>}
                </div>
                 <button onClick={handleJoinChallenge} className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700">
                    Join Challenge
                </button>
            </div>
        </div>
    );
};

export default GroupQuizFlow;
