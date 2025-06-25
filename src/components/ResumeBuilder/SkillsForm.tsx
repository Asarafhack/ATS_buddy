import React, { useState } from 'react';
import { Award, Plus, X } from 'lucide-react';
import { Skill } from '../../types/resume';

interface SkillsFormProps {
  skills: Skill[];
  onChange: (skills: Skill[]) => void;
}

const SkillsForm: React.FC<SkillsFormProps> = ({ skills, onChange }) => {
  const [newSkill, setNewSkill] = useState({ name: '', level: 'Intermediate' as const, category: 'Technical' });

  const skillCategories = ['Technical', 'Soft Skills', 'Languages', 'Tools', 'Frameworks'];
  const skillLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'] as const;

  const addSkill = () => {
    if (newSkill.name.trim()) {
      const skill: Skill = {
        id: Date.now().toString(),
        ...newSkill
      };
      onChange([...skills, skill]);
      setNewSkill({ name: '', level: 'Intermediate', category: 'Technical' });
    }
  };

  const removeSkill = (id: string) => {
    onChange(skills.filter(skill => skill.id !== id));
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-red-100 text-red-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-blue-100 text-blue-800';
      case 'Expert': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Technical': return 'bg-purple-100 text-purple-800';
      case 'Soft Skills': return 'bg-pink-100 text-pink-800';
      case 'Languages': return 'bg-indigo-100 text-indigo-800';
      case 'Tools': return 'bg-orange-100 text-orange-800';
      case 'Frameworks': return 'bg-teal-100 text-teal-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
        <Award className="w-6 h-6 text-orange-600" />
        <span>Skills & Competencies</span>
      </h3>

      {/* Add New Skill */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-gray-700 mb-3">Add New Skill</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input
            type="text"
            placeholder="Skill name"
            value={newSkill.name}
            onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <select
            value={newSkill.category}
            onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            {skillCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <select
            value={newSkill.level}
            onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value as any })}
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            {skillLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
          <button
            onClick={addSkill}
            className="flex items-center justify-center space-x-2 px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-200"
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>
      </div>

      {/* Skills Display */}
      <div className="space-y-6">
        {Object.entries(groupedSkills).map(([category, categorySkills]) => (
          <div key={category}>
            <h4 className="font-semibold text-gray-700 mb-3 flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(category)}`}>
                {category}
              </span>
              <span>({categorySkills.length})</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {categorySkills.map((skill) => (
                <div key={skill.id} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{skill.name}</p>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(skill.level)}`}>
                      {skill.level}
                    </span>
                  </div>
                  <button
                    onClick={() => removeSkill(skill.id)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors duration-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

        {skills.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Award className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No skills added yet. Add your first skill above.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsForm;