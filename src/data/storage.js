// The ONLY file in the frontend that touches localStorage.
// Later (backend step) this is the one place we swap for API calls.
export function load(key, seed) {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? seed : (JSON.parse(raw) ?? seed);
  } catch {
    return seed;
  }
}
export function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage full or blocked: ignore */
  }
}
