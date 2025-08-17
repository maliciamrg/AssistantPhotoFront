import React, { useState, useEffect } from 'react';
import Select, {SingleValue} from 'react-select';
import { useNavigate } from 'react-router-dom';
import { getPhotoshootTypes, getPhotoShoot } from '../api';
import {PhotoshootType, PhotoShoot, PhotoShootOption} from '../types';
import { Camera } from 'lucide-react';

export default function StartupPage() {
  const [PhotoshootTypes, setPhotoshootTypes] = useState<PhotoshootType[]>([]);
  const [photoShoots, setphotoShoots] = useState<PhotoShoot[]>([]);
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedphotoShoot, setSelectedphotoShoot] = useState<string>('');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [validFilter, setValidFilter] = useState<'all' | 'valid' | 'invalid'>('all');

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
      const selectedIndex = filteredOptions.findIndex(r => r.value === selectedphotoShoot);
      navigate('/dashboard', { 
        state: {
          photoshootTypeName: selectedType, // Add the photoshootTypeName to the navigation state
          photoshootIndex: selectedIndex,
          photoShootList: filteredOptions
        }
      });
    }
  };

  const options: PhotoShootOption[] = photoShoots.map((photoShoot) => ({
    value: photoShoot.name,
    label: photoShoot.name,
    valid: photoShoot.validationResult.valid,
    message: photoShoot.validationResult.message,
  }));

  const filteredOptions = options.filter((option) => {
    if (validFilter === 'valid') return option.valid;
    if (validFilter === 'invalid') return !option.valid;
    return true;
  });

  const formatOptionLabel = ({ label, valid, message }: { label: string; valid: boolean; message?: string }) => (
      <div
          className="flex items-center space-x-2"
          title={message || ''} // Tooltip appears on hover
      >
        <span>{valid ? '✅' : '❌'}</span>
        <span>{label}</span>
      </div>
  );

  // Find selected option object by value
  const selectedOption = options.find((o) => o.value === selectedphotoShoot);

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
            <fieldset className="mb-4">
              <legend className="block text-sm font-medium text-gray-700 mb-1">Séance photoShoot :</legend>
              <div className="flex items-center space-x-6">
                <label className="inline-flex items-center">
                  <input
                      type="radio"
                      value="all"
                      checked={validFilter === 'all'}
                      onChange={() => setValidFilter('all')}
                      className="form-radio text-indigo-600"
                  />
                  <span className="ml-2">Tous</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                      type="radio"
                      value="valid"
                      checked={validFilter === 'valid'}
                      onChange={() => setValidFilter('valid')}
                      className="form-radio text-green-600"
                  />
                  <span className="ml-2">Valides ✅</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                      type="radio"
                      value="invalid"
                      checked={validFilter === 'invalid'}
                      onChange={() => setValidFilter('invalid')}
                      className="form-radio text-red-600"
                  />
                  <span className="ml-2">Invalides ❌</span>
                </label>
              </div>
            </fieldset>
            <Select
                isDisabled={!selectedType || isLoading}
                options={filteredOptions}
                value={selectedOption}
                onChange={(selected: SingleValue<PhotoShootOption>) => {
                  if (selected) setSelectedphotoShoot(selected.value);
                }}
                formatOptionLabel={formatOptionLabel}
                className="w-full"
                classNamePrefix="react-select"
                placeholder="Select a photoShoot"
            />
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
