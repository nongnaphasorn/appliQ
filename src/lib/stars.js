// Stars are DERIVED from existing data (single source of truth). Nothing extra is stored.
import { SENT_STATUSES } from '../constants.js';
export function countStars({ apps, tasks }) {
  const sent = apps.filter((a) => SENT_STATUSES.includes(a.status)).length;
  const done = tasks.filter((t) => t.done).length;
  const interviews = apps.filter((a) => a.interviewDate).length;
  const offers = apps.filter((a) => a.status === 'Offer').length;
  return { sent, done, total: sent * 3 + done + interviews * 2 + offers * 5 };
}
