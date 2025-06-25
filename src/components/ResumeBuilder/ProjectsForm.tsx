import React, { useState } from 'react';
import { Code, Plus, Edit, Trash2, Calendar, ExternalLink } from 'lucide-react';
import { Project } from '../../types/resume';

interface ProjectsFormProps {
  projects: Project[];
  onChange: (projects: Project[]) => void;
}

const ProjectsForm: React.FC<ProjectsFormProps> = ({ projects, onChange }) => {
  const [editingId, setEditingId] = useState<string | null>(null);

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [],
      link: '',
      startDate: '',
      endDate: ''
    };
    onChange([...projects, newProject]);
    setEditingId(newProject.id);
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    onChange(projects.map(proj => proj.id === id ? { ...proj, ...updates } : proj));
  };

  const deleteProject = (id: string) => {
    onChange(projects.filter(proj => proj.id !== id));
  };

  const updateTechnologies = (id: string, techString: string) => {
    const technologies = techString.split(',').map(tech => tech.trim()).filter(tech => tech);
    updateProject(id, { technologies });
  };

  return (
    <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
          <Code className="w-6 h-6 text-teal-600" />
          <span>Projects</span>
        </h3>
        <button
          onClick={addProject}
          className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project</span>
        </button>
      </div>

      <div className="space-y-6">
        {projects.map((project) => (
          <div key={project.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                {editingId === project.id ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Project Name"
                      value={project.name}
                      onChange={(e) => updateProject(project.id, { name: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                    
                    <textarea
                      placeholder="Project Description"
                      value={project.description}
                      onChange={(e) => updateProject(project.id, { description: e.target.value })}
                      className="w-full h-24 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />

                    <input
                      type="text"
                      placeholder="Technologies (comma-separated)"
                      value={project.technologies.join(', ')}
                      onChange={(e) => updateTechnologies(project.id, e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="relative">
                        <ExternalLink className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="url"
                          placeholder="Project Link (optional)"
                          value={project.link}
                          onChange={(e) => updateProject(project.id, { link: e.target.value })}
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                      </div>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="month"
                          placeholder="Start Date"
                          value={project.startDate}
                          onChange={(e) => updateProject(project.id, { startDate: e.target.value })}
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                      </div>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="month"
                          placeholder="End Date"
                          value={project.endDate}
                          onChange={(e) => updateProject(project.id, { endDate: e.target.value })}
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => deleteProject(project.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="text-lg font-semibold text-gray-800">{project.name}</h4>
                      {project.link && (
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-teal-600 hover:text-teal-800"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                    <p className="text-gray-700 mb-2">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {project.technologies.map((tech, index) => (
                        <span key={index} className="px-2 py-1 bg-teal-100 text-teal-800 rounded-full text-xs font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-500 text-sm">
                      {project.startDate} - {project.endDate}
                    </p>
                  </div>
                )}
              </div>
              
              {editingId !== project.id && (
                <button
                  onClick={() => setEditingId(project.id)}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <Edit className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}

        {projects.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Code className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No projects added yet. Click "Add Project" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsForm;