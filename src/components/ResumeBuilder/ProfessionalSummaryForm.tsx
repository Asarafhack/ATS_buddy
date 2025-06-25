import React from 'react';
import { FileText, Sparkles } from 'lucide-react';

interface ProfessionalSummaryFormProps {
  summary: string;
  onChange: (summary: string) => void;
  onAIGenerate: () => void;
  isGenerating: boolean;
}

const ProfessionalSummaryForm: React.FC<ProfessionalSummaryFormProps> = ({ 
  summary, 
  onChange, 
  onAIGenerate, 
  isGenerating 
}) => {
  return (
    <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
          <FileText className="w-6 h-6 text-green-600" />
          <span>Professional Summary</span>
        </h3>
        <button
          onClick={onAIGenerate}
          disabled={isGenerating}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 disabled:opacity-50"
        >
          <Sparkles className="w-4 h-4" />
          <span>{isGenerating ? 'Generating...' : 'AI Generate'}</span>
        </button>
      </div>

      <textarea
        value={summary}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write a compelling professional summary that highlights your key qualifications, experience, and career objectives. This should be 3-4 sentences that capture your professional brand."
        className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
      />
      
      <div className="mt-2 text-sm text-gray-500">
        {summary.length}/500 characters
      </div>
    </div>
  );
};

export default ProfessionalSummaryForm;