import React from 'react';
import { priorityLevel } from '../../lib/priority.js';

// High = 3 stars, Medium = 2, Low = 1 (just for cuteness; the text priority is still stored).
export default function PriorityStars({ level }) {
  const n = priorityLevel(level);
  return (
    <span className="pstars" style={{ display: 'inline-flex', gap: 1, verticalAlign: 'middle' }} title={(level || 'Medium') + ' priority'}>
      {[1, 2, 3].map((i) => (
        <i key={i} className={i <= n ? 'on' : ''}>★</i>
      ))}
    </span>
  );
}
