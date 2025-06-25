import React, { useState } from 'react';
import { Briefcase, Plus, Edit, Trash2, Calendar } from 'lucide-react';
import { Experience } from '../../types/resume';

interface ExperienceFormProps {
  experiences: Experience[];
  onChange: (experiences: Experience[]) => void;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({ experiences, onChange }) => {
  const [editingId, setEditingId] = useState<string | null>(null);

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ['']
    };
    onChange([...experiences, newExperience]);
    setEditingId(newExperience.id);
  };

  const updateExperience = (id: string, updates: Partial<Experience>) => {
    onChange(experiences.map(exp => exp.id === id ? { ...exp, ...updates } : exp));
  };

  const deleteExperience = (id: string) => {
    onChange(experiences.filter(exp => exp.id !== id));
  };

  const addBulletPoint = (id: string) => {
    const experience = experiences.find(exp => exp.id === id);
    if (experience) {
      updateExperience(id, {
        description: [...experience.description, '']
      });
    }
  };

  const updateBulletPoint = (id: string, index: number, value: string) => {
    const experience = experiences.find(exp => exp.id === id);
    if (experience) {
      const newDescription = [...experience.description];
      newDescription[index] = value;
      updateExperience(id, { description: newDescription });
    }
  };

  const removeBulletPoint = (id: string, index: number) => {
    const experience = experiences.find(exp => exp.id === id);
    if (experience && experience.description.length > 1) {
      const newDescription = experience.description.filter((_, i) => i !== index);
      updateExperience(id, { description: newDescription });
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
          <Briefcase className="w-6 h-6 text-purple-600" />
          <span>Professional Experience</span>
        </h3>
        <button
          onClick={addExperience}
          className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          <span>Add Experience</span>
        </button>
      </div>

      <div className="space-y-6">
        {experiences.map((experience) => (
          <div key={experience.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                {editingId === experience.id ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Job Title"
                        value={experience.position}
                        onChange={(e) => updateExperience(experience.id, { position: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Company Name"
                        value={experience.company}
                        onChange={(e) => updateExperience(experience.id, { company: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <input
                        type="text"
                        placeholder="Location"
                        value={experience.location}
                        onChange={(e) => updateExperience(experience.id, { location: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="month"
                          placeholder="Start Date"
                          value={experience.startDate}
                          onChange={(e) => updateExperience(experience.id, { startDate: e.target.value })}
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="month"
                          placeholder="End Date"
                          value={experience.endDate}
                          onChange={(e) => updateExperience(experience.id, { endDate: e.target.value })}
                          disabled={experience.current}
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100"
                        />
                      </div>
                    </div>

                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={experience.current}
                        onChange={(e) => updateExperience(experience.id, { current: e.target.checked, endDate: e.target.checked ? '' : experience.endDate })}
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-gray-700">I currently work here</span>
                    </label>

                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-gray-700">Job Responsibilities & Achievements</label>
                      {experience.description.map((bullet, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <textarea
                            value={bullet}
                            onChange={(e) => updateBulletPoint(experience.id, index, e.target.value)}
                            placeholder="• Describe your key responsibilities and achievements with quantifiable results"
                            className="flex-1 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            rows={2}
                          />
                          {experience.description.length > 1 && (
                            <button
                              onClick={() => removeBulletPoint(experience.id, index)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        onClick={() => addBulletPoint(experience.id)}
                        className="text-purple-600 hover:text-purple-800 text-sm font-medium"
                      >
                        + Add bullet point
                      </button>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => deleteExperience(experience.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">{experience.position}</h4>
                    <p className="text-purple-600 font-medium">{experience.company}</p>
                    <p className="text-gray-600 text-sm">{experience.location}</p>
                    <p className="text-gray-500 text-sm">
                      {experience.startDate} - {experience.current ? 'Present' : experience.endDate}
                    </p>
                    <ul className="mt-2 space-y-1">
                      {experience.description.map((bullet, index) => (
                        <li key={index} className="text-gray-700 text-sm">• {bullet}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              {editingId !== experience.id && (
                <button
                  onClick={() => setEditingId(experience.id)}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <Edit className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}

        {experiences.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Briefcase className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No experience added yet. Click "Add Experience" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperienceForm;