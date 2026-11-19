import React from 'react';
import { gpaGap } from '../../lib/applicationRules.js';

// Heads-up only: never blocks applying.
export default function GpaNote({ app, profile }) {
  const need = parseFloat(app.minGpa), have = parseFloat(profile.gpa);
  if (!Number.isFinite(need) || !Number.isFinite(have)) return null;
  return gpaGap(app, profile)
    ? <div className="gpa-note">⚠ This role asks for GPA {need.toFixed(2)}+ and your GPA is {have.toFixed(2)}. You can still apply, just a heads-up.</div>
    : <div className="gpa-note ok">✓ Your GPA ({have.toFixed(2)}) meets the {need.toFixed(2)} requirement.</div>;
}
