import axios from 'axios';
import { SeanceType, SeanceRepertoire, Photo } from '../types';

const API_BASE_URL = 'http://localhost:8099/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getSeanceTypes = async (): Promise<SeanceType[]> => {
  try {
    const response = await api.get('/seance-types');
    return response.data;
  } catch (error) {
    console.error('Error fetching seance types:', error);
    throw error;
  }
};

export const getSeanceRepertoire = async (typeId: string): Promise<SeanceRepertoire[]> => {
  try {
    // Mock implementation - replace with actual API call
    const mockRepertoires: SeanceRepertoire[] = [
      { id: 'rep1', path: '/path/to/rep1', name: 'Repertoire 1' },
      { id: 'rep2', path: '/path/to/rep2', name: 'Repertoire 2' },
      { id: 'rep3', path: '/path/to/rep3', name: 'Repertoire 3' },
    ];
    
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockRepertoires), 500);
    });
  } catch (error) {
    console.error('Error fetching seance repertoires:', error);
    throw error;
  }
};

export const validateRepertoire = async (repertoireName: string): Promise<string> => {
  try {
    // Mock implementation - replace with actual API call
    // Randomly return "validate" or "invalid" for demonstration
    const isValid = Math.random() > 0.3; // 70% chance of being valid
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(isValid ? 'validate' : 'invalid');
      }, 800);
    });
  } catch (error) {
    console.error('Error validating repertoire:', error);
    throw error;
  }
};

export const getPhotos = async (typeId: string, repertoireName: string): Promise<Photo[]> => {
  try {
    // Mock implementation - replace with actual API call
    const mockPhotos: Photo[] = [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
        path: '/path/to/photo1.jpg',
        thumbnail: null,
        flagged: false,
        starred: 0,
        date_taken: '2024-01-15T10:30:00Z'
      },
      {
        id: '2',
        url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
        path: '/path/to/photo2.jpg',
        thumbnail: null,
        flagged: true,
        flagType: 'pick',
        starred: 3,
        date_taken: '2024-01-15T11:45:00Z'
      },
      {
        id: '3',
        url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e',
        path: '/path/to/photo3.jpg',
        thumbnail: null,
        flagged: true,
        flagType: 'reject',
        starred: 1,
        date_taken: '2024-01-15T14:20:00Z'
      }
    ];
    
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockPhotos), 1000);
    });
  } catch (error) {
    console.error('Error fetching photos:', error);
    throw error;
  }
};

export const updatePhoto = async (photoId: string, updates: Partial<Photo>): Promise<Photo> => {
  try {
    // Mock implementation - replace with actual API call
    const mockUpdatedPhoto: Photo = {
      id: photoId,
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
      path: '/path/to/photo.jpg',
      thumbnail: null,
      flagged: updates.flagged ?? false,
      flagType: updates.flagType,
      starred: updates.starred ?? 0,
      date_taken: '2024-01-15T10:30:00Z'
    };
    
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockUpdatedPhoto), 300);
    });
  } catch (error) {
    console.error('Error updating photo:', error);
    throw error;
  }
};

export const sendUpdatedPhotos = async (photos: Photo[]): Promise<void> => {
  try {
    // Mock implementation - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 1500);
    });
  } catch (error) {
    console.error('Error sending updated photos:', error);
    throw error;
  }
};

export const updateGetPhotos = async (repertoireName: string, repertoirePath: string): Promise<void> => {
  try {
    // Mock implementation - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 1000);
    });
  } catch (error) {
    console.error('Error updating photos:', error);
    throw error;
  }
};