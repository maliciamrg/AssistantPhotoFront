import React, {useCallback, useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import Slider from 'react-slick';
import {
    fetchThumbnail,
    getPhotos,
    getphotoshootNameFields,
    getPhotoshootTypes,
    updatePhoto, updatePhotoPick,
    updatephotoshootName, updatePhotoStar,
    validatephotoShoot
} from '../api';
import {Photo, PhotoMetadataDTO, PhotoshootType} from '../types';
import {
    AlertCircle,
    Calendar,
    Check,
    CheckCircle,
    Edit3,
    Filter,
    Flag,
    Image,
    Loader,
    LogOut,
    Star,
    X,
    XCircle
} from 'lucide-react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type FilterType = {
    stars: number | null;
    flag: 'all' | 'pick' | 'reject' | 'unflagged';
};

type photoShootField = {
    id: string;
    label: string;
    options: string[];
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
    const [PhotoshootType, setPhotoshootType] = useState<PhotoshootType | null>(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [filters, setFilters] = useState<FilterType>({stars: null, flag: 'all'});
    const [contextMenu, setContextMenu] = useState<{ x: number; y: number; photoId: string | null }>({
        x: 0,
        y: 0,
        photoId: null,
    });
    const [isSending, setIsSending] = useState(false);
    const [sliderKey, setSliderKey] = useState(0);
    const [sliderRef, setSliderRef] = useState<Slider | null>(null);
    const [validationStatus, setValidationStatus] = useState<'loading' | 'validate' | 'invalid' | null>(null);
    const [showphotoShootEditor, setShowphotoShootEditor] = useState(false);
    const [photoShootFields, setphotoShootFields] = useState<photoShootField[]>([]);
    const [selectedFieldValues, setSelectedFieldValues] = useState<Record<string, string>>({});
    const [isLoadingFields, setIsLoadingFields] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isUpdatingName, setIsUpdatingName] = useState(false);
    const [currentphotoshootName, setCurrentphotoshootName] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
//  const photoShootPath = location.state?.photoShootPath || 'Unknown photoShoot';
    const initialPhotoshootName = location.state?.photoshootName || 'Unknown photoShoot';
    const photoshootTypeName = location.state?.photoshootTypeName;
    const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);

    useEffect(() => {
        setCurrentphotoshootName(initialPhotoshootName);
    }, [initialPhotoshootName]);

    useEffect(() => {
        const fetchData = async () => {
            if (currentphotoshootName && currentphotoshootName !== 'Unknown photoShoot' && currentphotoshootName !== '.') {
                setIsLoading(true);
                setValidationStatus('loading');
                try {
                    const [photosList, types]: [Photo[], PhotoshootType[]] = await Promise.all([
                        getPhotos(photoshootTypeName, currentphotoshootName),
                        getPhotoshootTypes()
                    ]);
                    setPhotos(Array.isArray(photosList) ? photosList : []);
                    const currentType = types.find(t => t.photoshootTypeEnum === photoshootTypeName);
                    console.trace("photoshootTypeName", photoshootTypeName)
                    console.trace("currentType", currentType)
                    setPhotoshootType(currentType || null);
                } catch (error) {
                    console.error('Error fetching data:', error);
                    setPhotos([]);
                } finally {
                    setIsLoading(false);
                }
                try {
                    const result = await validatephotoShoot(photoshootTypeName,currentphotoshootName);
                    setValidationStatus(result as 'validate' | 'invalid');
                } catch (error) {
                    console.error('Error validating photoShoot:', error);
                    setValidationStatus('invalid');
                }
            }
        };
        fetchData();
    }, [photoshootTypeName,currentphotoshootName]);

    const handleValidationIconClick = async () => {
        if (validationStatus === 'invalid') {
            setIsLoadingFields(true);
            setShowphotoShootEditor(true);
            try {
                const fieldsData = await getphotoshootNameFields(photoshootTypeName);
                setphotoShootFields(fieldsData.fields);
                setSelectedFieldValues({});
            } catch (error) {
                console.error('Error fetching photoShoot fields:', error);
            } finally {
                setIsLoadingFields(false);
            }
        }
    };

    const handleFieldValueChange = (fieldId: string, value: string) => {
        setSelectedFieldValues(prev => ({
            ...prev,
            [fieldId]: value
        }));
    };

    const handlephotoshootNameUpdate = async () => {
        const allFieldsSelected = photoShootFields.every(field => selectedFieldValues[field.id]);

        if (!allFieldsSelected) {
            alert('Please select a value for each field');
            return;
        }

        const newphotoshootName = photoShootFields
            .map(field => selectedFieldValues[field.id])
            .join('_');

        setIsUpdatingName(true);
        try {
            await updatephotoshootName(photoshootTypeName, currentphotoshootName, newphotoshootName);
            setCurrentphotoshootName(newphotoshootName);
            setShowphotoShootEditor(false);
            setSelectedFieldValues({});
            // Trigger validation check for the new name
            setValidationStatus('loading');
            const result = await validatephotoShoot(photoshootTypeName,newphotoshootName);
            setValidationStatus(result as 'validate' | 'invalid');
        } catch (error) {
            console.error('Error updating photoShoot name:', error);
            alert('Failed to update photoShoot name');
        } finally {
            setIsUpdatingName(false);
        }
    };

    const calculateDateRange = () => {
        if (photos.length === 0) return null;

        const dates = photos.map(photo => new Date(photo.exifDate));
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
        if (!PhotoshootType || !dateRange) return null;
        if (PhotoshootType.uniteDeJour === 0) return null;

        const maxPhotos = Math.floor((dateRange.diffDays / PhotoshootType.uniteDeJour) * PhotoshootType.nbMaxParUniteDeJour);
        return maxPhotos;
    };

    const maxPhotos = calculateMaxPhotos();
    const pickedPhotos = photos.filter(p => p.pick == 1).length;
    const unflagPhotos = photos.filter(p => p.pick == 0).length;
    const isOverLimit = maxPhotos !== null && pickedPhotos > maxPhotos;
    const isOverLimitUnflag = unflagPhotos > 0;

    const calculateStarLimits = () => {
        if (!PhotoshootType?.ratioStarMax || pickedPhotos === 0) return null;
        return PhotoshootType.ratioStarMax.map((ratio, index) => ({
            stars: index + 1,
            maxAllowed: Math.max(1, Math.floor(pickedPhotos * (ratio / 100))),
        }));
    };

    const starLimits = calculateStarLimits();

    const photoStats = {
        stars: {
            5: photos.filter(p => p.pick === 1 && p.rating === 5).length,
            4: photos.filter(p => p.pick === 1 && p.rating === 4).length,
            3: photos.filter(p => p.pick === 1 && p.rating === 3).length,
            2: photos.filter(p => p.pick === 1 && p.rating === 2).length,
            1: photos.filter(p => p.pick === 1 && p.rating === 1).length,
        },
        picks: pickedPhotos,
        rejects: photos.filter(p => p.pick === -1).length,
        noFlag: photos.filter(p => p.pick === 0).length,
    };

    const filteredPhotos = photos.filter(photo => {
        if (filters.stars !== null && photo.rating !== filters.stars) {
            return false;
        }

        switch (filters.flag) {
            case 'pick':
                if (photo.pick !== 1) return false;
                break;
            case 'reject':
                if (photo.pick !== -1) return false;
                break;
            case 'unflagged':
                if (photo.pick !== 0) return false;
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

    useEffect(() => {
        console.log("fetchThumbnail?")
        if (filteredPhotos.length === 0 || showphotoShootEditor) return;
        const currentPhoto = filteredPhotos[currentSlide];
        console.log("currentPhoto", currentPhoto.id)
        let isMounted = true;
        let objectUrl: string;
        setIsLoading(true);
        try {
            fetchThumbnail(currentPhoto.id).then((url) => {
                if (isMounted) {
                    objectUrl = url;
                    setThumbnailUrl(url);
                }
            });
        } catch (error) {
            console.error('Error retieve thumbnail', error);
        } finally {
            setIsLoading(false);
        }

        return () => {
            isMounted = false;
            if (objectUrl) URL.revokeObjectURL(objectUrl);
        };
    }, [filteredPhotos[currentSlide]?.id]);


    const handleAction = async (pick: number, star: number) => {
        if (contextMenu.photoId) {
            try {
                const updates: Partial<PhotoMetadataDTO> = {};
                if (pick !== 99) {
                    updates.pick = pick;
                }
                if (star !== 99) {
                    updates.rating = star;
                }
                const updatedPhoto = await updatePhoto(contextMenu.photoId, updates);
                setPhotos(photos.map(photo =>
                    photo.id === updatedPhoto.id ? updatedPhoto : photo
                ));
            } catch (error) {
                console.error('Error updating photo:', error);
            }
        }
        setContextMenu({x: 0, y: 0, photoId: null});
    };

    const handleRefreshPhotos = async () => {
        setIsSending(true);
        try {
            const [photosList] = await Promise.all([
                getPhotos(photoshootTypeName, currentphotoshootName,false)
            ]);
            alert('Photos have been successfully retrieve from the API');
            setPhotos(Array.isArray(photosList) ? photosList : []);
        } catch (error) {
            console.error('Error sending photos:', error);
            alert('Failed to retrieve photos from the API');
        } finally {
            setIsSending(false);
        }
    };

    const handleClickOutside = useCallback((e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!target.closest('.context-menu') && !target.closest('.photoShoot-editor')) {
            setContextMenu({x: 0, y: 0, photoId: null});
            if (!isLoadingFields && !isUpdatingName) {
                setShowphotoShootEditor(false);
            }
        }
    }, [isLoadingFields, isUpdatingName]);

    const handleKeyPress = useCallback(async (e: KeyboardEvent) => {
        console.trace("handleKeyPress")
        if (filteredPhotos.length === 0 || showphotoShootEditor) return;

        const currentPhoto = filteredPhotos[currentSlide];
        if (!currentPhoto) return;
        console.trace("currentPhoto", currentPhoto?.id);

        const key = e.key.toLowerCase();
        console.trace("key", key);

        try {
            if (['0', '1', '2', '3', '4', '5'].includes(key)) {
                const starValue = parseInt(key, 10);
                const updatedPhoto = await updatePhotoStar(currentPhoto.id, starValue);
                setPhotos(photos.map(photo =>
                    photo.id === updatedPhoto.id ? updatedPhoto : photo
                ));
            } else if (key === 'p') {
                const updatedPhoto = await updatePhotoPick(currentPhoto.id, currentPhoto.pick === 1 ? 0 : 1);
                setPhotos(photos.map(photo =>
                    photo.id === updatedPhoto.id ? updatedPhoto : photo
                ));
            } else if (key === 'x') {
                const updatedPhoto = await updatePhotoPick(currentPhoto.id, currentPhoto.pick === -1 ? 0 : -1);
                setPhotos(photos.map(photo =>
                    photo.id === updatedPhoto.id ? updatedPhoto : photo
                ));
            }
        } catch (error) {
            console.error('Error updating photo:', error);
        }
    }, [photos, currentSlide, filteredPhotos, showphotoShootEditor]);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (!sliderRef || showphotoShootEditor) return;

        if (e.key === 'ArrowLeft') {
            sliderRef.slickPrev();
        } else if (e.key === 'ArrowRight') {
            sliderRef.slickNext();
        }
    }, [sliderRef, showphotoShootEditor]);

    useEffect(() => {
        window.addEventListener('keypress', handleKeyPress);
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keypress', handleKeyPress);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyPress, handleKeyDown]);

    const renderStars = (count: number) => {
        return Array.from({length: 5}, (_, index) => (
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

    const renderValidationIcon = () => {
        switch (validationStatus) {
            case 'loading':
                return <Loader className="w-6 h-6 text-blue-500 animate-spin"/>;
            case 'validate':
                return <CheckCircle className="w-6 h-6 text-green-500"/>;
            case 'invalid':
                return (
                    <XCircle
                        className="w-6 h-6 text-red-500 cursor-pointer hover:text-red-700 transition-colors"
                        onClick={handleValidationIconClick}
                        //            title="Click to edit photoShoot name"
                    />
                );
            default:
                return null;
        }
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
                            <button
                                onClick={handleRefreshPhotos}
                                disabled={isSending}
                                className={`px-4 py-2 text-gray-700 hover:text-gray-900 flex items-center gap-2 ${
                                    isSending ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            >
                                <Check className={`w-5 h-5 ${isSending ? 'animate-spin' : ''}`}/>
                                {isSending ? 'Reading...' : 'Refresh'}
                            </button>
                        </div>
                        <button
                            onClick={() => navigate('/')}
                            className="px-4 py-2 text-gray-700 hover:text-gray-900 flex items-center gap-2"
                        >
                            <LogOut className="w-5 h-5"/>
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <div className="flex flex-col space-y-4">
                        <div className="flex items-center gap-3">
                            {renderValidationIcon()}
                            <h2 className="text-2xl font-bold text-gray-800">{currentphotoshootName}</h2>
                        </div>

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
                                            <span
                                                className={`${isOverStarLimit ? 'text-red-600 font-bold' : 'text-gray-600'}`}>
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
                                <div
                                    className={`flex items-center gap-2 ${isOverLimit ? 'bg-red-100 p-2 rounded-md' : ''}`}>
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
                                    <span className={`${isOverLimitUnflag ? 'text-red-600 font-bold' : 'text-gray-600'}`}>{photoStats.noFlag} unflagged</span>
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

                {isLoading && (
                    <div className="fixed inset-0 bg-white bg-opacity-70 z-50 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
                    </div>
                )}
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
                                            src={thumbnailUrl || "/no_images.svg"}
                                            alt="Photo"
                                            className="content-center h-full object-cover rounded-lg mx-auto"
                                        />
                                        {photo.pick !== 0 && (
                                            <div className="absolute top-2 right-2 flex items-center gap-2 bg-gray-300">
                                                <Flag
                                                    className={`w-5 h-5 ${photo.pick === 1 ? 'text-white' : 'text-black'}`}
                                                    fill="currentColor"
                                                />
                                            </div>
                                        )}
                                        <div className="absolute top-2 left-2 flex gap-1">
                                            {renderStars(photo.rating)}
                                        </div>
                                        <div className="absolute bottom-2 left-2 right-2 flex justify-center">
                                            <div
                                                className="bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                                                {formatDate(photo.exifDate)}
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

            {/* photoShoot Name Editor Modal */}
            {showphotoShootEditor && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4 photoShoot-editor">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                <Edit3 className="w-5 h-5"/>
                                Edit photoShoot Name
                            </h3>
                            <button
                                onClick={() => setShowphotoShootEditor(false)}
                                disabled={isLoadingFields || isUpdatingName}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X className="w-5 h-5"/>
                            </button>
                        </div>

                        {isLoadingFields ? (
                            <div className="flex items-center justify-center py-8">
                                <Loader className="w-8 h-8 text-indigo-600 animate-spin"/>
                                <span className="ml-2 text-gray-600">Loading fields...</span>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="text-sm text-gray-600 mb-4">
                                    Current name: <span className="font-medium">{currentphotoshootName}</span>
                                </div>

                                {photoShootFields.map((field) => (
                                    <div key={field.id}>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {field.label}
                                        </label>
                                        <select
                                            value={selectedFieldValues[field.id] || ''}
                                            onChange={(e) => handleFieldValueChange(field.id, e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            disabled={isUpdatingName}
                                        >
                                            <option value="">Select {field.label.toLowerCase()}</option>
                                            {field.options.map((option) => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                ))}

                                {photoShootFields.length > 0 && (
                                    <div className="mt-4 p-3 bg-gray-50 rounded-md">
                                        <div className="text-sm text-gray-600">Preview:</div>
                                        <div className="font-medium text-gray-800">
                                            {photoShootFields.map(field => selectedFieldValues[field.id] || `[${field.label}]`).join('_')}
                                        </div>
                                    </div>
                                )}

                                <div className="flex gap-3 mt-6">
                                    <button
                                        onClick={handlephotoshootNameUpdate}
                                        disabled={
                                            isUpdatingName ||
                                            !photoShootFields.every(field => selectedFieldValues[field.id])
                                        }
                                        className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {isUpdatingName ? (
                                            <>
                                                <Loader className="w-4 h-4 animate-spin"/>
                                                Updating...
                                            </>
                                        ) : (
                                            'Update Name'
                                        )}
                                    </button>
                                    <button
                                        onClick={() => setShowphotoShootEditor(false)}
                                        disabled={isUpdatingName}
                                        className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors disabled:opacity-50"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {contextMenu.photoId && (
                <div
                    className="fixed bg-white rounded-lg shadow-lg py-2 w-48 context-menu"
                    style={{top: contextMenu.y, left: contextMenu.x}}
                >
                    <button
                        onClick={() => handleAction(1, 99)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                        Pick
                    </button>
                    <button
                        onClick={() => handleAction(-1, 99)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                        Reject
                    </button>
                    <button
                        onClick={() => handleAction(0, 99)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                        UnFlag
                    </button>
                    <button
                        onClick={() => handleAction(99, 0)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                        Star (0)
                    </button>
                    <button
                        onClick={() => handleAction(99, 1)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                        Star (1)
                    </button>
                    <button
                        onClick={() => handleAction(99, 2)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                        Star (2)
                    </button>
                    <button
                        onClick={() => handleAction(99, 3)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                        Star (3)
                    </button>
                    <button
                        onClick={() => handleAction(99, 4)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                        Star (4)
                    </button>
                    <button
                        onClick={() => handleAction(99, 5)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                        Star (5)
                    </button>
                </div>
            )}
        </div>
    );
}