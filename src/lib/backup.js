// Light validation so a wrong/corrupt file cannot break the app.
export function isValidBackup(d) {
  return !!d && Array.isArray(d.apps) && Array.isArray(d.tasks)
    && d.apps.every((a) => a && typeof a.id === 'string' && typeof a.company === 'string')
    && d.tasks.every((t) => t && typeof t.id === 'string' && typeof t.title === 'string');
}
