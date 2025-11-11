
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import MainView from './components/MainView';
import QuizFlow from './components/QuizFlow';
import type { QuizResult, SoloQuizConfig } from './types';
import { View } from './types';
import { getCertificateData, getSoloImprovementReport } from './services/geminiService';

// Fix: Removed duplicate global declaration for window.aistudio.
// The TypeScript error indicates that this type is already defined globally as 'AIStudio'.

const ApiKeySelectionView: React.FC<{ onSelect: () => void }> = ({ onSelect }) => (
    <div className="flex flex-col items-center justify-center text-center p-8 max-w-lg mx-auto bg-white rounded-xl shadow-lg border border-gray-200 mt-10">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-indigo-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H5v-2H3v-2H1.258a1 1 0 01-.97-1.243l1.263-6.318a1 1 0 01.97-.757H7V5a2 2 0 012-2h5a2 2 0 012 2v2m0 0h2a2 2 0 012 2m0 0v2a2 2 0 01-2 2m0 0V9" />
        </svg>
        <h2 className="text-3xl font-bold text-gray-800 mb-3">API Key Required</h2>
        <p className="text-gray-600 mb-6">
            To generate quizzes and access AI features, this application requires a Google AI API key. Please select a key to continue.
        </p>
        <button 
            onClick={onSelect}
            className="px-8 py-3 bg-indigo-600 text-white font-bold text-lg rounded-lg shadow-md hover:bg-indigo-700 transition-transform transform hover:scale-105"
        >
            Select API Key
        </button>
    </div>
);


const App: React.FC = () => {
  const [view, setView] = useState<View>(View.MAIN);
  const [studentName, setStudentName] = useState<string>('');
  
  // Unified Quiz State
  const [quizConfig, setQuizConfig] = useState<SoloQuizConfig | null>(null);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [isApiKeyReady, setIsApiKeyReady] = useState(false);

  useEffect(() => {
    const checkApiKey = async () => {
      if (window.aistudio && typeof window.aistudio.hasSelectedApiKey === 'function') {
        const hasKey = await window.aistudio.hasSelectedApiKey();
        setIsApiKeyReady(hasKey);
      } else {
        // Fallback for environments where aistudio is not available, assume key is set
        setIsApiKeyReady(true);
      }
    };
    checkApiKey();
  }, []);

  useEffect(() => {
    const handleApiKeyError = () => {
      console.warn("API key error detected. Prompting for new key.");
      setIsApiKeyReady(false);
    };
    window.addEventListener('apiKeyError', handleApiKeyError);
    return () => {
      window.removeEventListener('apiKeyError', handleApiKeyError);
    };
  }, []);

  const handleSelectApiKey = async () => {
    if (window.aistudio && typeof window.aistudio.openSelectKey === 'function') {
      await window.aistudio.openSelectKey();
      // Assume selection was successful to avoid race conditions.
      setIsApiKeyReady(true);
    }
  };

  const startQuiz = (name: string, config: SoloQuizConfig) => {
    setStudentName(name);
    setQuizConfig(config);
    setQuizResult(null);
    setView(View.QUIZ);
  };

  const showResults = async (result: QuizResult) => {
    if (!quizConfig) return;
    const accuracy = result.totalQuestions > 0 ? (result.correctAnswers / result.totalQuestions) * 100 : 0;
    const hasCertificate = accuracy >= 61 && !result.error;

    // Create a new result object to avoid mutating the parameter
    const finalResult = { ...result };
    finalResult.categories = quizConfig.categories;
    finalResult.subject = quizConfig.subject;
    finalResult.organizerName = quizConfig.organizerName;
    finalResult.challengeTitle = quizConfig.challengeTitle;


    try {
        if (hasCertificate) {
            const data = await getCertificateData(studentName, finalResult.correctAnswers, finalResult.totalQuestions, quizConfig.categories, quizConfig.subject, finalResult.isGroupChallenge);
            finalResult.certificateData = data;
        } else if (!finalResult.error) {
            const report = await getSoloImprovementReport(studentName, finalResult.correctAnswers, finalResult.totalQuestions, quizConfig.categories, quizConfig.subject);
            finalResult.improvementReport = report;
        }
    } catch (e) {
        console.error("Failed to fetch certificate/report data:", e);
         if (e instanceof Error && (e.message.toLowerCase().includes('api key') || e.message.toLowerCase().includes('requested entity was not found'))) {
            // The API key error is already handled by the global listener, so we just stop.
            return;
        }
        if (hasCertificate) {
            finalResult.certificateData = { summary: "Could not load performance summary due to a network issue, but your score is certified. Congratulations on your achievement!" };
        } else if (!finalResult.error) {
             finalResult.improvementReport = { improvementAreas: ["Could not load specific improvement areas due to a network issue."], motivationalMessage: "Every attempt is a step forward. Keep practicing and you'll master it!"};
        }
    }
    
    setQuizResult(finalResult);
    setView(View.CERTIFICATE);
  };

  const resetApp = () => {
    setView(View.MAIN);
    setStudentName('');
    setQuizConfig(null);
    setQuizResult(null);
  };

  const renderContent = () => {
    switch (view) {
      case View.QUIZ:
      case View.CERTIFICATE:
        return (
          <QuizFlow
            initialView={view}
            studentName={studentName}
            quizConfig={quizConfig!}
            onQuizComplete={showResults}
            quizResult={quizResult}
            onReset={resetApp}
          />
        );
      case View.MAIN:
      default:
        return <MainView onStartQuiz={startQuiz} />;
    }
  };

  if (!isApiKeyReady) {
    return (
      <Layout>
        <ApiKeySelectionView onSelect={handleSelectApiKey} />
      </Layout>
    );
  }

  return (
    <Layout>
        {renderContent()}
    </Layout>
  );
};

export default App;
