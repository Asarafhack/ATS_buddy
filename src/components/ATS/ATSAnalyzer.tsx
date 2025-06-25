import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../../contexts/ResumeContext';
import { analyzeResumeATS } from '../../services/atsService';
import Header from '../Dashboard/Header';
import { Target, FileText, TrendingUp, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

const ATSAnalyzer: React.FC = () => {
  const navigate = useNavigate();
  const { currentResume, atsAnalysis, setATSAnalysis, jobDescription, setJobDescription, isAnalyzing, setIsAnalyzing } = useResume();

  const handleAnalyze = async () => {
    if (!currentResume || !jobDescription.trim()) {
      toast.error('Please create a resume and provide a job description first.');
      return;
    }

    setIsAnalyzing(true);
    try {
      const analysis = await analyzeResumeATS(currentResume, jobDescription);
      setATSAnalysis(analysis);
      toast.success('ATS analysis completed!');
    } catch (error) {
      toast.error('Failed to analyze resume. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getScoreGradient = (score: number) => {
    if (score >= 80) return 'from-green-500 to-green-600';
    if (score >= 60) return 'from-yellow-500 to-yellow-600';
    return 'from-red-500 to-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-red-500 to-pink-600">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={() => navigate('/builder')}
            className="flex items-center space-x-2 px-4 py-2 bg-white/90 backdrop-blur-lg text-gray-700 rounded-lg hover:bg-white transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Builder</span>
          </button>
          <h1 className="text-3xl font-bold text-white">ATS Resume Analyzer</h1>
        </div>

        {!currentResume ? (
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-12 shadow-xl border border-white/20 text-center">
            <FileText className="w-16 h-16 text-orange-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Resume Found</h3>
            <p className="text-gray-600 mb-6">Please create a resume first before analyzing it.</p>
            <button
              onClick={() => navigate('/builder')}
              className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-orange-700 hover:to-red-700 transform hover:scale-105 transition-all duration-200"
            >
              Create Resume
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Job Description Input */}
            <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                <Target className="w-6 h-6 text-orange-600" />
                <span>Job Description</span>
              </h3>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the complete job description here to analyze how well your resume matches..."
                className="w-full h-48 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
              />
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-500">{jobDescription.length} characters</span>
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !jobDescription.trim()}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg font-semibold hover:from-orange-700 hover:to-red-700 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <Target className="w-5 h-5" />
                  <span>{isAnalyzing ? 'Analyzing...' : 'Analyze Resume'}</span>
                </button>
              </div>
            </div>

            {/* Analysis Results */}
            {atsAnalysis && (
              <div className="space-y-8">
                {/* ATS Score */}
                <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
                      <TrendingUp className="w-6 h-6 text-blue-600" />
                      <span>ATS Compatibility Score</span>
                    </h3>
                    <div className={`px-6 py-3 rounded-full font-bold text-3xl ${getScoreColor(atsAnalysis.score)}`}>
                      {atsAnalysis.score}%
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                    <div 
                      className={`bg-gradient-to-r ${getScoreGradient(atsAnalysis.score)} h-4 rounded-full transition-all duration-1000`}
                      style={{ width: `${atsAnalysis.score}%` }}
                    ></div>
                  </div>
                  <p className="text-gray-600">
                    {atsAnalysis.score >= 80 ? 'Excellent! Your resume is highly optimized for ATS systems.' :
                     atsAnalysis.score >= 60 ? 'Good! Your resume has decent ATS compatibility with room for improvement.' :
                     'Needs improvement. Your resume may not pass through ATS filters effectively.'}
                  </p>
                </div>

                {/* Missing Keywords */}
                <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
                    <AlertCircle className="w-6 h-6 text-red-500" />
                    <span>Missing Keywords ({atsAnalysis.missingKeywords.length})</span>
                  </h3>
                  {atsAnalysis.missingKeywords.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {atsAnalysis.missingKeywords.map((keyword, index) => (
                        <div key={index} className="bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-red-700 font-medium text-center">
                          {keyword}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-green-600 font-medium">Great! No critical keywords are missing from your resume.</p>
                  )}
                </div>

                {/* Strengths */}
                <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                    <span>Resume Strengths</span>
                  </h3>
                  <div className="space-y-3">
                    {atsAnalysis.strengths.map((strength, index) => (
                      <div key={index} className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <p className="text-gray-800 font-medium">{strength}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Suggestions */}
                <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
                    <Target className="w-6 h-6 text-blue-500" />
                    <span>Improvement Suggestions</span>
                  </h3>
                  <div className="space-y-3">
                    {atsAnalysis.suggestions.map((suggestion, index) => (
                      <div key={index} className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">
                          {index + 1}
                        </div>
                        <p className="text-gray-800 font-medium">{suggestion}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Improvements */}
                <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
                    <TrendingUp className="w-6 h-6 text-purple-500" />
                    <span>Specific Improvements</span>
                  </h3>
                  <div className="space-y-3">
                    {atsAnalysis.improvements.map((improvement, index) => (
                      <div key={index} className="flex items-start space-x-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                        <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">
                          {index + 1}
                        </div>
                        <p className="text-gray-800 font-medium">{improvement}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ATSAnalyzer;