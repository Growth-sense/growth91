/**
 * Utility function to calculate time elapsed since last update
 * @param {string} udPublishedDate - UTC timestamp in format "YYYY-MM-DD HH:MM:SS"
 * @returns {string} - Formatted time elapsed text
 */
export const getTimeElapsed = (udPublishedDate) => {
  // Check if the date is invalid or default value
  if (!udPublishedDate || udPublishedDate === "0000-00-00 00:00:00") {
    return null;
  }

  try {
    // Parse the UTC timestamp
    const publishedDate = new Date(udPublishedDate + " UTC");
    const currentDate = new Date();
    
    // Calculate difference in milliseconds
    const diffMs = currentDate - publishedDate;
    
    // Convert to different time units
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.floor(diffDays / 7);

    // Apply the badge text logic
    if (diffHours <= 1) {
      return "Updated just now";
    } else if (diffHours <= 24) {
      return "Updated today";
    } else if (diffDays === 2) {
      return "Updated 2 days ago";
    } else if (diffDays >= 3 && diffDays <= 7) {
      return `Updated ${diffDays} days ago`;
    } else if (diffDays > 7 && diffDays <= 14) {
      return "Updated 1 week ago";
    } else if (diffDays > 14 && diffDays <= 21) {
      return "Updated 2 weeks ago";
    } else if (diffWeeks > 2) {
      return `Updated ${diffWeeks} weeks ago`;
    }
    
    return "Updated recently";
  } catch (error) {
    console.error("Error parsing date:", error);
    return null;
  }
};
