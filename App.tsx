
import React, { useState } from 'react';
import Layout from './components/Layout';
import MainView from './components/MainView';
import QuizFlow from './components/QuizFlow';
import GroupQuizFlow from './components/GroupQuizFlow';
import type { QuizResult, GroupQuiz, GroupQuizConfig } from './types';
import { View } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<View>(View.MAIN);
  const [studentName, setStudentName] = useState<string>('');
  
  // Solo Quiz State
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  // Group Quiz State
  const [groupQuiz, setGroupQuiz] = useState<GroupQuiz | null>(null);
  const [isOrganizer, setIsOrganizer] = useState<boolean>(false);
  const [participantId, setParticipantId] = useState<string>('');


  const startSoloQuiz = (name: string, topics: string[]) => {
    setStudentName(name);
    setSelectedTopics(topics);
    setQuizResult(null);
    setView(View.QUIZ);
  };

  const showCertificate = (result: QuizResult) => {
    setQuizResult(result);
    setView(View.CERTIFICATE);
  };

  // FIX: The onQuizStart prop expects a function with a single `quiz` argument.
  // The participantId and isOrganizer states are already set when the user enters the lobby,
  // so they don't need to be set again when the quiz starts.
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