
import React, { useState, useEffect } from 'react';
import { PHYSICS_CATEGORIES, BIOLOGY_CATEGORIES, CHEMISTRY_CATEGORIES, GENERAL_HELPER_MESSAGES } from '../constants';
import type { SoloQuizConfig } from '../types';
import CertificateShowcase from './CertificateShowcase';
import QuickRevisionView from './QuickRevisionView';
import GroupQuizFlow from './GroupQuizFlow';

const AssistantMessage: React.FC<{ message: string }> = ({ message }) => (
    <div className="p-6 bg-indigo-50 border border-indigo-200 rounded-2xl shadow-sm">
        <div className="flex items-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-bold text-indigo-900">Message from Science Helper</h3>
        </div>
        <p className="text-indigo-800 text-base italic pl-9">"{message}"</p>
    </div>
);

const MainView: React.FC<{ 
    onStartQuiz: (name: string, config: SoloQuizConfig) => void;
}> = ({ onStartQuiz }) => {
    const [subject, setSubject] = useState<'physics' | 'biology' | 'chemistry'>('physics');
    const [quizMode, setQuizMode] = useState<'solo' | 'group' | 'revision'>('solo');
    
    // Solo state
    const [studentName, setStudentName] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [syllabusLevel, setSyllabusLevel] = useState<'core' | 'extended'>('extended');
    const [soloQuizConfig, setSoloQuizConfig] = useState<Omit<SoloQuizConfig, 'categories' | 'seed' | 'syllabusLevel' | 'subject'>>({ questionCount: 15, timerEnabled: false, timeLimit: 15 });
    
    // Common state
    const [helperMessage, setHelperMessage] = useState('');

    useEffect(() => {
        setHelperMessage(GENERAL_HELPER_MESSAGES[Math.floor(Math.random() * GENERAL_HELPER_MESSAGES.length)]);
    }, []);

    const handleSubjectChange = (newSubject: 'physics' | 'biology' | 'chemistry') => {
        if (subject !== newSubject) {
            setSubject(newSubject);
            setSelectedCategories([]);
            setStudentName('');
        }
    };

    const handleStartSoloQuizClick = () => {
        if (studentName && selectedCategories.length > 0) {
            const config: SoloQuizConfig = { ...soloQuizConfig, categories: selectedCategories, syllabusLevel, subject };
            onStartQuiz(studentName, config);
        } else {
            alert("Please enter your name and select at least one category.");
        }
    };

    const renderContent = () => {
        const ALL_CATEGORIES = subject === 'biology' ? BIOLOGY_CATEGORIES : subject === 'chemistry' ? CHEMISTRY_CATEGORIES : PHYSICS_CATEGORIES;
        const subjectTitle = subject.charAt(0).toUpperCase() + subject.slice(1);

        switch(quizMode) {
            case 'revision':
                return <QuickRevisionView subject={subject} />;
            case 'solo':
                return (
                    <div className="space-y-6">
                         <h2 className="text-3xl font-bold text-gray-800 text-center">Solo {subjectTitle} Quiz Challenge</h2>
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
                                            {ALL_CATEGORIES.map(category => (
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
                                                {Array.from({length: 26}, (_, i) => i + 5).map(n => <option key={n} value={n}>{n} Questions</option>)}
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
                return <GroupQuizFlow subject={subject} onStartQuiz={onStartQuiz} />;
        }
    }

    const navButtonClass = (buttonMode: typeof quizMode) => 
        `px-6 py-3 text-lg font-semibold rounded-lg transition-colors duration-300 ${quizMode === buttonMode ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-100'}`;
    
    const subjectButtonClass = (buttonSubject: 'physics' | 'biology' | 'chemistry') => 
        `px-4 py-2 rounded-md font-semibold text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${subject === buttonSubject ? 'bg-indigo-600 text-white shadow' : 'bg-white text-gray-600 hover:bg-gray-100'}`;

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <section className="bg-white rounded-xl shadow-lg border border-gray-200">
                <div className="p-6 border-b">
                     <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800">
                                IGCSE Science Assessment Hub
                            </h2>
                            <p className="mt-2 text-gray-600">
                                Test your knowledge in Physics, Biology, or Chemistry from the 2026-2028 syllabus.
                            </p>
                        </div>
                        <div className="flex-shrink-0 flex items-center space-x-2 bg-gray-200 p-1 rounded-lg">
                            <button onClick={() => handleSubjectChange('physics')} className={subjectButtonClass('physics')}>Physics</button>
                            <button onClick={() => handleSubjectChange('biology')} className={subjectButtonClass('biology')}>Biology</button>
                            <button onClick={() => handleSubjectChange('chemistry')} className={subjectButtonClass('chemistry')}>Chemistry</button>
                        </div>
                    </div>
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
