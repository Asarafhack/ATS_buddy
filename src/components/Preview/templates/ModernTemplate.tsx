import React from 'react';
import { ResumeData } from '../../../types/resume';
import { Mail, Phone, MapPin, Linkedin, Globe, Calendar } from 'lucide-react';

interface TemplateProps {
  resume: ResumeData;
  settings?: any;
}

const ModernTemplate: React.FC<TemplateProps> = ({ resume, settings }) => {
  const primaryColor = settings?.colors?.primary || '#2563eb';
  const secondaryColor = settings?.colors?.secondary || '#1e40af';
  const margins = settings?.spacing?.margins || 20;

  return (
    <div className="max-w-4xl mx-auto bg-white" style={{ padding: `${margins}px` }}>
      {/* Header */}
      <div className="border-b-2 pb-6 mb-8" style={{ borderColor: primaryColor }}>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {resume.personalInfo.fullName}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-gray-600">
          {resume.personalInfo.email && (
            <div className="flex items-center space-x-1">
              <Mail className="w-4 h-4" />
              <span>{resume.personalInfo.email}</span>
            </div>
          )}
          {resume.personalInfo.phone && (
            <div className="flex items-center space-x-1">
              <Phone className="w-4 h-4" />
              <span>{resume.personalInfo.phone}</span>
            </div>
          )}
          {resume.personalInfo.location && (
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{resume.personalInfo.location}</span>
            </div>
          )}
          {resume.personalInfo.linkedin && (
            <div className="flex items-center space-x-1">
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </div>
          )}
          {resume.personalInfo.website && (
            <div className="flex items-center space-x-1">
              <Globe className="w-4 h-4" />
              <span>Portfolio</span>
            </div>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {resume.professionalSummary && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2" style={{ color: primaryColor }}>
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {resume.professionalSummary}
          </p>
        </div>
      )}

      {/* Experience */}
      {resume.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2" style={{ color: primaryColor }}>
            Professional Experience
          </h2>
          <div className="space-y-6">
            {resume.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{exp.position}</h3>
                    <p className="text-lg font-medium" style={{ color: secondaryColor }}>{exp.company}</p>
                    <p className="text-gray-600">{exp.location}</p>
                  </div>
                  <div className="text-right text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                    </div>
                  </div>
                </div>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  {exp.description.map((bullet, index) => (
                    <li key={index}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {resume.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2" style={{ color: primaryColor }}>
            Education
          </h2>
          <div className="space-y-4">
            {resume.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {edu.degree} in {edu.field}
                  </h3>
                  <p className="font-medium" style={{ color: secondaryColor }}>{edu.institution}</p>
                  {edu.gpa && <p className="text-gray-600">GPA: {edu.gpa}</p>}
                  {edu.honors && <p className="text-gray-600">{edu.honors}</p>}
                </div>
                <div className="text-gray-600">
                  {edu.startDate} - {edu.endDate}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {resume.skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2" style={{ color: primaryColor }}>
            Skills & Competencies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(
              resume.skills.reduce((acc, skill) => {
                if (!acc[skill.category]) acc[skill.category] = [];
                acc[skill.category].push(skill);
                return acc;
              }, {} as Record<string, typeof resume.skills>)
            ).map(([category, skills]) => (
              <div key={category}>
                <h3 className="font-semibold text-gray-900 mb-2">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span key={skill.id} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {resume.projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2" style={{ color: primaryColor }}>
            Projects
          </h2>
          <div className="space-y-4">
            {resume.projects.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                  <span className="text-gray-600 text-sm">
                    {project.startDate} - {project.endDate}
                  </span>
                </div>
                <p className="text-gray-700 mb-2">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="px-2 py-1 rounded text-sm text-white" style={{ backgroundColor: secondaryColor }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {resume.certifications.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2" style={{ color: primaryColor }}>
            Certifications
          </h2>
          <div className="space-y-3">
            {resume.certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                  <p style={{ color: secondaryColor }}>{cert.issuer}</p>
                  {cert.credentialId && (
                    <p className="text-gray-600 text-sm">ID: {cert.credentialId}</p>
                  )}
                </div>
                <div className="text-gray-600 text-sm">
                  {cert.date}
                  {cert.expiryDate && ` - ${cert.expiryDate}`}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ModernTemplate;