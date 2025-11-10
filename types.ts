import React from 'react';

export interface Indicator {
  name: string;
  isSupplement?: boolean;
}

export interface SubTopic {
  name: string;
  indicators: Indicator[];
  isSupplement?: boolean;
}

export interface Topic {
  name: string;
  isSupplement?: boolean;
  indicators?: Indicator[];
  subTopics?: SubTopic[];
}

export interface Category {
  name: string;
  icon: React.ReactNode;
  topics: Topic[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface SoloQuizConfig {
    questionCount: number;
    timerEnabled: boolean;
    timeLimit: number; // in minutes
    categories: string[];
    syllabusLevel: 'core' | 'extended';
    subject: 'physics' | 'biology';
    seed?: number;
}


export interface QuizResult {
  correctAnswers: number;
  incorrectAnswers: number;
  totalQuestions: number;
  rank?: number;
  error?: boolean;
  certificateData?: CertificateData;
  improvementReport?: SoloImprovementReport;
  categories?: string[];
  isGroupChallenge?: boolean;
  subject?: 'physics' | 'biology';
}

export interface CertificateData {
    summary: string;
}

export interface SoloImprovementReport {
    improvementAreas: string[];
    motivationalMessage: string;
}

export interface RevisionPoint {
    description: string;
    formula?: string;
    symbolExplanation?: string;
    siUnit?: string;
    tableData?: {
        headers: string[];
        rows: string[][];
    };
}

export interface RevisionNote {
    subTopicHeading: string;
    points: RevisionPoint[];
}


export enum View {
  MAIN = 'main',
  QUIZ = 'quiz',
  CERTIFICATE = 'certificate',
}