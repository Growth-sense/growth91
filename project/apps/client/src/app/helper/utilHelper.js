export const getAbsoluteUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  return `https://${url}`;
};

/**
 * Parse banner image - handles both old (single string) and new (array) formats
 * Returns the first image for thumbnail/preview use
 * @param {string} bannerImageData - JSON string from database (can be single image or array)
 * @returns {string|null} - First image filename or null
 */
export const parseBannerImage = (bannerImageData) => {
  if (!bannerImageData) return null;
  
  try {
    const parsed = JSON.parse(bannerImageData);
    
    // If it's an array, return first image
    if (Array.isArray(parsed)) {
      return parsed.length > 0 ? parsed[0] : null;
    }
    
    // If it's a string (old format), return as-is
    if (typeof parsed === 'string') {
      return parsed;
    }
    
    return null;
  } catch (error) {
    // If JSON.parse fails, it might be a plain string (very old format)
    return bannerImageData;
  }
};

/**
 * Parse banner images - returns full array for carousel
 * @param {string} bannerImageData - JSON string from database
 * @returns {Array<string>} - Array of image filenames
 */
export const parseBannerImages = (bannerImageData) => {
  if (!bannerImageData) return [];
  
  try {
    const parsed = JSON.parse(bannerImageData);
    
    // If it's already an array, return it
    if (Array.isArray(parsed)) {
      return parsed;
    }
    
    // If it's a string (old format), wrap in array
    if (typeof parsed === 'string') {
      return [parsed];
    }
    
    return [];
  } catch (error) {
    // If JSON.parse fails, wrap plain string in array
    return [bannerImageData];
  }
};

export function extractVideoIDFromYoutubeUrl(url) {
    if (!url) return '';

    // Regular expressions to match different YouTube URL formats
    const regexPatterns = [
        // Standard YouTube URL: https://www.youtube.com/watch?v=VIDEO_ID
        /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/,
        
        // Short YouTube URL: https://youtu.be/VIDEO_ID
        /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^?]+)/,
        
        // YouTube embed URL: https://www.youtube.com/embed/VIDEO_ID
        /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^?]+)/,
        
        // YouTube shortened with feature: https://www.youtube.com/watch?feature=player_embedded&v=VIDEO_ID
        /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?feature=player_embedded&v=([^&]+)/,
        
        // Handle URLs with v= parameter not at the beginning: https://www.youtube.com/watch?other=param&v=VIDEO_ID
        /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?(?:.+&)?v=([^&]+)/
    ];

    // Try to match the URL with each pattern
    for (const pattern of regexPatterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
            return match[1];
        }
    }

    // If no pattern matches, return the original URL
    return url;
}