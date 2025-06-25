import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useResume } from '../../contexts/ResumeContext';
import { getUserResumes, deleteResume } from '../../services/resumeService';
import { ResumeData } from '../../types/resume';
import Header from './Header';
import { Plus, FileText, Calendar, Edit, Trash2, Target, Eye, Users, TrendingUp, Palette, Bot, Layout } from 'lucide-react';
import toast from 'react-hot-toast';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { setCurrentResume } = useResume();
  const [resumes, setResumes] = useState<ResumeData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResumes();
  }, [currentUser]);

  const loadResumes = async () => {
    if (!currentUser) return;
    
    try {
      const userResumes = await getUserResumes(currentUser.uid);
      setResumes(userResumes);
    } catch (error) {
      toast.error('Failed to load resumes');
    } finally {
      setLoading(false);
    }
  };

  const handleEditResume = (resume: ResumeData) => {
    setCurrentResume(resume);
    navigate('/builder');
  };

  const handleDeleteResume = async (resumeId: string) => {
    if (!window.confirm('Are you sure you want to delete this resume?')) return;
    
    try {
      await deleteResume(resumeId);
      setResumes(resumes.filter(r => r.id !== resumeId));
      toast.success('Resume deleted successfully');
    } catch (error) {
      toast.error('Failed to delete resume');
    }
  };

  const handleAnalyzeResume = (resume: ResumeData) => {
    setCurrentResume(resume);
    navigate('/analyzer');
  };

  const handlePreviewResume = (resume: ResumeData) => {
    setCurrentResume(resume);
    navigate('/preview');
  };

  const createNewResume = () => {
    setCurrentResume(null);
    navigate('/templates');
  };

  const quickActions = [
    {
      title: 'Create New Resume',
      description: 'Start building your professional resume',
      icon: Plus,
      color: 'from-blue-500 to-blue-600',
      action: createNewResume
    },
    {
      title: 'Choose Template',
      description: 'Browse professional templates',
      icon: Palette,
      color: 'from-purple-500 to-purple-600',
      action: () => navigate('/templates')
    },
    {
      title: 'AI Assistant',
      description: 'Get AI help with your resume',
      icon: Bot,
      color: 'from-green-500 to-green-600',
      action: () => navigate('/ai-assistant')
    },
    {
      title: 'ATS Analyzer',
      description: 'Optimize for job applications',
      icon: Target,
      color: 'from-orange-500 to-orange-600',
      action: () => navigate('/analyzer')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-teal-600">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                Welcome to ATS Resume Builder Pro
              </h1>
              <p className="text-gray-600 text-lg">
                Create, customize, and optimize your resumes with AI-powered tools
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center">
                <FileText className="w-16 h-16 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <button
                key={index}
                onClick={action.action}
                className="bg-white/90 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white/20 hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-left"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center mb-4`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{action.title}</h3>
                <p className="text-sm text-gray-600">{action.description}</p>
              </button>
            );
          })}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/90 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-3 rounded-lg">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Total Resumes</p>
                <p className="text-2xl font-bold text-gray-800">{resumes.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/90 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">ATS Optimized</p>
                <p className="text-2xl font-bold text-gray-800">{resumes.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/90 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Success Rate</p>
                <p className="text-2xl font-bold text-gray-800">95%</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/90 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center space-x-3">
              <div className="bg-orange-100 p-3 rounded-lg">
                <Layout className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Templates</p>
                <p className="text-2xl font-bold text-gray-800">6+</p>
              </div>
            </div>
          </div>
        </div>

        {/* Resumes Grid */}
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Your Resumes</h2>
            <button
              onClick={createNewResume}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
            >
              <Plus className="w-4 h-4" />
              <span>New Resume</span>
            </button>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
              <p className="text-gray-600 mt-4">Loading your resumes...</p>
            </div>
          ) : resumes.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No resumes yet</h3>
              <p className="text-gray-500 mb-6">Create your first ATS-optimized resume to get started</p>
              <button
                onClick={createNewResume}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200"
              >
                Create Your First Resume
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resumes.map((resume) => (
                <div key={resume.id} className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-200 group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-1 group-hover:text-purple-600 transition-colors">
                        {resume.personalInfo.fullName || 'Untitled Resume'}
                      </h3>
                      <div className="flex items-center space-x-1 text-sm text-gray-500 mb-2">
                        <Calendar className="w-4 h-4" />
                        <span>Updated {resume.updatedAt.toLocaleDateString()}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                          {resume.template}
                        </span>
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                          ATS Ready
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleEditResume(resume)}
                      className="flex items-center justify-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                    
                    <button
                      onClick={() => handlePreviewResume(resume)}
                      className="flex items-center justify-center space-x-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Preview</span>
                    </button>
                    
                    <button
                      onClick={() => handleAnalyzeResume(resume)}
                      className="flex items-center justify-center space-x-1 px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-200 text-sm"
                    >
                      <Target className="w-4 h-4" />
                      <span>Analyze</span>
                    </button>
                    
                    <button
                      onClick={() => handleDeleteResume(resume.id!)}
                      className="flex items-center justify-center space-x-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;