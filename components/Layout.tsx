import React, { useState, useEffect } from 'react';
import type { FeedbackEntry } from '../types';
import { getStoredFeedback, clearStoredFeedback } from '../services/geminiService';

interface LayoutProps {
  children: React.ReactNode;
}

const DeveloperPanel: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [feedback, setFeedback] = useState<FeedbackEntry[]>([]);
    const [show, setShow] = useState(false);

    useEffect(() => {
        setFeedback(getStoredFeedback().reverse()); // Show newest first
        setShow(true);
    }, []);

    const handleClear = () => {
        if (window.confirm("Are you sure you want to clear all locally stored feedback?")) {
            clearStoredFeedback();
            setFeedback([]);
        }
    };
    
    const handleClose = () => {
        setShow(false);
        setTimeout(onClose, 300); // Wait for animation to finish before unmounting
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-end" onClick={handleClose} role="dialog" aria-modal="true" aria-labelledby="dev-panel-title">
            <div
                className={`bg-gray-100 w-full max-w-3xl h-3/4 rounded-t-2xl shadow-xl p-6 flex flex-col transform transition-transform duration-300 ease-out ${show ? 'translate-y-0' : 'translate-y-full'}`}
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-300">
                    <h2 id="dev-panel-title" className="text-2xl font-bold text-gray-800">Developer Panel - Local Feedback Log</h2>
                    <button onClick={handleClose} className="text-gray-500 hover:text-gray-900 text-3xl font-bold leading-none p-2 -m-2" aria-label="Close Developer Panel">&times;</button>
                </div>
                <div className="flex-grow overflow-y-auto pr-2 space-y-4 bg-white p-4 rounded-lg border">
                    {feedback.length > 0 ? (
                        feedback.map((entry, index) => (
                            <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                <p className="text-gray-800 whitespace-pre-wrap">{entry.text}</p>
                                <p className="text-xs text-gray-500 mt-2 text-right">{new Date(entry.timestamp).toLocaleString()}</p>
                            </div>
                        ))
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-center text-gray-500">No feedback has been submitted in this browser.</p>
                        </div>
                    )}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-300">
                    <button
                        onClick={handleClear}
                        disabled={feedback.length === 0}
                        className="w-full py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 disabled:bg-red-300 disabled:cursor-not-allowed transition"
                    >
                        Clear All Feedback
                    </button>
                </div>
            </div>
        </div>
    );
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [isDevPanelOpen, setIsDevPanelOpen] = useState(false);

  useEffect(() => {
    // Simulate a visitor count using localStorage
    let count = localStorage.getItem('visitorCount');
    let newCount: number;
    if (count) {
      newCount = parseInt(count, 10) + Math.floor(Math.random() * 5) + 1;
    } else {
      newCount = Math.floor(Math.random() * 1000) + 1500; // Start with a random base
    }
    localStorage.setItem('visitorCount', String(newCount));
    setVisitorCount(newCount);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 flex flex-col">
      <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md w-full sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 text-center">
          <h1 className="text-xl md:text-2xl font-bold tracking-wide">
            Physics Helper
          </h1>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4 md:p-6 w-full">
        {children}
      </main>

      <footer className="w-full text-center p-4 text-gray-500 text-sm">
        <div className="flex justify-center items-center space-x-4">
          <p 
            onClick={() => setIsDevPanelOpen(true)} 
            className="cursor-pointer hover:text-indigo-600 transition"
            title="Open Developer Panel"
          >
            Developed by Mohammed Sarique
          </p>
          {visitorCount !== null && (
            <div className="flex items-center">
              <span className="text-gray-300">|</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.022 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
              <span>{visitorCount.toLocaleString()} Visitors</span>
            </div>
          )}
        </div>
      </footer>
      {isDevPanelOpen && <DeveloperPanel onClose={() => setIsDevPanelOpen(false)} />}
    </div>
  );
};

export default Layout;
