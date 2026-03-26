/**
 * Formats a date into a human-readable relative time string.
 * e.g. "just now", "5 minutes ago", "2 hours ago", "Mar 20"
 *
 * @param {string|Date} date - ISO string, timestamp, or already-formatted date string
 * @returns {string}
 */
export function formatRelativeTime(date) {
  if (!date) return '';

  // Try to parse the date
  let dateObj = date instanceof Date ? date : new Date(date);

  // If parsing fails (e.g., "Mar 26, 2026" from DEV.to readable_publish_date), return as-is
  if (isNaN(dateObj.getTime())) {
    return date;
  }

  const now = new Date();
  const diffMs = now - dateObj;
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return 'just now';
  if (diffMins < 60) return `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;

  // Fallback: Month + Day (+ Year if not current year)
  const options = { month: 'short', day: 'numeric' };
  if (dateObj.getFullYear() !== now.getFullYear()) {
    options.year = 'numeric';
  }
  return dateObj.toLocaleDateString('en-US', options);
}
