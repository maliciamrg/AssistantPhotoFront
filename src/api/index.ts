const API_BASE_URL = 'http://localhost:8099/api';

export const getSeanceTypes = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/seance-types`);
    if (!response.ok) {
      throw new Error('Failed to fetch seance types');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching seance types:', error);
    throw error;
  }
};

export const getSeanceRepertoire = async (typeId: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/seance-repertoire/${typeId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch seance repertoire');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching seance repertoire:', error);
    throw error;
  }
};

export const getPhotos = async (typeId: string, repertoireName: string) => {
  try {
    const seanceType = await getSeanceTypes().then(types => 
      types.find((t: any) => t.id === typeId)
    );
    
    if (!seanceType) {
      throw new Error('Seance type not found');
    }

    const response = await fetch(`${API_BASE_URL}/photos/by-seance-type`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(seanceType),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch photos');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching photos:', error);
    throw error;
  }
};

export const updatePhoto = async (photoId: string, updates: any) => {
  try {
    const response = await fetch(`${API_BASE_URL}/photos/${photoId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update photo');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating photo:', error);
    throw error;
  }
};

export const sendUpdatedPhotos = async (photos: any[]) => {
  try {
    const response = await fetch(`${API_BASE_URL}/photos/batch-update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(photos),
    });
    
    if (!response.ok) {
      throw new Error('Failed to send updated photos');
    }
    return await response.json();
  } catch (error) {
    console.error('Error sending updated photos:', error);
    throw error;
  }
};

export const updateGetPhotos = async (repertoireName: string, repertoirePath: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/photos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: repertoireName,
        path: repertoirePath,
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update photos');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating photos:', error);
    throw error;
  }
};

// Mock API call for repertoire validation
export const validateRepertoire = async (repertoireName: string): Promise<'validate' | 'invalid'> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock response - 70% chance of being valid
  return Math.random() > 0.3 ? 'validate' : 'invalid';
};

// Mock API call to get repertoire name fields configuration
export const getRepertoireNameFields = async (seanceType: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Mock response with random number of fields (2-4) and acceptable words
  const fieldCount = Math.floor(Math.random() * 3) + 2; // 2, 3, or 4 fields
  
  const mockFieldOptions = [
    ['2023', '2024', '2025'],
    ['event', 'meeting', 'conference', 'workshop'],
    ['paris', 'london', 'berlin', 'madrid'],
    ['team', 'client', 'partner', 'internal'],
    ['morning', 'afternoon', 'evening'],
    ['indoor', 'outdoor', 'hybrid']
  ];
  
  const fields = [];
  for (let i = 0; i < fieldCount; i++) {
    fields.push({
      id: `field_${i + 1}`,
      label: `Field ${i + 1}`,
      options: mockFieldOptions[i % mockFieldOptions.length]
    });
  }
  
  return {
    fieldCount,
    fields
  };
};

// Mock API call to update repertoire name
export const updateRepertoireName = async (
  seanceType: string, 
  oldRepertoireName: string, 
  newRepertoireName: string
) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  console.log('Updating repertoire name:', {
    seanceType,
    oldRepertoireName,
    newRepertoireName
  });
  
  // Mock successful response
  return {
    success: true,
    message: 'Repertoire name updated successfully',
    newRepertoireName
  };
};