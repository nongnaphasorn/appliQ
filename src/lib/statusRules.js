import { today } from './dates.js';

export const historyEntry = (from, to, note = '') => ({ at: new Date().toISOString(), from, to, note });

// The ONE place that decides what happens when an application changes status.
// Used by the Kanban drag, the status dropdown and the edit form.
export function moveStatus(app, status, extra = {}, note = '') {
  const next = { ...app, ...extra, status };
  if (status === 'Applied' && !next.appliedDate) next.appliedDate = today();
  if (status !== app.status || note) next.history = [...(app.history || []), historyEntry(app.status, status, note)];
  return next;
}
