import React from 'react';

const STAR_POINTS = '32.0,8.0 41.4,20.1 55.8,25.3 47.2,37.9 46.7,53.2 32.0,49.0 17.3,53.2 16.8,37.9 8.2,25.3 22.6,20.1';

// The Q of "appli" + Q: a soft butter-yellow star with a hole and a little tail.
export function LogoMark({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" role="img" aria-label="AppliQ">
      <defs>
        <mask id="aq-hole"><rect width="64" height="64" fill="#fff" /><circle cx="32" cy="34" r="8.5" fill="#000" /></mask>
      </defs>
      <g mask="url(#aq-hole)">
        <polygon points={STAR_POINTS} fill="#ffe08a" stroke="#ffe08a" strokeWidth="9" strokeLinejoin="round" />
      </g>
      <path d="M41 51 Q51 58 58 51" fill="none" stroke="#ffe08a" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}

export default function Logo({ size = 30 }) {
  return (
    <div className="logo">
      <i className="logo-word">appli</i>
      <LogoMark size={size} />
    </div>
  );
}
