import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../../contexts/ResumeContext';
import Header from '../Dashboard/Header';
import { ArrowLeft, Check, Palette, Layout, FileText, Star, Crown, Zap } from 'lucide-react';
import toast from 'react-hot-toast';

const templates = [
  {
    id: 'modern',
    name: 'Modern Professional',
    description: 'Clean, minimalist design perfect for tech and corporate roles',
    preview: '/api/placeholder/300/400',
    category: 'Professional',
    isPremium: false,
    features: ['ATS Optimized', 'Single Column', 'Clean Typography'],
    colors: ['#2563eb', '#1e40af', '#1d4ed8']
  },
  {
    id: 'creative',
    name: 'Creative Designer',
    description: 'Eye-catching design for creative professionals and designers',
    preview: '/api/placeholder/300/400',
    category: 'Creative',
    isPremium: true,
    features: ['Two Column', 'Color Accents', 'Visual Elements'],
    colors: ['#7c3aed', '#8b5cf6', '#a855f7']
  },
  {
    id: 'executive',
    name: 'Executive Elite',
    description: 'Sophisticated template for senior management positions',
    preview: '/api/placeholder/300/400',
    category: 'Executive',
    isPremium: true,
    features: ['Premium Layout', 'Executive Style', 'Professional Branding'],
    colors: ['#059669', '#10b981', '#34d399']
  },
  {
    id: 'technical',
    name: 'Tech Specialist',
    description: 'Optimized for software developers and technical roles',
    preview: '/api/placeholder/300/400',
    category: 'Technical',
    isPremium: false,
    features: ['Code-Friendly', 'Skills Showcase', 'Project Highlights'],
    colors: ['#dc2626', '#ef4444', '#f87171']
  },
  {
    id: 'academic',
    name: 'Academic Scholar',
    description: 'Perfect for researchers, professors, and academic positions',
    preview: '/api/placeholder/300/400',
    category: 'Academic',
    isPremium: false,
    features: ['Publication Ready', 'Research Focus', 'Academic Format'],
    colors: ['#0891b2', '#06b6d4', '#22d3ee']
  },
  {
    id: 'startup',
    name: 'Startup Innovator',
    description: 'Dynamic design for startup environments and entrepreneurs',
    preview: '/api/placeholder/300/400',
    category: 'Startup',
    isPremium: true,
    features: ['Innovation Focus', 'Dynamic Layout', 'Growth Metrics'],
    colors: ['#ea580c', '#f97316', '#fb923c']
  }
];

const TemplateSelector: React.FC = () => {
  const navigate = useNavigate();
  const { setSelectedTemplate, selectedTemplate } = useResume();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTemplateId, setSelectedTemplateId] = useState(selectedTemplate || 'modern');

  const categories = ['All', 'Professional', 'Creative', 'Executive', 'Technical', 'Academic', 'Startup'];

  const filteredTemplates = selectedCategory === 'All' 
    ? templates 
    : templates.filter(template => template.category === selectedCategory);

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplateId(templateId);
  };

  const handleContinue = () => {
    setSelectedTemplate(selectedTemplateId);
    toast.success('Template selected successfully!');
    navigate('/builder');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center space-x-2 px-4 py-2 bg-white/90 backdrop-blur-lg text-gray-700 rounded-lg hover:bg-white transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </button>
            <div>
              <h1 className="text-3xl font-bold text-white">Choose Your Template</h1>
              <p className="text-white/80">Select a professional template that matches your career goals</p>
            </div>
          </div>
          
          <button
            onClick={handleContinue}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200"
          >
            <Check className="w-5 h-5" />
            <span>Continue with Template</span>
          </button>
        </div>

        {/* Category Filter */}
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Palette className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-800">Template Categories</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className={`bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-xl border-2 transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                selectedTemplateId === template.id
                  ? 'border-purple-500 ring-4 ring-purple-200'
                  : 'border-white/20 hover:border-purple-300'
              }`}
              onClick={() => handleTemplateSelect(template.id)}
            >
              {/* Template Preview */}
              <div className="relative mb-4">
                <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
                  <div className="p-4 space-y-2">
                    <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-2 bg-gray-300 rounded w-1/2"></div>
                    <div className="space-y-1 mt-4">
                      <div className="h-2 bg-gray-300 rounded"></div>
                      <div className="h-2 bg-gray-300 rounded w-5/6"></div>
                      <div className="h-2 bg-gray-300 rounded w-4/6"></div>
                    </div>
                    <div className="mt-4 space-y-1">
                      <div className="h-2 bg-gray-300 rounded w-2/3"></div>
                      <div className="h-2 bg-gray-300 rounded w-3/4"></div>
                    </div>
                  </div>
                </div>
                
                {/* Premium Badge */}
                {template.isPremium && (
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                    <Crown className="w-3 h-3" />
                    <span>PRO</span>
                  </div>
                )}

                {/* Selected Indicator */}
                {selectedTemplateId === template.id && (
                  <div className="absolute top-2 left-2 bg-purple-600 text-white p-2 rounded-full">
                    <Check className="w-4 h-4" />
                  </div>
                )}
              </div>

              {/* Template Info */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-800">{template.name}</h3>
                  <div className="flex items-center space-x-1">
                    {template.isPremium ? (
                      <Crown className="w-4 h-4 text-yellow-500" />
                    ) : (
                      <Star className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm">{template.description}</p>
                
                {/* Features */}
                <div className="flex flex-wrap gap-2">
                  {template.features.map((feature, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Color Palette */}
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">Colors:</span>
                  <div className="flex space-x-1">
                    {template.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: color }}
                      ></div>
                    ))}
                  </div>
                </div>

                {/* Category Badge */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                    {template.category}
                  </span>
                  {template.isPremium && (
                    <span className="text-xs text-orange-600 font-medium">Premium Template</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Template Customization Preview */}
        <div className="mt-12 bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
          <div className="flex items-center space-x-2 mb-4">
            <Layout className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-semibold text-gray-800">Template Customization</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
              <Palette className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-800 mb-1">Color Themes</h4>
              <p className="text-sm text-gray-600">Customize colors to match your personal brand</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
              <FileText className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-800 mb-1">Layout Options</h4>
              <p className="text-sm text-gray-600">Choose between single or two-column layouts</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
              <Zap className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-800 mb-1">AI Enhancement</h4>
              <p className="text-sm text-gray-600">AI-powered content suggestions and optimization</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;