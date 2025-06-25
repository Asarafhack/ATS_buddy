import React, { useState } from 'react';
import { GraduationCap, Plus, Edit, Trash2, Calendar } from 'lucide-react';
import { Education } from '../../types/resume';

interface EducationFormProps {
  education: Education[];
  onChange: (education: Education[]) => void;
}

const EducationForm: React.FC<EducationFormProps> = ({ education, onChange }) => {
  const [editingId, setEditingId] = useState<string | null>(null);

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: '',
      honors: ''
    };
    onChange([...education, newEducation]);
    setEditingId(newEducation.id);
  };

  const updateEducation = (id: string, updates: Partial<Education>) => {
    onChange(education.map(edu => edu.id === id ? { ...edu, ...updates } : edu));
  };

  const deleteEducation = (id: string) => {
    onChange(education.filter(edu => edu.id !== id));
  };

  return (
    <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
          <GraduationCap className="w-6 h-6 text-indigo-600" />
          <span>Education</span>
        </h3>
        <button
          onClick={addEducation}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          <span>Add Education</span>
        </button>
      </div>

      <div className="space-y-6">
        {education.map((edu) => (
          <div key={edu.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                {editingId === edu.id ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Institution Name"
                        value={edu.institution}
                        onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Degree Type (e.g., Bachelor's, Master's)"
                        value={edu.degree}
                        onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    
                    <input
                      type="text"
                      placeholder="Field of Study"
                      value={edu.field}
                      onChange={(e) => updateEducation(edu.id, { field: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="month"
                          placeholder="Start Date"
                          value={edu.startDate}
                          onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="month"
                          placeholder="End Date"
                          value={edu.endDate}
                          onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="GPA (optional)"
                        value={edu.gpa}
                        onChange={(e) => updateEducation(edu.id, { gpa: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Honors (optional)"
                        value={edu.honors}
                        onChange={(e) => updateEducation(edu.id, { honors: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => deleteEducation(edu.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">{edu.degree} in {edu.field}</h4>
                    <p className="text-indigo-600 font-medium">{edu.institution}</p>
                    <p className="text-gray-500 text-sm">
                      {edu.startDate} - {edu.endDate}
                    </p>
                    {edu.gpa && <p className="text-gray-600 text-sm">GPA: {edu.gpa}</p>}
                    {edu.honors && <p className="text-gray-600 text-sm">Honors: {edu.honors}</p>}
                  </div>
                )}
              </div>
              
              {editingId !== edu.id && (
                <button
                  onClick={() => setEditingId(edu.id)}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <Edit className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}

        {education.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <GraduationCap className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No education added yet. Click "Add Education" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EducationForm;