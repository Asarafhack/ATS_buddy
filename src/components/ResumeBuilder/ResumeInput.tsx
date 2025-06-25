import React, { useState } from 'react';
import { FileText, Briefcase } from 'lucide-react';

interface ResumeInputProps {
  onAnalyze: (resumeText: string, jobDescription: string) => void;
  loading: boolean;
}

const ResumeInput: React.FC<ResumeInputProps> = ({ onAnalyze, loading }) => {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (resumeText.trim() && jobDescription.trim()) {
      onAnalyze(resumeText, jobDescription);
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          Resume Analysis
        </h2>
        <p className="text-gray-600">
          Paste your current resume and the job description you're targeting
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-lg font-semibold text-gray-700">
            <FileText className="w-5 h-5 text-purple-600" />
            <span>Your Current Resume</span>
          </label>
          <textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste your full resume text here..."
            className="w-full h-64 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-lg font-semibold text-gray-700">
            <Briefcase className="w-5 h-5 text-pink-600" />
            <span>Target Job Description</span>
          </label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the full job description here..."
            className="w-full h-64 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading || !resumeText.trim() || !jobDescription.trim()}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {loading ? 'Analyzing...' : 'Analyze Resume'}
        </button>
      </form>
    </div>
  );
};

export default ResumeInput;