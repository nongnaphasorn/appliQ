import { useEffect, useState } from 'react';
import { load, save } from '../data/storage.js';

// Same behaviour as before, but it no longer touches localStorage itself:
// all storage access goes through data/storage.js.
export function useStore(key, seed) {
  const [value, setValue] = useState(() => load(key, seed));
  useEffect(() => {
    save(key, value);
  }, [key, value]);
  return [value, setValue];
}
