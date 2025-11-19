import React, { useState, useEffect, useRef } from 'react';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import './ImageLightbox.css';

/**
 * Image Lightbox Component
 * - Fullscreen modal for viewing images
 * - Navigation with arrows and keyboard
 * - Click outside to close
 * - ESC key to close
 * - Auto-play with 4 second interval
 */
const ImageLightbox = ({
    images = [],
    initialIndex = 0,
    isOpen = false,
    onClose
}) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [isHovered, setIsHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
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

    // Update current index when initialIndex changes
    useEffect(() => {
        setCurrentIndex(initialIndex);
    }, [initialIndex]);

    // Handle keyboard navigation
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            } else if (e.key === 'ArrowLeft') {
                goToPrevious();
            } else if (e.key === 'ArrowRight') {
                goToNext();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, currentIndex, images.length]);

    // Prevent body scroll when lightbox is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Auto-play functionality
    useEffect(() => {
        if (!isOpen || images.length <= 1) return;

        // Always auto-play in lightbox for better experience
        autoPlayRef.current = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 6500); // 4 second interval

        return () => {
            if (autoPlayRef.current) {
                clearInterval(autoPlayRef.current);
            }
        };
    }, [isOpen, images.length]);

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

    const handleBackdropClick = (e) => {
        if (e.target.classList.contains('lightbox-backdrop')) {
            onClose();
        }
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    if (!isOpen || !images || images.length === 0) {
        return null;
    }

    return (
        <div
            className="lightbox-backdrop"
            onClick={handleBackdropClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="lightbox-container">
                {/* Close Button */}
                <button
                    className="lightbox-close"
                    onClick={onClose}
                    aria-label="Close lightbox"
                >
                    <FaTimes />
                </button>

                {/* Image Display */}
                <div className="lightbox-image-wrapper">
                    <img
                        src={images[currentIndex]}
                        alt={`Image ${currentIndex + 1}`}
                        className="lightbox-image"
                    />
                </div>

                {/* Navigation Arrows - Only show for multiple images */}
                {images.length > 1 && (
                    <>
                        <button
                            className="lightbox-arrow lightbox-arrow-left"
                            onClick={goToPrevious}
                            aria-label="Previous image"
                        >
                            <FaChevronLeft />
                        </button>
                        <button
                            className="lightbox-arrow lightbox-arrow-right"
                            onClick={goToNext}
                            aria-label="Next image"
                        >
                            <FaChevronRight />
                        </button>
                    </>
                )}

                {/* Image Counter */}
                {images.length > 1 && (
                    <div className="lightbox-counter">
                        {currentIndex + 1} / {images.length}
                    </div>
                )}

                {/* Thumbnail Strip (optional, for multiple images) */}
                {images.length > 1 && (
                    <div className="lightbox-thumbnails">
                        {images.map((image, index) => (
                            <div
                                key={index}
                                className={`lightbox-thumbnail ${index === currentIndex ? 'active' : ''}`}
                                onClick={() => setCurrentIndex(index)}
                            >
                                <img src={image} alt={`Thumbnail ${index + 1}`} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageLightbox;
