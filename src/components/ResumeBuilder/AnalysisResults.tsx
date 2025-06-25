import React from 'react';
import { 
  CheckCircle, 
  AlertCircle, 
  Target, 
  Edit3, 
  User, 
  FileText, 
  Award,
  TrendingUp,
  Download
} from 'lucide-react';

interface AnalysisData {
  missingKeywords: string[];
  rewrittenBullets: { original: string; improved: string }[];
  professionalSummary: string;
  resumeStructure: string[];
  finalResume: string;
  recommendations: string[];
  atsScore: number;
}

interface AnalysisResultsProps {
  data: AnalysisData;
  onSave: () => void;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ data, onSave }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-8">
      {/* ATS Score */}
      <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
            <TrendingUp className="w-6 h-6 text-purple-600" />
            <span>ATS Compatibility Score</span>
          </h3>
          <div className={`px-4 py-2 rounded-full font-bold text-2xl ${getScoreColor(data.atsScore)}`}>
            {data.atsScore}%
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full transition-all duration-1000"
            style={{ width: `${data.atsScore}%` }}
          ></div>
        </div>
      </div>

      {/* Missing Keywords */}
      <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
        <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
          <Target className="w-6 h-6 text-red-500" />
          <span>Missing Keywords</span>
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {data.missingKeywords.map((keyword, index) => (
            <div key={index} className="bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-red-700 font-medium">
              {keyword}
            </div>
          ))}
        </div>
      </div>

      {/* Rewritten Bullet Points */}
      <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
          <Edit3 className="w-6 h-6 text-blue-500" />
          <span>Improved Bullet Points</span>
        </h3>
        <div className="space-y-6">
          {data.rewrittenBullets.map((bullet, index) => (
            <div key={index} className="border-l-4 border-gradient-to-b from-purple-600 to-pink-600 pl-4">
              <div className="mb-3">
                <h4 className="font-semibold text-gray-700 mb-2 flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <span>Original:</span>
                </h4>
                <p className="text-gray-600 bg-red-50 p-3 rounded-lg">{bullet.original}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-2 flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Improved:</span>
                </h4>
                <p className="text-gray-800 bg-green-50 p-3 rounded-lg font-medium">{bullet.improved}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Professional Summary */}
      <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
        <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
          <User className="w-6 h-6 text-green-500" />
          <span>Updated Professional Summary</span>
        </h3>
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
          <p className="text-gray-800 leading-relaxed font-medium">{data.professionalSummary}</p>
        </div>
      </div>

      {/* Resume Structure */}
      <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
        <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
          <FileText className="w-6 h-6 text-purple-500" />
          <span>Recommended Structure</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.resumeStructure.map((section, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
              <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                {index + 1}
              </div>
              <span className="font-medium text-gray-800">{section}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
        <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
          <Award className="w-6 h-6 text-yellow-500" />
          <span>Recommendations</span>
        </h3>
        <div className="space-y-3">
          {data.recommendations.map((rec, index) => (
            <div key={index} className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="bg-yellow-500 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">
                {index + 1}
              </div>
              <p className="text-gray-800 font-medium">{rec}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Final Resume */}
      <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
            <Download className="w-6 h-6 text-indigo-500" />
            <span>Final Optimized Resume</span>
          </h3>
          <div className="flex space-x-3">
            <button
              onClick={() => copyToClipboard(data.finalResume)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
            >
              Copy Text
            </button>
            <button
              onClick={onSave}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
            >
              Save Resume
            </button>
          </div>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg border-2 border-dashed border-gray-300">
          <pre className="whitespace-pre-wrap text-gray-800 font-mono text-sm leading-relaxed">
            {data.finalResume}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;