import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useResume } from '../../contexts/ResumeContext';
import {
  ResumeData,
  PersonalInfo,
  Experience,
  Skill,
  Education,
  Project,
  Certification,
} from '../../types/resume';
import { saveResume, updateResume } from '../../services/resumeService';
import Header from '../Dashboard/Header';
import PersonalInfoForm from './PersonalInfoForm';
import ProfessionalSummaryForm from './ProfessionalSummaryForm';
import ExperienceForm from './ExperienceForm';
import EducationForm from './EducationForm';
import SkillsForm from './SkillsForm';
import ProjectsForm from './ProjectsForm';
import CertificationsForm from './CertificationsForm';
import TemplateCustomizer from './TemplateCustomizer';
import {
  Save,
  Eye,
  Target,
  ArrowLeft,
  ArrowRight,
  Palette,
  Bot,
} from 'lucide-react';
import toast from 'react-hot-toast';

const ResumeBuilder: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { currentResume, setCurrentResume, selectedTemplate } = useResume();

  const [activeStep, setActiveStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [showCustomizer, setShowCustomizer] = useState(false);

  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
  });

  const [professionalSummary, setProfessionalSummary] = useState('');
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);

  const steps = [
    { title: 'Personal Info', component: PersonalInfoForm, icon: '👤' },
    { title: 'Summary', component: ProfessionalSummaryForm, icon: '📝' },
    { title: 'Experience', component: ExperienceForm, icon: '💼' },
    { title: 'Education', component: EducationForm, icon: '🎓' },
    { title: 'Skills', component: SkillsForm, icon: '⚡' },
    { title: 'Projects', component: ProjectsForm, icon: '🚀' },
    { title: 'Certifications', component: CertificationsForm, icon: '🏆' },
  ];

  useEffect(() => {
    if (currentResume) {
      setPersonalInfo(currentResume.personalInfo);
      setProfessionalSummary(currentResume.professionalSummary);
      setExperiences(currentResume.experience);
      setEducation(currentResume.education);
      setSkills(currentResume.skills);
      setProjects(currentResume.projects);
      setCertifications(currentResume.certifications);
    }
  }, [currentResume]);

  const handleSave = async () => {
    if (!currentUser) return;

    setSaving(true);
    try {
      const resumeData: Omit<ResumeData, 'id' | 'createdAt' | 'updatedAt'> = {
        userId: currentUser.uid,
        personalInfo,
        professionalSummary,
        experience: experiences,
        education,
        skills,
        projects,
        certifications,
        template: selectedTemplate || 'modern',
      };

      if (currentResume?.id) {
        await updateResume(currentResume.id, resumeData);
        toast.success('Resume updated successfully!');
      } else {
        const id = await saveResume(resumeData);
        setCurrentResume({
          ...resumeData,
          id,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        toast.success('Resume saved successfully!');
      }
    } catch (error) {
      toast.error('Failed to save resume. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleAIGenerate = async () => {
    setGenerating(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const aiSummary = `Dynamic ${
        personalInfo.fullName ? personalInfo.fullName.split(' ')[0] : 'professional'
      } with expertise in ${skills.slice(0, 3).map((s) => s.name).join(', ')}. Proven track record of delivering exceptional results through innovative problem-solving, strategic thinking, and collaborative leadership. Seeking to leverage comprehensive skill set and passion for excellence to contribute to organizational success.`;

      setProfessionalSummary(aiSummary);
      toast.success('AI summary generated successfully!');
    } catch {
      toast.error('Failed to generate AI summary.');
    } finally {
      setGenerating(false);
    }
  };

  const nextStep = () => activeStep < steps.length - 1 && setActiveStep(activeStep + 1);
  const prevStep = () => activeStep > 0 && setActiveStep(activeStep - 1);

  const renderStepContent = () => {
    const StepComponent = steps[activeStep].component;
    switch (activeStep) {
      case 0:
        return <StepComponent personalInfo={personalInfo} onChange={setPersonalInfo} />;
      case 1:
        return (
          <StepComponent
            summary={professionalSummary}
            onChange={setProfessionalSummary}
            onAIGenerate={handleAIGenerate}
            isGenerating={generating}
          />
        );
      case 2:
        return <StepComponent experiences={experiences} onChange={setExperiences} />;
      case 3:
        return <StepComponent education={education} onChange={setEducation} />;
      case 4:
        return <StepComponent skills={skills} onChange={setSkills} />;
      case 5:
        return <StepComponent projects={projects} onChange={setProjects} />;
      case 6:
        return <StepComponent certifications={certifications} onChange={setCertifications} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Actions */}
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 mb-8">
          <div className="flex flex-wrap justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                <ArrowLeft size={16} />
                Dashboard
              </button>
              <h2 className="text-2xl font-bold text-gray-800">Resume Builder</h2>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                {selectedTemplate || 'Modern'} Template
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setShowCustomizer(!showCustomizer)}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                <Palette size={16} />
                Customize
              </button>
              <button
                onClick={() => navigate('/ai-assistant')}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                <Bot size={16} />
                AI Help
              </button>
              <button
                onClick={() => navigate('/analyzer')}
                className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
              >
                <Target size={16} />
                ATS Analyzer
              </button>
              <button
                onClick={() => navigate('/preview')}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <Eye size={16} />
                Preview
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                <Save size={16} />
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center gap-2">
                <button
                  onClick={() => setActiveStep(index)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                    index === activeStep
                      ? 'bg-blue-600 text-white'
                      : index < activeStep
                      ? 'bg-green-100 text-green-800 hover:bg-green-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <span className="text-lg">{step.icon}</span>
                  <span className="hidden sm:inline">{step.title}</span>
                </button>
                {index < steps.length - 1 && (
                  <div
                    className={`w-8 h-1 rounded ${
                      index < activeStep ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main content with navigation and sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
              {renderStepContent()}
            </div>
            <div className="flex justify-between">
              <button
                onClick={prevStep}
                disabled={activeStep === 0}
                className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50"
              >
                <ArrowLeft size={16} />
                Previous
              </button>
              <button
                onClick={nextStep}
                disabled={activeStep === steps.length - 1}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                Next
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {showCustomizer && (
            <div className="lg:col-span-1">
              <TemplateCustomizer />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
