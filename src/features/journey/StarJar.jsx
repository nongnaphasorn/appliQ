import React from 'react';
import { countStars } from '../../lib/stars.js';

const MAX_VISIBLE = 24;

export default function StarJar({ apps, tasks }) {
  const { total, sent, done } = countStars({ apps, tasks });
  const next = Math.ceil((total + 1) / 10) * 10;
  return (
    <div className="garden jar-card">
      <small className="eyebrow">YOUR STAR JAR</small>
      <div className="jar" role="img" aria-label={total + ' stars collected'}>
        <div className="jar-lid" />
        <div className="jar-body">
          {Array.from({ length: Math.min(total, MAX_VISIBLE) }, (_, i) => (
            <span key={i} className="jar-star" style={{ animationDelay: i * 50 + 'ms' }}>⭐</span>
          ))}
        </div>
      </div>
      <h2>{total} {total === 1 ? 'star' : 'stars'} collected</h2>
      <p>{next - total} more to reach {next}. Every small step counts!</p>
      <div>
        <span><b>{sent}</b><small>Applications sent · 3 ⭐ each</small></span>
        <span><b>{done}</b><small>Tasks done · 1 ⭐ each</small></span>
      </div>
    </div>
  );
}
