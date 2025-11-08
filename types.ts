import React from 'react';

export interface Indicator {
  name: string;
  isSupplement?: boolean;
}

export interface SubTopic {
  name: string;
  indicators: Indicator[];
}

export interface Topic {
  name: string;
  indicators?: Indicator[];
  subTopics?: SubTopic[];
}

export interface Category {
  name: string;
  icon: React.ReactNode;
  topics: Topic[];
}

export interface Concept {
    name: string;
    definition: string;
    formula: string;
    symbolExplanation: string;
    siUnit: string;
    example: string;
    tableData?: {
        headers: string[];
        rows: string[][];
    };
}

export interface TopicDetails {
  concepts: Concept[];
}


export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface QuizResult {
  correctAnswers: number;
  incorrectAnswers: number;
  totalQuestions: number;
  rank?: number;
  error?: boolean;
}

export interface CertificateData {
    summary: string;
    improvementAreas: string;
}

export interface SoloImprovementReport {
    improvementAreas: string[];
    motivationalMessage: string;
}

export interface IndividualFeedback {
    participantName: string;
    feedback: string;
}

export interface GroupQuizReport {
    groupSummary: string;
    improvementAreas: string[];
    individualFeedback: IndividualFeedback[];
}


export enum View {
  MAIN = 'main',
  QUIZ = 'quiz',
  CERTIFICATE = 'certificate',
  GROUP_QUIZ_HOME = 'group_quiz_home',
  GROUP_QUIZ_LOBBY = 'group_quiz_lobby',
  GROUP_QUIZ = 'group_quiz',
  GROUP_QUIZ_RESULTS = 'group_quiz_results',
}

// Types for Group Quiz
export interface GroupQuizConfig {
    title: string;
    categories: string[];
    questionCount: number;
    timeLimit: number; // in minutes
}

export interface Participant {
    id: string;
    name: string;
    score: number;
    isFinished: boolean;
}

export interface GroupQuiz {
    code: string;
    organizerName: string;
    config: GroupQuizConfig;
    questions: QuizQuestion[];
    participants: Participant[];
    status: 'lobby' | 'inprogress' | 'finished';
    startTime?: number;
}

// Types for Quick Revision
export interface RevisionPoint {
    description: string;
    formula: string;
    symbolExplanation?: string;
    siUnit: string;
    tableData?: {
        headers: string[];
        rows: string[][];
    };
}

export interface RevisionNote {
    subTopicHeading: string;
    points: RevisionPoint[];
}