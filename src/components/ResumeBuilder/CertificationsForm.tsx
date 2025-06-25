import React, { useState } from 'react';
import { Award, Plus, Edit, Trash2, Calendar, ExternalLink } from 'lucide-react';
import { Certification } from '../../types/resume';

interface CertificationsFormProps {
  certifications: Certification[];
  onChange: (certifications: Certification[]) => void;
}

const CertificationsForm: React.FC<CertificationsFormProps> = ({ certifications, onChange }) => {
  const [editingId, setEditingId] = useState<string | null>(null);

  const addCertification = () => {
    const newCertification: Certification = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      date: '',
      expiryDate: '',
      credentialId: ''
    };
    onChange([...certifications, newCertification]);
    setEditingId(newCertification.id);
  };

  const updateCertification = (id: string, updates: Partial<Certification>) => {
    onChange(certifications.map(cert => cert.id === id ? { ...cert, ...updates } : cert));
  };

  const deleteCertification = (id: string) => {
    onChange(certifications.filter(cert => cert.id !== id));
  };

  return (
    <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
          <Award className="w-6 h-6 text-yellow-600" />
          <span>Certifications</span>
        </h3>
        <button
          onClick={addCertification}
          className="flex items-center space-x-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          <span>Add Certification</span>
        </button>
      </div>

      <div className="space-y-6">
        {certifications.map((cert) => (
          <div key={cert.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                {editingId === cert.id ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Certification Name"
                        value={cert.name}
                        onChange={(e) => updateCertification(cert.id, { name: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Issuing Organization"
                        value={cert.issuer}
                        onChange={(e) => updateCertification(cert.id, { issuer: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="month"
                          placeholder="Issue Date"
                          value={cert.date}
                          onChange={(e) => updateCertification(cert.id, { date: e.target.value })}
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        />
                      </div>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="month"
                          placeholder="Expiry Date (optional)"
                          value={cert.expiryDate}
                          onChange={(e) => updateCertification(cert.id, { expiryDate: e.target.value })}
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Credential ID (optional)"
                        value={cert.credentialId}
                        onChange={(e) => updateCertification(cert.id, { credentialId: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
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
                        onClick={() => deleteCertification(cert.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">{cert.name}</h4>
                    <p className="text-yellow-600 font-medium">{cert.issuer}</p>
                    <p className="text-gray-500 text-sm">
                      Issued: {cert.date}
                      {cert.expiryDate && ` • Expires: ${cert.expiryDate}`}
                    </p>
                    {cert.credentialId && (
                      <p className="text-gray-600 text-sm">Credential ID: {cert.credentialId}</p>
                    )}
                  </div>
                )}
              </div>
              
              {editingId !== cert.id && (
                <button
                  onClick={() => setEditingId(cert.id)}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <Edit className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}

        {certifications.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Award className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No certifications added yet. Click "Add Certification" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificationsForm;