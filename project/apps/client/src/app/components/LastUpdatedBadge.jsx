import React from "react";
import { getTimeElapsed } from "../utils/timeUtils";

/**
 * LastUpdatedBadge component to display time elapsed since last update
 * @param {string} udPublishedDate - UTC timestamp in format "YYYY-MM-DD HH:MM:SS"
 */
export const LastUpdatedBadge = ({ udPublishedDate }) => {
  const timeElapsed = getTimeElapsed(udPublishedDate);

  // Don't render if no valid time elapsed
  if (!timeElapsed) {
    return null;
  }

  return (
    <div className="last-updated-badge">
      {timeElapsed}
    </div>
  );
};
