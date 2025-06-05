import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSeanceTypes, getSeanceRepertoire } from '../api';
import { SeanceType, SeanceRepertoire } from '../types';
import { Camera } from 'lucide-react';

export default function StartupPage() {
  const [seanceTypes, setSeanceTypes] = useState<SeanceType[]>([]);
  const [repertoires, setRepertoires] = useState<SeanceRepertoire[]>([]);
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedRepertoire, setSelectedRepertoire] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSeanceTypes = async () => {
      try {
        const types = await getSeanceTypes();
        setSeanceTypes(Array.isArray(types) ? types : []);
      } catch (error) {
        console.error('Error fetching seance types:', error);
        setSeanceTypes([]);
      }
    };
    fetchSeanceTypes();
  }, []);

  useEffect(() => {
    const fetchRepertoires = async () => {
      if (selectedType) {
        try {
          const repertoireList = await getSeanceRepertoire(selectedType);
          setRepertoires(Array.isArray(repertoireList) ? repertoireList : []);
          setSelectedRepertoire('');
        } catch (error) {
          console.error('Error fetching repertoires:', error);
          setRepertoires([]);
        }
      }
    };
    fetchRepertoires();
  }, [selectedType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedType && selectedRepertoire) {
      const selectedRepertoireData = repertoires.find(r => r.id === selectedRepertoire);
      navigate('/dashboard', { 
        state: {
          repertoirePath: selectedRepertoireData?.path || 'Unknown Repertoire',
          repertoireName: selectedRepertoireData?.name || selectedRepertoireData?.id ||'Unknown Repertoire',
          typeId: selectedType // Add the typeId to the navigation state
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <div className="flex items-center justify-center mb-8">
          <Camera className="w-12 h-12 text-indigo-600" />
        </div>
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Photo Session Setup
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Séance Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            >
              <option value="">Select a type</option>
              {seanceTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Séance Repertoire
            </label>
            <select
              value={selectedRepertoire}
              onChange={(e) => setSelectedRepertoire(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              disabled={!selectedType}
              required
            >
              <option value="">Select a repertoire</option>
              {repertoires.map((repertoire) => (
                <option key={repertoire.id} value={repertoire.id}>
                  {repertoire.name || repertoire.id}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200"
            disabled={!selectedType || !selectedRepertoire}
          >
            Continue to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
