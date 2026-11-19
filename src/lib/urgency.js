import { days } from './dates.js';

// Urgency is DERIVED from a date and changes by itself as time passes. Never stored.
export function urgencyOf(dateStr) {
  if (!dateStr) return null;
  const d = days(dateStr);
  if (d < 0) return { key: 'overdue', label: 'Overdue' };
  if (d === 0) return { key: 'urgent', label: 'Today' };
  const label = d + (d === 1 ? ' day left' : ' days left');
  return { key: d <= 3 ? 'urgent' : d <= 7 ? 'soon' : 'ok', label };
}
