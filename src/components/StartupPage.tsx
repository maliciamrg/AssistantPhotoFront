import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPhotoshootTypes, getPhotoShoot } from '../api';
import { PhotoshootType, PhotoShoot } from '../types';
import { Camera } from 'lucide-react';

export default function StartupPage() {
  const [PhotoshootTypes, setPhotoshootTypes] = useState<PhotoshootType[]>([]);
  const [photoShoots, setphotoShoots] = useState<PhotoShoot[]>([]);
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedphotoShoot, setSelectedphotoShoot] = useState<string>('');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPhotoshootTypes = async () => {
      try {
        const types = await getPhotoshootTypes();
        setPhotoshootTypes(Array.isArray(types) ? types : []);
      } catch (error) {
        console.error('Error fetching seance types:', error);
        setPhotoshootTypes([]);
      }
    };
    fetchPhotoshootTypes();
  }, []);

  useEffect(() => {
    const fetchPhotoShoot = async () => {
      if (selectedType) {
        setIsLoading(true); // 🔒 lock UI
        try {
          const photoShootList = await getPhotoShoot(selectedType);
          setphotoShoots(Array.isArray(photoShootList) ? photoShootList : []);
          setSelectedphotoShoot('');
        } catch (error) {
          console.error('Error fetching photoShoots:', error);
          setphotoShoots([]);
        } finally {
          setIsLoading(false); // 🔓 unlock UI
        }
      }
    };
    fetchPhotoShoot();
  }, [selectedType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedType && selectedphotoShoot) {
      const selectedphotoShootData = photoShoots.find(r => r.name === selectedphotoShoot);
      navigate('/dashboard', { 
        state: {
          photoShootPath: selectedphotoShootData?.path || 'Unknown photoShoot',
          photoshootName: selectedphotoShootData?.name || selectedphotoShootData?.name ||'Unknown photoShoot',
          photoshootTypeName: selectedType // Add the photoshootTypeName to the navigation state
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
        {isLoading && (
            <div className="fixed inset-0 bg-white bg-opacity-70 z-50 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            </div>
        )}
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
              {PhotoshootTypes.map((type) => (
                <option key={type.photoshootTypeEnum} value={type.photoshootTypeEnum}>
                  {type.photoshootTypeEnum}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Séance photoShoot
            </label>
            <select
              value={selectedphotoShoot}
              onChange={(e) => setSelectedphotoShoot(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              disabled={!selectedType || isLoading}
              required
            >
              <option value="">Select a photoShoot</option>
              {photoShoots.map((photoShoot) => (
                <option key={photoShoot.name} value={photoShoot.name}>
                  {photoShoot.name || photoShoot.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200"
            disabled={!selectedType || !selectedphotoShoot}
          >
            Continue to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
