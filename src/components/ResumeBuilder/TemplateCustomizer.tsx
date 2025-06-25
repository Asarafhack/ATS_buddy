import React, { useState } from 'react';
import { useResume } from '../../contexts/ResumeContext';
import { Palette, Layout, Type, Sliders, Download } from 'lucide-react';

const TemplateCustomizer: React.FC = () => {
  const { selectedTemplate, templateSettings, setTemplateSettings } = useResume();
  const [activeTab, setActiveTab] = useState('colors');

  const colorThemes = [
    { name: 'Professional Blue', primary: '#2563eb', secondary: '#1e40af', accent: '#3b82f6' },
    { name: 'Creative Purple', primary: '#7c3aed', secondary: '#6d28d9', accent: '#8b5cf6' },
    { name: 'Executive Green', primary: '#059669', secondary: '#047857', accent: '#10b981' },
    { name: 'Modern Orange', primary: '#ea580c', secondary: '#c2410c', accent: '#f97316' },
    { name: 'Tech Red', primary: '#dc2626', secondary: '#b91c1c', accent: '#ef4444' },
    { name: 'Academic Teal', primary: '#0891b2', secondary: '#0e7490', accent: '#06b6d4' }
  ];

  const fonts = [
    { name: 'Inter', value: 'Inter, sans-serif', preview: 'Modern & Clean' },
    { name: 'Roboto', value: 'Roboto, sans-serif', preview: 'Professional' },
    { name: 'Open Sans', value: 'Open Sans, sans-serif', preview: 'Friendly & Readable' },
    { name: 'Lato', value: 'Lato, sans-serif', preview: 'Elegant' },
    { name: 'Source Sans Pro', value: 'Source Sans Pro, sans-serif', preview: 'Technical' },
    { name: 'Nunito', value: 'Nunito, sans-serif', preview: 'Creative' }
  ];

  const layouts = [
    { id: 'single', name: 'Single Column', description: 'Traditional layout, ATS-friendly' },
    { id: 'two-column', name: 'Two Column', description: 'Modern layout with sidebar' },
    { id: 'creative', name: 'Creative Layout', description: 'Unique design for creative roles' }
  ];

  const handleColorChange = (theme: typeof colorThemes[0]) => {
    setTemplateSettings({
      ...templateSettings,
      colors: {
        primary: theme.primary,
        secondary: theme.secondary,
        accent: theme.accent
      }
    });
  };

  const handleFontChange = (font: string) => {
    setTemplateSettings({
      ...templateSettings,
      font: font
    });
  };

  const handleLayoutChange = (layout: string) => {
    setTemplateSettings({
      ...templateSettings,
      layout: layout
    });
  };

  const tabs = [
    { id: 'colors', label: 'Colors', icon: Palette },
    { id: 'layout', label: 'Layout', icon: Layout },
    { id: 'typography', label: 'Fonts', icon: Type },
    { id: 'spacing', label: 'Spacing', icon: Sliders }
  ];

  return (
    <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Template Customizer</h3>
      
      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <IconComponent className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="space-y-4">
        {activeTab === 'colors' && (
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Color Themes</h4>
            <div className="space-y-3">
              {colorThemes.map((theme, index) => (
                <button
                  key={index}
                  onClick={() => handleColorChange(theme)}
                  className="w-full p-3 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors duration-200 text-left"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-1">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.primary }}></div>
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.secondary }}></div>
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.accent }}></div>
                    </div>
                    <span className="text-sm font-medium text-gray-800">{theme.name}</span>
                  </div>
                </button>
              ))}
            </div>
            
            {/* Custom Color Picker */}
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <h5 className="text-sm font-medium text-gray-700 mb-2">Custom Colors</h5>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Primary</label>
                  <input
                    type="color"
                    value={templateSettings?.colors?.primary || '#2563eb'}
                    onChange={(e) => setTemplateSettings({
                      ...templateSettings,
                      colors: { ...templateSettings?.colors, primary: e.target.value }
                    })}
                    className="w-full h-8 rounded border border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Secondary</label>
                  <input
                    type="color"
                    value={templateSettings?.colors?.secondary || '#1e40af'}
                    onChange={(e) => setTemplateSettings({
                      ...templateSettings,
                      colors: { ...templateSettings?.colors, secondary: e.target.value }
                    })}
                    className="w-full h-8 rounded border border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Accent</label>
                  <input
                    type="color"
                    value={templateSettings?.colors?.accent || '#3b82f6'}
                    onChange={(e) => setTemplateSettings({
                      ...templateSettings,
                      colors: { ...templateSettings?.colors, accent: e.target.value }
                    })}
                    className="w-full h-8 rounded border border-gray-300"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'layout' && (
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Layout Options</h4>
            <div className="space-y-3">
              {layouts.map((layout) => (
                <button
                  key={layout.id}
                  onClick={() => handleLayoutChange(layout.id)}
                  className={`w-full p-3 border-2 rounded-lg text-left transition-all duration-200 ${
                    templateSettings?.layout === layout.id
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <h5 className="font-medium text-gray-800">{layout.name}</h5>
                  <p className="text-sm text-gray-600">{layout.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'typography' && (
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Font Selection</h4>
            <div className="space-y-3">
              {fonts.map((font) => (
                <button
                  key={font.name}
                  onClick={() => handleFontChange(font.value)}
                  className={`w-full p-3 border-2 rounded-lg text-left transition-all duration-200 ${
                    templateSettings?.font === font.value
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  style={{ fontFamily: font.value }}
                >
                  <h5 className="font-medium text-gray-800">{font.name}</h5>
                  <p className="text-sm text-gray-600">{font.preview}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'spacing' && (
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Spacing & Margins</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section Spacing: {templateSettings?.spacing?.sections || 24}px
                </label>
                <input
                  type="range"
                  min="16"
                  max="48"
                  value={templateSettings?.spacing?.sections || 24}
                  onChange={(e) => setTemplateSettings({
                    ...templateSettings,
                    spacing: { ...templateSettings?.spacing, sections: parseInt(e.target.value) }
                  })}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Line Height: {templateSettings?.spacing?.lineHeight || 1.5}
                </label>
                <input
                  type="range"
                  min="1.2"
                  max="2"
                  step="0.1"
                  value={templateSettings?.spacing?.lineHeight || 1.5}
                  onChange={(e) => setTemplateSettings({
                    ...templateSettings,
                    spacing: { ...templateSettings?.spacing, lineHeight: parseFloat(e.target.value) }
                  })}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Margins: {templateSettings?.spacing?.margins || 20}px
                </label>
                <input
                  type="range"
                  min="10"
                  max="40"
                  value={templateSettings?.spacing?.margins || 20}
                  onChange={(e) => setTemplateSettings({
                    ...templateSettings,
                    spacing: { ...templateSettings?.spacing, margins: parseInt(e.target.value) }
                  })}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Preview Button */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <button
          onClick={() => window.open('/preview', '_blank')}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200"
        >
          <Download className="w-4 h-4" />
          <span>Preview Changes</span>
        </button>
      </div>
    </div>
  );
};

export default TemplateCustomizer;