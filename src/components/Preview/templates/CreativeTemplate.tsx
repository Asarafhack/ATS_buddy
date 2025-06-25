import React from 'react';
import { ResumeData } from '../../../types/resume';
import { Mail, Phone, MapPin, Linkedin, Globe, Calendar } from 'lucide-react';

interface TemplateProps {
  resume: ResumeData;
  settings?: any;
}

const CreativeTemplate: React.FC<TemplateProps> = ({ resume, settings }) => {
  const primaryColor = settings?.colors?.primary || '#7c3aed';
  const secondaryColor = settings?.colors?.secondary || '#6d28d9';
  const accentColor = settings?.colors?.accent || '#8b5cf6';

  return (
    <div className="max-w-4xl mx-auto bg-white flex">
      {/* Left Sidebar */}
      <div className="w-1/3 p-8 text-white" style={{ backgroundColor: primaryColor }}>
        {/* Profile Section */}
        <div className="mb-8">
          <div className="w-32 h-32 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-4xl font-bold">
              {resume.personalInfo.fullName.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-center mb-2">
            {resume.personalInfo.fullName}
          </h1>
        </div>

        {/* Contact Info */}
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4 border-b border-white/30 pb-2">Contact</h3>
          <div className="space-y-3">
            {resume.personalInfo.email && (
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span className="text-sm">{resume.personalInfo.email}</span>
              </div>
            )}
            {resume.personalInfo.phone && (
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span className="text-sm">{resume.personalInfo.phone}</span>
              </div>
            )}
            {resume.personalInfo.location && (
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{resume.personalInfo.location}</span>
              </div>
            )}
            {resume.personalInfo.linkedin && (
              <div className="flex items-center space-x-2">
                <Linkedin className="w-4 h-4" />
                <span className="text-sm">LinkedIn</span>
              </div>
            )}
            {resume.personalInfo.website && (
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4" />
                <span className="text-sm">Portfolio</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {resume.skills.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4 border-b border-white/30 pb-2">Skills</h3>
            <div className="space-y-4">
              {Object.entries(
                resume.skills.reduce((acc, skill) => {
                  if (!acc[skill.category]) acc[skill.category] = [];
                  acc[skill.category].push(skill);
                  return acc;
                }, {} as Record<string, typeof resume.skills>)
              ).map(([category, skills]) => (
                <div key={category}>
                  <h4 className="font-semibold text-sm mb-2">{category}</h4>
                  <div className="space-y-1">
                    {skills.map((skill) => (
                      <div key={skill.id} className="text-sm">
                        {skill.name}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {resume.education.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4 border-b border-white/30 pb-2">Education</h3>
            <div className="space-y-4">
              {resume.education.map((edu) => (
                <div key={edu.id}>
                  <h4 className="font-semibold text-sm">{edu.degree}</h4>
                  <p className="text-sm opacity-90">{edu.field}</p>
                  <p className="text-sm opacity-80">{edu.institution}</p>
                  <p className="text-xs opacity-70">{edu.startDate} - {edu.endDate}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Content */}
      <div className="w-2/3 p-8">
        {/* Professional Summary */}
        {resume.professionalSummary && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4" style={{ color: primaryColor }}>
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
            <h2 className="text-2xl font-bold mb-4" style={{ color: primaryColor }}>
              Experience
            </h2>
            <div className="space-y-6">
              {resume.experience.map((exp) => (
                <div key={exp.id} className="relative pl-6">
                  <div className="absolute left-0 top-2 w-3 h-3 rounded-full" style={{ backgroundColor: accentColor }}></div>
                  <div className="absolute left-1.5 top-5 w-0.5 h-full bg-gray-200"></div>
                  
                  <div className="mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                    <p className="font-medium" style={{ color: secondaryColor }}>{exp.company}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{exp.location}</span>
                      <span>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                    </div>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                    {exp.description.map((bullet, index) => (
                      <li key={index}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {resume.projects.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4" style={{ color: primaryColor }}>
              Projects
            </h2>
            <div className="space-y-4">
              {resume.projects.map((project) => (
                <div key={project.id} className="border-l-4 pl-4" style={{ borderColor: accentColor }}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                    <span className="text-gray-600 text-sm">
                      {project.startDate} - {project.endDate}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-2 text-sm">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="px-2 py-1 rounded text-xs text-white" style={{ backgroundColor: secondaryColor }}>
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
            <h2 className="text-2xl font-bold mb-4" style={{ color: primaryColor }}>
              Certifications
            </h2>
            <div className="space-y-3">
              {resume.certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                    <p style={{ color: secondaryColor }}>{cert.issuer}</p>
                  </div>
                  <div className="text-gray-600 text-sm">
                    {cert.date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreativeTemplate;