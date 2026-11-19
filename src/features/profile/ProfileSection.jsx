import React, { useState } from 'react';
import { Pencil, Mail, Phone, ExternalLink } from 'lucide-react';
import SectionTitle from '../../components/ui/SectionTitle.jsx';
import Modal from '../../components/ui/Modal.jsx';
import ProfileForm from './ProfileForm.jsx';

const withHttp = (u) => (/^https?:\/\//.test(u) ? u : 'https://' + u);

function LinkRow({ icon, label, value, href }) {
  return (
    <div className="link-row">
      <span className="link-ico">{icon}</span>
      <span><small>{label}</small>{value ? <a href={href} target="_blank" rel="noreferrer">{value}</a> : <em>Not added yet</em>}</span>
    </div>
  );
}

function Tags({ items, empty }) {
  return items.length ? <div className="tags">{items.map((s) => <span className="tag" key={s}>{s}</span>)}</div> : <p className="empty">{empty}</p>;
}

export default function ProfileSection({ profile, onSave }) {
  const [editing, setEditing] = useState(false);
  const p = profile;
  return (
    <section id="profile" className="section">
      <SectionTitle eyebrow="ALL ABOUT YOU" title="Profile" sub="Your resume facts in one place, so you never have to dig for them."
        action={<button className="secondary" onClick={() => setEditing(true)}><Pencil size={14} /> Edit profile</button>} />
      <div className="profile-grid">
        <div className="panel profile-card">
          <small className="eyebrow">EDUCATION</small>
          <div className="gpa-row"><div><h2>{p.name}</h2><p>{p.degree}</p><p>{p.university}</p><small>{p.years}</small></div><div className="gpa-big"><b>{p.gpa || '—'}</b><small>GPA</small></div></div>
          <p className="muted-line">{p.highSchool}{p.highSchoolGpa ? ' · GPA ' + p.highSchoolGpa : ''}</p>
          <p className="muted-line">{p.languages}</p>
          {p.summary && <p className="summary">{p.summary}</p>}
        </div>
        <div className="panel profile-card">
          <small className="eyebrow">CONTACT AND LINKS</small>
          <LinkRow icon={<Mail size={15} />} label="Email" value={p.email} href={'mailto:' + p.email} />
          <LinkRow icon={<Phone size={15} />} label="Phone" value={p.phone} href={'tel:' + p.phone} />
          <LinkRow icon={<ExternalLink size={15} />} label="LinkedIn" value={p.linkedin} href={withHttp(p.linkedin || '')} />
          <LinkRow icon={<ExternalLink size={15} />} label="GitHub" value={p.github} href={withHttp(p.github || '')} />
          <LinkRow icon={<ExternalLink size={15} />} label="Portfolio" value={p.portfolio} href={withHttp(p.portfolio || '')} />
        </div>
        <div className="panel profile-card"><small className="eyebrow">HARD SKILLS</small><Tags items={p.hardSkills} empty="No hard skills yet." /></div>
        <div className="panel profile-card"><small className="eyebrow">SOFT SKILLS</small><Tags items={p.softSkills} empty="Add your soft skills with Edit profile." /></div>
      </div>
      {editing && (
        <Modal title="Edit profile" onClose={() => setEditing(false)} wide>
          <ProfileForm initial={p} onSave={(v) => { onSave(v); setEditing(false); }} onClose={() => setEditing(false)} />
        </Modal>
      )}
    </section>
  );
}
