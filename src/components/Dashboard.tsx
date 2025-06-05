import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Slider from 'react-slick';
import { getPhotos, updatePhoto, sendUpdatedPhotos, getSeanceTypes, updateGetPhotos } from '../api';
import { Photo, SeanceType } from '../types';
import { Settings, LogOut, Check, Star, Flag, Calendar, AlertCircle, Image, Filter } from 'lucide-react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type FilterType = {
  stars: number | null;
  flag: 'all' | 'pick' | 'reject' | 'unflagged';
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(date);
};

export default function Dashboard() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [seanceType, setSeanceType] = useState<SeanceType | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [filters, setFilters] = useState<FilterType>({ stars: null, flag: 'all' });
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; photoId: string | null }>({
    x: 0,
    y: 0,
    photoId: null,
  });
  const [isSending, setIsSending] = useState(false);
  const [sliderKey, setSliderKey] = useState(0);
  const [sliderRef, setSliderRef] = useState<Slider | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const repertoirePath = location.state?.repertoirePath || 'Unknown Repertoire';
  const repertoireName = location.state?.repertoireName || 'Unknown Repertoire';
  const typeId = location.state?.typeId;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [photosList, types] = await Promise.all([
          getPhotos(typeId,repertoireName),
          getSeanceTypes()
        ]);
        setPhotos(Array.isArray(photosList) ? photosList : []);
        const currentType = types.find(t => t.id === typeId);
        setSeanceType(currentType || null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setPhotos([]);
      }
    };
    fetchData();
  }, [typeId]);

  const calculateDateRange = () => {
    if (photos.length === 0) return null;
    
    const dates = photos.map(photo => new Date(photo.date_taken));
    const minDate = new Date(Math.min(...dates.map(d => d.getTime())));
    const maxDate = new Date(Math.max(...dates.map(d => d.getTime())));
    
    const diffTime = Math.abs(maxDate.getTime() - minDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return {
      minDate,
      maxDate,
      diffDays
    };
  };

  const dateRange = calculateDateRange();

  const calculateMaxPhotos = () => {
    if (!seanceType || !dateRange) return null;
    if (seanceType.uniteDeJour === 0) return null;
    
    const maxPhotos = Math.floor((dateRange.diffDays / seanceType.uniteDeJour) * seanceType.nbMaxParUniteDeJour);
    return maxPhotos;
  };

  const maxPhotos = calculateMaxPhotos();
  const pickedPhotos = photos.filter(p => p.flagged && p.flagType === 'pick').length;
  const isOverLimit = maxPhotos !== null && pickedPhotos > maxPhotos;

  const calculateStarLimits = () => {
    if (!seanceType?.ratioStarMax || pickedPhotos === 0) return null;
    
    return seanceType.ratioStarMax.map((ratio, index) => ({
      stars: index + 1,
      maxAllowed: Math.max(1, Math.floor(pickedPhotos * (ratio / 100))),
    }));
  };

  const starLimits = calculateStarLimits();

  const photoStats = {
    stars: {
      5: photos.filter(p => p.flagged && p.flagType === 'pick' && p.starred === 5).length,
      4: photos.filter(p => p.flagged && p.flagType === 'pick' && p.starred === 4).length,
      3: photos.filter(p => p.flagged && p.flagType === 'pick' && p.starred === 3).length,
      2: photos.filter(p => p.flagged && p.flagType === 'pick' && p.starred === 2).length,
      1: photos.filter(p => p.flagged && p.flagType === 'pick' && p.starred === 1).length,
    },
    picks: pickedPhotos,
    rejects: photos.filter(p => p.flagged && p.flagType === 'reject').length,
    noFlag: photos.filter(p => !p.flagged).length,
  };

  const filteredPhotos = photos.filter(photo => {
    if (filters.stars !== null && photo.starred !== filters.stars) {
      return false;
    }

    switch (filters.flag) {
      case 'pick':
        if (!photo.flagged || photo.flagType !== 'pick') return false;
        break;
      case 'reject':
        if (!photo.flagged || photo.flagType !== 'reject') return false;
        break;
      case 'unflagged':
        if (photo.flagged) return false;
        break;
    }

    return true;
  });


  useEffect(() => {
    if (filteredPhotos.length === 0) {
      setCurrentSlide(0);
    } else if (currentSlide >= filteredPhotos.length) {
      setCurrentSlide(Math.max(0, filteredPhotos.length - 1));
    }
    setSliderKey(prev => prev + 1);
  }, [filteredPhotos.length]);

  const handleContextMenu = (e: React.MouseEvent, photoId: string) => {
    e.preventDefault();
    setContextMenu({
      x: e.pageX,
      y: e.pageY,
      photoId,
    });
  };

  const handleAction = async (action: 'flag' | 'unflag' | 'star') => {
    if (contextMenu.photoId) {
      try {
        const updates = {
          flagged: action === 'flag' ? true : action === 'unflag' ? false : undefined,
          flagType: action === 'flag' ? 'pick' : undefined,
          starred: action === 'star' ? 5 : undefined,
        };
        const updatedPhoto = await updatePhoto(contextMenu.photoId, updates);
        setPhotos(photos.map(photo => 
          photo.id === updatedPhoto.id ? updatedPhoto : photo
        ));
      } catch (error) {
        console.error('Error updating photo:', error);
      }
    }
    setContextMenu({ x: 0, y: 0, photoId: null });
  };

  const refreshPhotos = async () => {
    await updateGetPhotos(repertoireName,repertoirePath);
    const [photosList] = await Promise.all([
      getPhotos(typeId,repertoireName)
    ]);
    setPhotos(Array.isArray(photosList) ? photosList : []);
  };

  const handleSendPhotos = async () => {
    try {
      await sendUpdatedPhotos(photos);
      alert('Photos have been successfully sent to the API');
    } catch (error) {
      console.error('Error sending photos:', error);
      alert('Failed to send photos to the API');
    } finally {
      setIsSending(false);
    }
  };

  const handleClickOutside = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.context-menu')) {
      setContextMenu({ x: 0, y: 0, photoId: null });
    }
  }, []);

  const handleKeyPress = useCallback(async (e: KeyboardEvent) => {
    if (filteredPhotos.length === 0) return;
    
    const currentPhoto = filteredPhotos[currentSlide];
    if (!currentPhoto) return;

    const key = e.key.toLowerCase();
    
    try {
      if (['0', '1', '2', '3', '4', '5'].includes(key)) {
        const starValue = parseInt(key, 10);
        const updatedPhoto = await updatePhoto(currentPhoto.id, { starred: starValue });
        setPhotos(photos.map(photo => 
          photo.id === updatedPhoto.id ? updatedPhoto : photo
        ));
      } else if (key === 'p') {
        const newFlaggedState = !currentPhoto.flagged || currentPhoto.flagType !== 'pick';
        const updatedPhoto = await updatePhoto(currentPhoto.id, { 
          flagged: newFlaggedState,
          flagType: newFlaggedState ? 'pick' : undefined
        });
        setPhotos(photos.map(photo => 
          photo.id === updatedPhoto.id ? updatedPhoto : photo
        ));
      } else if (key === 'x') {
        const newFlaggedState = !currentPhoto.flagged || currentPhoto.flagType !== 'reject';
        const updatedPhoto = await updatePhoto(currentPhoto.id, { 
          flagged: newFlaggedState,
          flagType: newFlaggedState ? 'reject' : undefined
        });
        setPhotos(photos.map(photo => 
          photo.id === updatedPhoto.id ? updatedPhoto : photo
        ));
      }
    } catch (error) {
      console.error('Error updating photo:', error);
    }
  }, [photos, currentSlide, filteredPhotos]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!sliderRef) return;

    if (e.key === 'ArrowLeft') {
      sliderRef.slickPrev();
    } else if (e.key === 'ArrowRight') {
      sliderRef.slickNext();
    }
  }, [sliderRef]);

  useEffect(() => {
    window.addEventListener('keypress', handleKeyPress);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keypress', handleKeyPress);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyPress, handleKeyDown]);

  const renderStars = (count: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < count
            ? 'text-yellow-500 fill-yellow-500'
            : 'text-gray-400'
        }`}
      />
    ));
  };

  const sliderSettings = {
    dots: true,
    infinite: filteredPhotos.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0',
    beforeChange: (_: number, next: number) => setCurrentSlide(next),
    initialSlide: currentSlide,
    ref: (slider: Slider) => setSliderRef(slider),
  };

  return (
    <div className="min-h-screen bg-gray-100" onClick={handleClickOutside}>
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button className="px-4 py-2 text-gray-700 hover:text-gray-900 flex items-center gap-2"
                      onClick={refreshPhotos}>
                <Settings className="w-5 h-5" />
                Refresh
              </button>
              <button 
                onClick={handleSendPhotos}
                disabled={isSending}
                className={`px-4 py-2 text-gray-700 hover:text-gray-900 flex items-center gap-2 ${
                  isSending ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <Check className={`w-5 h-5 ${isSending ? 'animate-spin' : ''}`} />
                {isSending ? 'Sending...' : 'Validate'}
              </button>
            </div>
            <button 
              onClick={() => navigate('/')}
              className="px-4 py-2 text-gray-700 hover:text-gray-900 flex items-center gap-2"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex flex-col space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">{repertoireName}</h2>

            <div className="flex items-center gap-6 bg-gray-50 p-3 rounded-lg">
              {dateRange && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-5 h-5"/>
                    <span className="font-medium">{dateRange.diffDays} days</span>
                  </div>
              )}
              {maxPhotos !== null && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Image className="w-5 h-5"/>
                    <span className="font-medium">Max allowed: {maxPhotos} photos</span>
                  </div>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-700">Star Ratings (Picked Photos)</h3>
                {Object.entries(photoStats.stars).reverse().map(([stars, count]) => {
                  const starLimit = starLimits?.find(limit => limit.stars === parseInt(stars));
                  const isOverStarLimit = starLimit && count > starLimit.maxAllowed;

                  return (
                      <div key={stars}
                           className={`flex items-center gap-2 ${isOverStarLimit ? 'bg-red-100 p-2 rounded-md' : ''}`}>
                        <div className="flex">
                          {Array.from({length: parseInt(stars)}, (_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500"/>
                          ))}
                        </div>
                        <span className={`${isOverStarLimit ? 'text-red-600 font-bold' : 'text-gray-600'}`}>
                        {count} photos {starLimit && `(max: ${starLimit.maxAllowed})`}
                      </span>
                        {isOverStarLimit && (
                            <AlertCircle className="w-4 h-4 text-red-500"/>
                        )}
                      </div>
                  );
                })}
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-700">Flags</h3>
                <div className={`flex items-center gap-2 ${isOverLimit ? 'bg-red-100 p-2 rounded-md' : ''}`}>
                  <Flag className="w-4 h-4 text-white fill-current"/>
                  <span className={`${isOverLimit ? 'text-red-600 font-bold' : 'text-gray-600'}`}>
                    {photoStats.picks} picks
                  </span>
                  {isOverLimit && (
                      <AlertCircle className="w-4 h-4 text-red-500"/>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Flag className="w-4 h-4 text-black fill-current"/>
                  <span className="text-gray-600">{photoStats.rejects} rejects</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">{photoStats.noFlag} unflagged</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600"/>
              <span className="font-medium text-gray-700">Filters:</span>
            </div>
            <select
                value={filters.stars?.toString() || ''}
                onChange={(e) => setFilters(prev => ({
                  ...prev,
                  stars: e.target.value === '' ? null : parseInt(e.target.value)
                }))}
                className="px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">All Stars</option>
              {[5, 4, 3, 2, 1, 0].map(stars => (
                  <option key={stars} value={stars}>{stars} Stars</option>
              ))}
            </select>
            <select
                value={filters.flag}
                onChange={(e) => setFilters(prev => ({
                  ...prev,
                  flag: e.target.value as FilterType['flag']
                }))}
                className="px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">All Flags</option>
              <option value="pick">Picked</option>
              <option value="reject">Rejected</option>
              <option value="unflagged">Unflagged</option>
            </select>
            <button
                onClick={() => setFilters({stars: null, flag: 'all'})}
                className="px-3 py-1.5 text-gray-600 hover:text-gray-900 transition-colors"
            >
              Clear Filters
            </button>
            <div className="ml-4 text-sm text-gray-500">
              Showing {filteredPhotos.length} of {photos.length} photos
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          {filteredPhotos.length > 0 ? (
              <Slider {...sliderSettings} key={sliderKey}>
                {filteredPhotos.map((photo) => (
                    <div key={photo.id} className="px-4">
                      <div
                          onContextMenu={(e) => handleContextMenu(e, photo.id)}
                          className="relative aspect-video flex justify-center items-center bg-gray-300"
                      >
                          <img
                              src={`data:image/png;base64,${photo.thumbnail}`}
                              alt="Photo"
                              className="content-center h-full object-cover rounded-lg mx-auto"
                          />
                        {photo.flagged && (
                            <div className="absolute top-2 right-2 flex items-center gap-2 bg-gray-300">
                              <Flag
                                  className={`w-5 h-5 ${photo.flagType === 'pick' ? 'text-white' : 'text-black'}`}
                                  fill="currentColor"
                              />
                            </div>
                        )}
                        <div className="absolute top-2 left-2 flex gap-1">
                          {renderStars(photo.starred)}
                        </div>
                        <div className="absolute bottom-2 left-2 right-2 flex justify-center">
                          <div className="bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                            {formatDate(photo.date_taken)}
                          </div>
                        </div>
                      </div>
                    </div>
                ))}
              </Slider>
          ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No photos match the current filters</p>
              </div>
          )}
        </div>
      </div>

      {contextMenu.photoId && (
          <div
              className="fixed bg-white rounded-lg shadow-lg py-2 w-48 context-menu"
              style={{top: contextMenu.y, left: contextMenu.x}}
          >
            <button
                onClick={() => handleAction('flag')}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Flag
            </button>
            <button
                onClick={() => handleAction('unflag')}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Unflag
            </button>
            <button
                onClick={() => handleAction('star')}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Star (5)
            </button>
          </div>
      )}
    </div>
  );
}
