
import React, { useState } from 'react';
import Layout from './components/Layout';
import MainView from './components/MainView';
import QuizFlow from './components/QuizFlow';
import type { QuizResult, SoloQuizConfig } from './types';
import { View } from './types';
import { getCertificateData, getSoloImprovementReport } from './services/geminiService';

const App: React.FC = () => {
  const [view, setView] = useState<View>(View.MAIN);
  const [studentName, setStudentName] = useState<string>('');
  
  // Unified Quiz State
  const [quizConfig, setQuizConfig] = useState<SoloQuizConfig | null>(null);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

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
         // Generic fallback for any API error. The user doesn't need to know about API keys.
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

  return (
    <Layout>
        {renderContent()}
    </Layout>
  );
};

export default App;
