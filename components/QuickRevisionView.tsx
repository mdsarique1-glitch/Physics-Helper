
import React, { useState } from 'react';
import { PHYSICS_CATEGORIES, BIOLOGY_CATEGORIES } from '../constants';
import { generateRevisionNotes } from '../services/geminiService';
import type { Topic, RevisionNote, RevisionPoint } from '../types';
import LoadingSpinner from './LoadingSpinner';

const CollapsibleSection: React.FC<{
    title: string;
    children: React.ReactNode;
    titleClassName?: string;
    onHeaderClick?: () => void;
    isOpen?: boolean;
}> = ({ title, children, titleClassName, onHeaderClick, isOpen: controlledIsOpen }) => {
    const [internalIsOpen, setInternalIsOpen] = useState(false);

    const isControlled = controlledIsOpen !== undefined;
    const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

    const handleToggle = () => {
        if (onHeaderClick) {
            onHeaderClick();
        }
        if (!isControlled) {
            setInternalIsOpen(!isOpen);
        }
    };

    return (
        <div>
            <button
                onClick={handleToggle}
                className={`w-full text-left p-4 flex justify-between items-center transition ${titleClassName} ${isOpen ? 'bg-indigo-100 text-indigo-900' : 'hover:bg-gray-50'}`}
            >
                <span className="flex-1">{title}</span>
                <svg className={`w-5 h-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {isOpen && <div className="bg-white">{children}</div>}
        </div>
    );
};

const RevisionPointCard: React.FC<{ point: RevisionPoint }> = ({ point }) => (
    <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-indigo-300 hover:scale-[1.01]">
        <div className="text-gray-700 text-base mb-4" dangerouslySetInnerHTML={{ __html: point.description }} />
        
        {point.formula && point.formula !== 'N/A' && (
            <div className="flex flex-col md:flex-row gap-4 items-stretch bg-gray-50 p-3 rounded-md border border-gray-200 my-2">
                <div className="flex-shrink-0 md:flex-shrink w-full md:w-2/5 flex justify-center items-center bg-gray-100 p-4 rounded-lg border-2 border-dashed border-gray-300">
                    <p className="font-mono text-xl text-indigo-900" dangerouslySetInnerHTML={{ __html: point.formula }} />
                </div>
                {point.symbolExplanation && point.symbolExplanation !== 'N/A' && (
                    <div className="flex-grow text-sm text-gray-600 space-y-1 p-2">
                        <p className="font-bold text-gray-800 mb-1">Where:</p>
                        <div className="leading-relaxed" dangerouslySetInnerHTML={{ __html: point.symbolExplanation }} />
                    </div>
                )}
            </div>
        )}

        {point.siUnit && point.siUnit !== 'N/A' && (
            <div className="flex items-center space-x-2 mt-3 text-base">
                <span className="font-semibold text-purple-800">SI Unit:</span>
                <p className="text-gray-800 font-medium" dangerouslySetInnerHTML={{ __html: point.siUnit }} />
            </div>
        )}
        
        {point.tableData && (
             <div className="mt-4">
                <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-inner">
                    <table className="w-full text-sm text-left text-gray-700">
                        <thead className="text-xs text-gray-800 uppercase bg-gray-200">
                            <tr>
                                {point.tableData.headers.map(header => (
                                    <th key={header} scope="col" className="px-4 py-3 font-bold tracking-wider">{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {point.tableData.rows.map((row, rowIndex) => (
                                <tr key={rowIndex} className="hover:bg-indigo-50 border-b border-gray-200 last:border-b-0">
                                    {row.map((cell, cellIndex) => (
                                        <td key={cellIndex} className="px-4 py-3" dangerouslySetInnerHTML={{ __html: cell }}></td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )}
    </div>
);


const RevisionTopicView: React.FC<{ topic: Topic, subject: 'physics' | 'biology' }> = ({ topic, subject }) => {
    const [notes, setNotes] = useState<RevisionNote[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    React.useEffect(() => {
        const fetchNotes = async () => {
            const cacheKey = `revision-notes-${subject}-${topic.name}`;
            try {
                const cachedNotes = sessionStorage.getItem(cacheKey);
                if (cachedNotes) {
                    setNotes(JSON.parse(cachedNotes));
                    setIsLoading(false);
                    return;
                }
            } catch (e) {
                console.warn("Could not retrieve cached notes:", e)
            }
            
            setIsLoading(true);
            setError(null);
            try {
                const fetchedNotes = await generateRevisionNotes(topic, subject);
                setNotes(fetchedNotes);
                try {
                    sessionStorage.setItem(cacheKey, JSON.stringify(fetchedNotes));
                } catch(e) {
                     console.warn("Could not cache revision notes:", e)
                }
            } catch (err) {
                setError('Failed to load revision notes. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchNotes();
    }, [topic, subject]);

    return (
        <div className="p-4 md:p-6 bg-slate-50">
            {isLoading && <div className="flex justify-center items-center py-8"><LoadingSpinner /></div>}
            {error && <p className="text-red-500 text-center py-4">{error}</p>}
            {notes && (
                <div className="space-y-8">
                    {notes.map(note => (
                        <div key={note.subTopicHeading}>
                            <h4 className="font-extrabold text-2xl md:text-3xl text-indigo-800 mb-4 p-3 bg-indigo-100 rounded-lg border-l-8 border-indigo-500 shadow">
                                {note.subTopicHeading}
                            </h4>
                            <div className="space-y-4 pl-2">
                                {note.points.map((point, index) => (
                                    <RevisionPointCard key={index} point={point} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const QuickRevisionView: React.FC<{ subject: 'physics' | 'biology' }> = ({ subject }) => {
    const [openCategory, setOpenCategory] = useState<string | null>(null);
    const categories = subject === 'biology' ? BIOLOGY_CATEGORIES : PHYSICS_CATEGORIES;

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="p-8 border-b bg-gray-50">
                 <h2 className="text-4xl font-extrabold text-indigo-900">Quick Revision Notes</h2>
                 <p className="text-gray-600 mt-2 max-w-3xl">
                    Syllabus aligned concise notes for last minute revision.
                 </p>
            </div>
            <div>
                {categories.map(category => (
                    <div key={category.name} className="border-b last:border-b-0">
                        <CollapsibleSection
                            title={category.name}
                            titleClassName="text-xl font-bold text-indigo-700"
                            isOpen={openCategory === category.name}
                            onHeaderClick={() => setOpenCategory(current => current === category.name ? null : category.name)}
                        >
                            <div className="divide-y divide-gray-200">
                                {category.topics.map(topic => (
                                    <CollapsibleSection
                                        key={topic.name}
                                        title={topic.name}
                                        titleClassName="text-lg font-semibold text-gray-800 pl-8"
                                    >
                                        <RevisionTopicView topic={topic} subject={subject} />
                                    </CollapsibleSection>
                                ))}
                            </div>
                        </CollapsibleSection>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuickRevisionView;