
import React, { useState } from 'react';
import Layout from './components/Layout';
import MainView from './components/MainView';
import QuizFlow from './components/QuizFlow';
import GroupQuizFlow from './components/GroupQuizFlow';
import type { QuizResult, GroupQuiz, CertificateData, SoloImprovementReport } from './types';
import { View } from './types';
import { getCertificateData, getSoloImprovementReport } from './services/geminiService';


export interface SoloQuizConfig {
    questionCount: number;
    timerEnabled: boolean;
    timeLimit: number; // in minutes
    categories: string[];
}

const App: React.FC = () => {
  const [view, setView] = useState<View>(View.MAIN);
  const [studentName, setStudentName] = useState<string>('');
  
  // Solo Quiz State
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [soloQuizConfig, setSoloQuizConfig] = useState<SoloQuizConfig>({ questionCount: 15, timerEnabled: false, timeLimit: 15, categories: [] });
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  // Group Quiz State
  const [groupQuiz, setGroupQuiz] = useState<GroupQuiz | null>(null);
  const [isOrganizer, setIsOrganizer] = useState<boolean>(false);
  const [participantId, setParticipantId] = useState<string>('');

  const goToMainView = () => setView(View.MAIN);


  const startSoloQuiz = (name: string, topics: string[], config: SoloQuizConfig) => {
    setStudentName(name);
    setSelectedTopics(topics);
    setSoloQuizConfig(config);
    setQuizResult(null);
    setView(View.QUIZ);
  };

  const showCertificate = async (result: QuizResult) => {
    const accuracy = result.totalQuestions > 0 ? (result.correctAnswers / result.totalQuestions) * 100 : 0;
    const hasCertificate = accuracy >= 61 && !result.error;

    try {
        if (hasCertificate) {
            const data = await getCertificateData(studentName, result.correctAnswers, result.totalQuestions, soloQuizConfig.categories);
            result.certificateData = data;
        } else if (!result.error) {
            const report = await getSoloImprovementReport(studentName, result.correctAnswers, result.totalQuestions, soloQuizConfig.categories);
            result.improvementReport = report;
        }
    } catch (e) {
        console.error("Failed to fetch certificate/report data:", e);
    }
    
    result.categories = soloQuizConfig.categories;
    setQuizResult(result);
    setView(View.CERTIFICATE);
  };
  
  const startGroupQuiz = (quiz: GroupQuiz) => {
      setGroupQuiz(quiz);
      setView(View.GROUP_QUIZ);
  };

  const showGroupQuizLobby = (quiz: GroupQuiz, pId: string, isOrg: boolean) => {
      setGroupQuiz(quiz);
      setParticipantId(pId);
      setIsOrganizer(isOrg);
      setView(View.GROUP_QUIZ_LOBBY);
  };
  
  const showGroupQuizResults = (quiz: GroupQuiz) => {
      setGroupQuiz(quiz);
      setView(View.GROUP_QUIZ_RESULTS);
  };

  const resetApp = () => {
    setView(View.MAIN);
    setStudentName('');
    setSelectedTopics([]);
    setQuizResult(null);
    setGroupQuiz(null);
    setIsOrganizer(false);
    setParticipantId('');
  };

  const renderContent = () => {
    switch (view) {
      case View.QUIZ:
      case View.CERTIFICATE:
        return (
          <QuizFlow
            initialView={view}
            studentName={studentName}
            selectedTopics={selectedTopics}
            quizConfig={soloQuizConfig}
            onQuizComplete={showCertificate}
            quizResult={quizResult}
            onReset={resetApp}
          />
        );
      case View.GROUP_QUIZ_LOBBY:
      case View.GROUP_QUIZ:
      case View.GROUP_QUIZ_RESULTS:
          return (
              <GroupQuizFlow
                  initialView={view}
                  groupQuiz={groupQuiz!}
                  participantId={participantId}
                  isOrganizer={isOrganizer}
                  onQuizStart={startGroupQuiz}
                  onQuizComplete={showGroupQuizResults}
                  onReset={resetApp}
                  onGoBack={goToMainView}
              />
          );
      case View.MAIN:
      default:
        return <MainView onStartSoloQuiz={startSoloQuiz} onStartGroupQuizLobby={showGroupQuizLobby} />;
    }
  };

  return (
    <Layout>
        {renderContent()}
    </Layout>
  );
};

export default App;
