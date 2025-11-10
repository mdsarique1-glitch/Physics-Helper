
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

    try {
        if (hasCertificate) {
            const data = await getCertificateData(studentName, result.correctAnswers, result.totalQuestions, quizConfig.categories, quizConfig.subject, result.isGroupChallenge);
            result.certificateData = data;
        } else if (!result.error) {
            const report = await getSoloImprovementReport(studentName, result.correctAnswers, result.totalQuestions, quizConfig.categories, quizConfig.subject);
            result.improvementReport = report;
        }
    } catch (e) {
        console.error("Failed to fetch certificate/report data:", e);
    }
    
    result.categories = quizConfig.categories;
    result.subject = quizConfig.subject;
    setQuizResult(result);
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