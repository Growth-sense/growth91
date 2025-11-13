import React, { useState, useEffect, useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './CoverImageCarousel.css';

/**
 * Cover Image Carousel Component
 * - Shows single static image if only 1 image
 * - Shows carousel with navigation if multiple images
 * - Auto-play with 4 second interval
 * - Responsive with proper 16:9 aspect ratio
 */
const CoverImageCarousel = ({
    images = [],
    baseUrl = '',
    imageUrls = null, // Optional: full URLs for each image (for mixed old/new images)
    altText = 'Cover Image',
    autoPlayInterval = 4000,
    showControls = true,
    onImageClick = null, // Optional: callback when image is clicked
    isPaused = false // Optional: external control to pause carousel
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isManuallyPaused, setIsManuallyPaused] = useState(false);
    const autoPlayRef = useRef(null);

    // Detect mobile device
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Auto-play functionality
    useEffect(() => {
        // Clear any existing interval first
        if (autoPlayRef.current) {
            clearInterval(autoPlayRef.current);
            autoPlayRef.current = null;
        }

        // Only auto-play if multiple images and conditions are met
        if (images.length > 1 && !isManuallyPaused && !isPaused) {
            autoPlayRef.current = setInterval(() => {
                setCurrentIndex((prevIndex) =>
                    prevIndex === images.length - 1 ? 0 : prevIndex + 1
                );
            }, autoPlayInterval);
        }

        return () => {
            if (autoPlayRef.current) {
                clearInterval(autoPlayRef.current);
                autoPlayRef.current = null;
            }
        };
    }, [images.length, autoPlayInterval, isManuallyPaused, isPaused]);

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    // Handle click on image to pause carousel
    const handleImageClick = () => {
        if (onImageClick) {
            // Build full image URLs array
            const fullImageUrls = images.map((_, index) => getImageUrl(index));
            onImageClick(currentIndex, fullImageUrls);
        } else {
            if (isManuallyPaused) {
                // Resuming - clear hover state to force carousel to start
                setIsManuallyPaused(false);
                setIsHovered(false);
            } else {
                // Pausing
                setIsManuallyPaused(true);
            }
        }
    };

    // Handle empty images
    if (!images || images.length === 0) {
        return (
            <div className="cover-carousel-container">
                <div className="cover-carousel-placeholder">
                    <p>No cover image available</p>
                </div>
            </div>
        );
    }

    const isMultipleImages = images.length > 1;
    const showNavigationControls = isMultipleImages && showControls;

    // Determine image URLs
    const getImageUrl = (index) => {
        if (imageUrls && imageUrls[index]) {
            return imageUrls[index];
        } else {
            return `${baseUrl}${images[index]}`;
        }
    };

    return (
        <div
            className="cover-carousel-container"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image Display */}
            <div className="cover-carousel-wrapper">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`cover-carousel-slide ${index === currentIndex ? 'active' : ''} ${isManuallyPaused && index === currentIndex ? 'paused' : ''}`}
                        onClick={handleImageClick}
                        style={{ cursor: images.length > 1 ? 'pointer' : 'default' }}
                    >
                        <img
                            src={getImageUrl(index)}
                            alt={`${altText} ${index + 1}`}
                            className="cover-carousel-image"
                            loading={index === 0 ? 'eager' : 'lazy'}
                        />
                    </div>
                ))}
            </div>

            {/* Navigation Arrows - Only show for multiple images */}
            {showNavigationControls && (isHovered || isMobile) && (
                <>
                    <button
                        className="cover-carousel-arrow cover-carousel-arrow-left"
                        onClick={goToPrevious}
                        aria-label="Previous image"
                    >
                        <FaChevronLeft />
                    </button>
                    <button
                        className="cover-carousel-arrow cover-carousel-arrow-right"
                        onClick={goToNext}
                        aria-label="Next image"
                    >
                        <FaChevronRight />
                    </button>
                </>
            )}

            {/* Dot Indicators - Only show for multiple images */}
            {showNavigationControls && (
                <div className="cover-carousel-dots">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            className={`cover-carousel-dot ${index === currentIndex ? 'active' : ''
                                }`}
                            onClick={() => goToSlide(index)}
                            aria-label={`Go to image ${index + 1}`}
                        />
                    ))}
                </div>
            )}

            {/* Image Counter */}
            {showNavigationControls && (
                <div className="cover-carousel-counter">
                    {currentIndex + 1} / {images.length}
                </div>
            )}
        </div>
    );
};

export default CoverImageCarousel;
