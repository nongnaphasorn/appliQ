import React, { useState } from 'react';
import Field from '../../components/ui/Field.jsx';

const toList = (s) => s.split(',').map((x) => x.trim()).filter(Boolean);

export default function ProfileForm({ initial, onSave, onClose }) {
  const [f, setF] = useState({ ...initial, hardSkills: initial.hardSkills.join(', '), softSkills: initial.softSkills.join(', ') });
  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));
  const text = (k, label, props = {}, full) => (
    <Field label={label} full={full}><input value={f[k] || ''} onChange={set(k)} {...props} /></Field>
  );
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave({ ...f, hardSkills: toList(f.hardSkills), softSkills: toList(f.softSkills) }); }}>
      <h3>About you</h3>
      <div className="form-grid">
        {text('name', 'Name')}
        {text('degree', 'Degree / major')}
        {text('university', 'University', {}, true)}
        {text('years', 'Years')}
        {text('gpa', 'GPA', { type: 'number', step: '0.01', min: '0', max: '4' })}
        {text('highSchool', 'High school')}
        {text('highSchoolGpa', 'High school GPA')}
        {text('languages', 'Languages', {}, true)}
        <Field label="Summary" full><textarea rows="3" value={f.summary || ''} onChange={set('summary')} /></Field>
      </div>
      <h3>Skills (separate with commas)</h3>
      <div className="form-grid">
        <Field label="Hard skills" full><textarea rows="2" value={f.hardSkills} onChange={set('hardSkills')} /></Field>
        <Field label="Soft skills" full><textarea rows="2" value={f.softSkills} onChange={set('softSkills')} placeholder="e.g. Teamwork, Leadership, Time management" /></Field>
      </div>
      <h3>Contact and links</h3>
      <div className="form-grid">
        {text('email', 'Email', { type: 'email' })}
        {text('phone', 'Phone')}
        {text('linkedin', 'LinkedIn URL', { placeholder: 'https://linkedin.com/in/...' })}
        {text('github', 'GitHub URL', { placeholder: 'https://github.com/...' })}
        {text('portfolio', 'Portfolio URL', {}, true)}
      </div>
      <div className="modal-actions">
        <button type="button" className="secondary" onClick={onClose}>Cancel</button>
        <button className="primary">Save profile</button>
      </div>
    </form>
  );
}
