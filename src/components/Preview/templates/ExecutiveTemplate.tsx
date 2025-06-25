import React from 'react';
import { ResumeData } from '../../../types/resume';
import { Mail, Phone, MapPin, Linkedin, Globe, Calendar } from 'lucide-react';

interface TemplateProps {
  resume: ResumeData;
  settings?: any;
}

const ExecutiveTemplate: React.FC<TemplateProps> = ({ resume, settings }) => {
  const primaryColor = settings?.colors?.primary || '#059669';
  const secondaryColor = settings?.colors?.secondary || '#047857';
  const accentColor = settings?.colors?.accent || '#10b981';

  return (
    <div className="max-w-4xl mx-auto bg-white p-8">
      {/* Header with Executive Styling */}
      <div className="text-center mb-8 pb-6 border-b-4" style={{ borderColor: primaryColor }}>
        <h1 className="text-5xl font-bold text-gray-900 mb-3">
          {resume.personalInfo.fullName}
        </h1>
        <div className="flex justify-center items-center space-x-6 text-gray-600 text-lg">
          {resume.personalInfo.email && (
            <div className="flex items-center space-x-2">
              <Mail className="w-5 h-5" />
              <span>{resume.personalInfo.email}</span>
            </div>
          )}
          {resume.personalInfo.phone && (
            <div className="flex items-center space-x-2">
              <Phone className="w-5 h-5" />
              <span>{resume.personalInfo.phone}</span>
            </div>
          )}
          {resume.personalInfo.location && (
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5" />
              <span>{resume.personalInfo.location}</span>
            </div>
          )}
        </div>
        {(resume.personalInfo.linkedin || resume.personalInfo.website) && (
          <div className="flex justify-center items-center space-x-6 text-gray-600 mt-2">
            {resume.personalInfo.linkedin && (
              <div className="flex items-center space-x-2">
                <Linkedin className="w-5 h-5" />
                <span>LinkedIn Profile</span>
              </div>
            )}
            {resume.personalInfo.website && (
              <div className="flex items-center space-x-2">
                <Globe className="w-5 h-5" />
                <span>Portfolio</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Executive Summary */}
      {resume.professionalSummary && (
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center" style={{ color: primaryColor }}>
            EXECUTIVE SUMMARY
          </h2>
          <div className="bg-gray-50 p-6 rounded-lg border-l-4" style={{ borderColor: accentColor }}>
            <p className="text-gray-800 leading-relaxed text-lg font-medium">
              {resume.professionalSummary}
            </p>
          </div>
        </div>
      )}

      {/* Core Competencies */}
      {resume.skills.length > 0 && (
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center" style={{ color: primaryColor }}>
            CORE COMPETENCIES
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {resume.skills.slice(0, 12).map((skill) => (
              <div key={skill.id} className="text-center p-3 bg-gray-50 rounded-lg border">
                <span className="font-semibold text-gray-800">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Professional Experience */}
      {resume.experience.length > 0 && (
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center" style={{ color: primaryColor }}>
            PROFESSIONAL EXPERIENCE
          </h2>
          <div className="space-y-8">
            {resume.experience.map((exp) => (
              <div key={exp.id} className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{exp.position}</h3>
                    <p className="text-xl font-semibold" style={{ color: secondaryColor }}>{exp.company}</p>
                    <p className="text-gray-600 font-medium">{exp.location}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2 text-gray-600 font-medium">
                      <Calendar className="w-5 h-5" />
                      <span>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                    </div>
                  </div>
                </div>
                <div className="border-l-4 pl-6" style={{ borderColor: accentColor }}>
                  <ul className="space-y-2 text-gray-700">
                    {exp.description.map((bullet, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0" style={{ backgroundColor: accentColor }}></span>
                        <span className="font-medium">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education & Certifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {/* Education */}
        {resume.education.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ color: primaryColor }}>
              EDUCATION
            </h2>
            <div className="space-y-4">
              {resume.education.map((edu) => (
                <div key={edu.id} className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-bold text-gray-900">
                    {edu.degree} in {edu.field}
                  </h3>
                  <p className="font-semibold" style={{ color: secondaryColor }}>{edu.institution}</p>
                  <p className="text-gray-600">{edu.startDate} - {edu.endDate}</p>
                  {edu.gpa && <p className="text-gray-600">GPA: {edu.gpa}</p>}
                  {edu.honors && <p className="text-gray-600 font-medium">{edu.honors}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {resume.certifications.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ color: primaryColor }}>
              CERTIFICATIONS
            </h2>
            <div className="space-y-4">
              {resume.certifications.map((cert) => (
                <div key={cert.id} className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-bold text-gray-900">{cert.name}</h3>
                  <p className="font-semibold" style={{ color: secondaryColor }}>{cert.issuer}</p>
                  <p className="text-gray-600">{cert.date}</p>
                  {cert.credentialId && (
                    <p className="text-gray-600 text-sm">Credential ID: {cert.credentialId}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Projects */}
      {resume.projects.length > 0 && (
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center" style={{ color: primaryColor }}>
            KEY PROJECTS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resume.projects.map((project) => (
              <div key={project.id} className="bg-gray-50 p-6 rounded-lg border-l-4" style={{ borderColor: accentColor }}>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-bold text-gray-900">{project.name}</h3>
                  <span className="text-gray-600 text-sm font-medium">
                    {project.startDate} - {project.endDate}
                  </span>
                </div>
                <p className="text-gray-700 mb-3 font-medium">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="px-3 py-1 rounded-full text-sm font-medium text-white" style={{ backgroundColor: secondaryColor }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExecutiveTemplate;