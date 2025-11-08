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

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface SoloQuizConfig {
    questionCount: number;
    timerEnabled: boolean;
    timeLimit: number; // in minutes
    categories: string[];
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
}

export interface CertificateData {
    summary: string;
}

export interface SoloImprovementReport {
    improvementAreas: string[];
    motivationalMessage: string;
}

// FIX: Add missing RevisionPoint and RevisionNote types for QuickRevisionView.tsx
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
