export function getAbsoluteUrl(url){
    return url.startsWith('http') ? url : `https://${url}`
}


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
};