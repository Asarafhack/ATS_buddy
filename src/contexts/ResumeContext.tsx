import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ResumeData, ATSAnalysis } from '../types/resume';

interface TemplateSettings {
  colors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
  font?: string;
  layout?: string;
  spacing?: {
    sections: number;
    lineHeight: number;
    margins: number;
  };
}

interface ResumeContextType {
  currentResume: ResumeData | null;
  setCurrentResume: (resume: ResumeData | null) => void;
  selectedTemplate: string | null;
  setSelectedTemplate: (template: string) => void;
  templateSettings: TemplateSettings;
  setTemplateSettings: (settings: TemplateSettings) => void;
  atsAnalysis: ATSAnalysis | null;
  setATSAnalysis: (analysis: ATSAnalysis | null) => void;
  jobDescription: string;
  setJobDescription: (desc: string) => void;
  isAnalyzing: boolean;
  setIsAnalyzing: (analyzing: boolean) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};

interface ResumeProviderProps {
  children: ReactNode;
}

export const ResumeProvider: React.FC<ResumeProviderProps> = ({ children }) => {
  const [currentResume, setCurrentResume] = useState<ResumeData | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>('modern');
  const [templateSettings, setTemplateSettings] = useState<TemplateSettings>({
    colors: {
      primary: '#2563eb',
      secondary: '#1e40af',
      accent: '#3b82f6'
    },
    font: 'Inter, sans-serif',
    layout: 'single',
    spacing: {
      sections: 24,
      lineHeight: 1.5,
      margins: 20
    }
  });
  const [atsAnalysis, setATSAnalysis] = useState<ATSAnalysis | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const value = {
    currentResume,
    setCurrentResume,
    selectedTemplate,
    setSelectedTemplate,
    templateSettings,
    setTemplateSettings,
    atsAnalysis,
    setATSAnalysis,
    jobDescription,
    setJobDescription,
    isAnalyzing,
    setIsAnalyzing
  };

  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  );
};