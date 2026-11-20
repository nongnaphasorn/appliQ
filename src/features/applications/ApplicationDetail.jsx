import React from 'react';
import {Pencil,Trash2,ExternalLink} from 'lucide-react';
import {STATUSES} from '../../constants.js';
import Modal from '../../components/ui/Modal.jsx';
import Badge from '../../components/ui/Badge.jsx';
import Urgency from '../../components/ui/Urgency.jsx';
import GpaNote from './GpaNote.jsx';
import {priorityLevel} from '../../lib/priority.js';
import {applicationUrgency} from '../../lib/applicationRules.js';
import {fmt} from '../../lib/dates.js';

export default function ApplicationDetail({detail,tasks,profile,onClose,onEdit,onDelete,onStatus,onAddTask}) {
  return (
<Modal title="Application details" onClose={onClose} wide><div className="detail-hero"><div><small className="eyebrow">{detail.jobType} · {detail.location}</small><h2>{detail.company}</h2><p>{detail.position}</p></div><Badge status={detail.status}/></div><div className="detail-actions"><button className="secondary" onClick={()=>onEdit(detail)}><Pencil size={14}/> Edit</button>{detail.jobLink&&<a className="secondary" href={detail.jobLink} target="_blank" rel="noreferrer"><ExternalLink size={14}/> Job posting</a>}<button className="danger" onClick={()=>onDelete(detail)}><Trash2 size={14}/> Delete</button></div><label className="field"><span>Update status</span><select value={detail.status} onChange={e=>onStatus(detail,e.target.value)}>{STATUSES.map(s=><option>{s}</option>)}</select></label><div className="detail-grid">{[['Interest','★'.repeat(priorityLevel(detail.priority))],['Urgency',<Urgency info={applicationUrgency(detail)}/>],['Deadline',fmt(detail.deadline)],['Applied',fmt(detail.appliedDate)],['Follow-up',fmt(detail.followUpDate)],['Interview',fmt(detail.interviewDate)],['Technical test',fmt(detail.testDate)],['Expected result',fmt(detail.expectedResultDate)],['Next action',detail.nextAction||'—'],['Action date',fmt(detail.actionDate)],['Eligibility',detail.eligibility||'—'],['Required docs',detail.requiredDocs||'—'],['HR contact',detail.hrContact||'—']].map(([k,v])=><div key={k}><small>{k}</small><b>{v}</b></div>)}</div><GpaNote app={detail} profile={profile}/>{detail.notes&&<div className="detail-notes"><b>Notes</b><p>{detail.notes}</p></div>}<div className="related"><div className="selected-head"><b>Related tasks</b><button className="link" onClick={()=>onAddTask(detail)}>+ Add task</button></div>{tasks.filter(t=>t.applicationId===detail.id).map(t=><p key={t.id}>{t.done?'✓':'○'} {t.title} <small>{fmt(t.dueDate)}</small></p>)}</div><div className="related"><div className="selected-head"><b>Timeline</b></div>{(detail.history||[]).length?[...detail.history].reverse().map((h,i)=><p key={i}>{fmt(h.at.slice(0,10))} · {h.from?h.from+' → ':'Added as '}{h.to}{h.note?' — '+h.note:''}</p>):<p className="empty">No history yet. Changes from now on will show here.</p>}</div></Modal>
  );
}
