
import React, { useState } from 'react';
import Layout from './components/Layout';
import MainView from './components/MainView';
import QuizFlow from './components/QuizFlow';
import GroupQuizFlow from './components/GroupQuizFlow';
import type { QuizResult, GroupQuiz, GroupQuizConfig } from './types';
import { View } from './types';

export interface SoloQuizConfig {
    questionCount: number;
    timerEnabled: boolean;
    timeLimit: number; // in minutes
}

const App: React.FC = () => {
  const [view, setView] = useState<View>(View.MAIN);
  const [studentName, setStudentName] = useState<string>('');
  
  // Solo Quiz State
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [soloQuizConfig, setSoloQuizConfig] = useState<SoloQuizConfig>({ questionCount: 15, timerEnabled: false, timeLimit: 15 });
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  // Group Quiz State
  const [groupQuiz, setGroupQuiz] = useState<GroupQuiz | null>(null);
  const [isOrganizer, setIsOrganizer] = useState<boolean>(false);
  const [participantId, setParticipantId] = useState<string>('');


  const startSoloQuiz = (name: string, topics: string[], config: SoloQuizConfig) => {
    setStudentName(name);
    setSelectedTopics(topics);
    setSoloQuizConfig(config);
    setQuizResult(null);
    setView(View.QUIZ);
  };

  const showCertificate = (result: QuizResult) => {
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