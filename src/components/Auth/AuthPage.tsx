import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { FileText, Sparkles, Target, TrendingUp } from 'lucide-react';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="relative z-10 w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Branding */}
        <div className="text-white space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold leading-tight">
              Build Your Perfect
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                ATS Resume
              </span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Beat the ATS, impress recruiters, and land your dream job with our AI-powered resume builder.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <Target className="w-8 h-8 text-yellow-300 mb-3" />
              <h3 className="font-semibold text-lg mb-2">ATS Optimized</h3>
              <p className="text-white/80 text-sm">Keywords and format optimized for Applicant Tracking Systems</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <Sparkles className="w-8 h-8 text-yellow-300 mb-3" />
              <h3 className="font-semibold text-lg mb-2">AI-Powered</h3>
              <p className="text-white/80 text-sm">Smart suggestions for bullet points and professional summaries</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <FileText className="w-8 h-8 text-yellow-300 mb-3" />
              <h3 className="font-semibold text-lg mb-2">Professional</h3>
              <p className="text-white/80 text-sm">Modern templates designed by recruitment experts</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <TrendingUp className="w-8 h-8 text-yellow-300 mb-3" />
              <h3 className="font-semibold text-lg mb-2">Results-Driven</h3>
              <p className="text-white/80 text-sm">Focus on achievements and quantifiable results</p>
            </div>
          </div>
        </div>

        {/* Right side - Auth Form */}
        <div className="flex justify-center">
          {isLogin ? (
            <LoginForm onToggleMode={toggleMode} />
          ) : (
            <SignupForm onToggleMode={toggleMode} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;