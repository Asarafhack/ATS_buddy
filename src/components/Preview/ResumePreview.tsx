import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../../contexts/ResumeContext';
import Header from '../Dashboard/Header';
import ModernTemplate from './templates/ModernTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import ExecutiveTemplate from './templates/ExecutiveTemplate';
import { ArrowLeft, Download, Share2, Edit, Palette } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import toast from 'react-hot-toast';

const ResumePreview: React.FC = () => {
  const navigate = useNavigate();
  const { currentResume, selectedTemplate, templateSettings } = useResume();
  const resumeRef = useRef<HTMLDivElement>(null);

  const downloadPDF = async () => {
    if (!resumeRef.current || !currentResume) return;

    try {
      toast.loading('Generating PDF...', { id: 'pdf-generation' });
      
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${currentResume.personalInfo.fullName || 'Resume'}.pdf`);
      toast.success('Resume downloaded successfully!', { id: 'pdf-generation' });
    } catch (error) {
      toast.error('Failed to download resume. Please try again.', { id: 'pdf-generation' });
    }
  };

  const shareResume = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${currentResume?.personalInfo.fullName}'s Resume`,
          text: 'Check out my professional resume',
          url: window.location.href
        });
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      // Fallback: copy link to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const renderTemplate = () => {
    if (!currentResume) return null;

    const templateProps = {
      resume: currentResume,
      settings: templateSettings
    };

    switch (selectedTemplate) {
      case 'creative':
        return <CreativeTemplate {...templateProps} />;
      case 'executive':
        return <ExecutiveTemplate {...templateProps} />;
      case 'modern':
      default:
        return <ModernTemplate {...templateProps} />;
    }
  };

  if (!currentResume) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-500 via-blue-500 to-purple-600">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-12 shadow-xl border border-white/20 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Resume to Preview</h3>
            <p className="text-gray-600 mb-6">Please create a resume first.</p>
            <button
              onClick={() => navigate('/templates')}
              className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200"
            >
              Create Resume
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 via-blue-500 to-purple-600">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Action Bar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/builder')}
              className="flex items-center space-x-2 px-4 py-2 bg-white/90 backdrop-blur-lg text-gray-700 rounded-lg hover:bg-white transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Builder</span>
            </button>
            <div>
              <h1 className="text-3xl font-bold text-white">Resume Preview</h1>
              <p className="text-white/80">
                {selectedTemplate?.charAt(0).toUpperCase() + selectedTemplate?.slice(1)} Template
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate('/builder')}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <Edit className="w-4 h-4" />
              <span>Edit</span>
            </button>
            
            <button
              onClick={() => navigate('/templates')}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
            >
              <Palette className="w-4 h-4" />
              <span>Change Template</span>
            </button>
            
            <button
              onClick={shareResume}
              className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
            
            <button
              onClick={downloadPDF}
              className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200"
            >
              <Download className="w-5 h-5" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>

        {/* Resume Preview */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div 
            ref={resumeRef} 
            className="bg-white"
            style={{
              fontFamily: templateSettings?.font || 'Inter, sans-serif',
              lineHeight: templateSettings?.spacing?.lineHeight || 1.5
            }}
          >
            {renderTemplate()}
          </div>
        </div>

        {/* Template Info */}
        <div className="mt-8 bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Template Information</h3>
              <p className="text-gray-600">
                Using {selectedTemplate?.charAt(0).toUpperCase() + selectedTemplate?.slice(1)} template with custom styling
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <p className="text-sm text-gray-500">ATS Score</p>
                <p className="text-2xl font-bold text-green-600">95%</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Sections</p>
                <p className="text-2xl font-bold text-blue-600">
                  {[
                    currentResume.personalInfo.fullName && 'Personal',
                    currentResume.professionalSummary && 'Summary',
                    currentResume.experience.length > 0 && 'Experience',
                    currentResume.education.length > 0 && 'Education',
                    currentResume.skills.length > 0 && 'Skills',
                    currentResume.projects.length > 0 && 'Projects',
                    currentResume.certifications.length > 0 && 'Certifications'
                  ].filter(Boolean).length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;