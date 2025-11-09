
import React, { useState } from 'react';
import Layout from './components/Layout';
import MainView from './components/MainView';
import QuizFlow from './components/QuizFlow';
import GroupQuizFlow from './components/GroupQuizFlow';
import type { QuizResult, SoloQuizConfig, GroupChallenge } from './types';
import { View } from './types';
import { getCertificateData, getSoloImprovementReport } from './services/geminiService';

const App: React.FC = () => {
  const [view, setView] = useState<View>(View.MAIN);
  const [studentName, setStudentName] = useState<string>('');
  
  // Solo Quiz State
  const [quizConfig, setQuizConfig] = useState<SoloQuizConfig | null>(null);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  // Group Challenge State
  const [groupChallenge, setGroupChallenge] = useState<GroupChallenge | null>(null);
  const [currentUser, setCurrentUser] = useState<{ name: string; role: 'ORGANIZER' | 'PARTICIPANT' } | null>(null);

  const startSoloQuiz = (name: string, config: SoloQuizConfig) => {
    setStudentName(name);
    setQuizConfig(config);
    setQuizResult(null);
    setView(View.QUIZ);
  };

  const handleCreateGroupChallenge = (organizerName: string, title: string, config: SoloQuizConfig) => {
    const newChallenge: GroupChallenge = {
        id: config.seed!.toString() + '-' + Math.random().toString(36).substr(2, 5), // simplified for this example
        title,
        organizerName,
        config,
        createdAt: Date.now(),
        status: 'LOBBY',
        participants: [],
    };
    localStorage.setItem(`group-challenge-${newChallenge.id}`, JSON.stringify(newChallenge));
    setGroupChallenge(newChallenge);
    setCurrentUser({ name: organizerName, role: 'ORGANIZER' });
    setView(View.GROUP_LOBBY);
};

  const handleJoinGroupChallenge = (participantName: string, code: string): string | null => {
      const challengeStr = localStorage.getItem(`group-challenge-${code}`);
      if (!challengeStr) {
          return "Challenge not found. Please check the code.";
      }
      const challenge: GroupChallenge = JSON.parse(challengeStr);

      if (Date.now() - challenge.createdAt > 15 * 60 * 1000) {
          return "This challenge code has expired (older than 15 minutes).";
      }

      if (challenge.participants.length >= 15) {
          return "This challenge is full (maximum 15 participants).";
      }
      
      if (challenge.participants.some(p => p.name.toLowerCase() === participantName.toLowerCase())) {
          return `A participant with the name "${participantName}" has already joined.`;
      }

      if (challenge.status !== 'LOBBY') {
        return "This challenge has already started and cannot be joined.";
      }

      challenge.participants.push({ name: participantName, status: 'JOINED', score: null });
      localStorage.setItem(`group-challenge-${code}`, JSON.stringify(challenge));

      setGroupChallenge(challenge);
      setCurrentUser({ name: participantName, role: 'PARTICIPANT' });
      setView(View.GROUP_LOBBY);
      return null; // Success
  };

  const showSoloResults = async (result: QuizResult) => {
    if (!quizConfig) return;
    const accuracy = result.totalQuestions > 0 ? (result.correctAnswers / result.totalQuestions) * 100 : 0;
    const hasCertificate = accuracy >= 61 && !result.error;

    try {
        if (hasCertificate) {
            const data = await getCertificateData(studentName, result.correctAnswers, result.totalQuestions, quizConfig.categories);
            result.certificateData = data;
        } else if (!result.error) {
            const report = await getSoloImprovementReport(studentName, result.correctAnswers, result.totalQuestions, quizConfig.categories);
            result.improvementReport = report;
        }
    } catch (e) {
        console.error("Failed to fetch certificate/report data:", e);
    }
    
    result.categories = quizConfig.categories;
    setQuizResult(result);
    setView(View.CERTIFICATE);
  };

  const resetApp = () => {
    setView(View.MAIN);
    setStudentName('');
    setQuizConfig(null);
    setQuizResult(null);
    setGroupChallenge(null);
    setCurrentUser(null);
  };

  const renderContent = () => {
    switch (view) {
      case View.GROUP_LOBBY:
        return (
          <GroupQuizFlow
            challenge={groupChallenge!}
            currentUser={currentUser!}
            onReset={resetApp}
          />
        )
      case View.QUIZ:
      case View.CERTIFICATE:
        return (
          <QuizFlow
            initialView={view}
            studentName={studentName}
            quizConfig={quizConfig!}
            onQuizComplete={showSoloResults}
            quizResult={quizResult}
            onReset={resetApp}
          />
        );
      case View.MAIN:
      default:
        return <MainView onStartSoloQuiz={startSoloQuiz} onCreateGroupChallenge={handleCreateGroupChallenge} onJoinGroupChallenge={handleJoinGroupChallenge}/>;
    }
  };

  return (
    <Layout>
        {renderContent()}
    </Layout>
  );
};

export default App;