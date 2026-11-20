import React,{useState} from 'react';
import {Plus,Search,Pencil} from 'lucide-react';
import {STATUSES} from '../../constants.js';
import Badge from '../../components/ui/Badge.jsx';
import Urgency from '../../components/ui/Urgency.jsx';
import SectionTitle from '../../components/ui/SectionTitle.jsx';
import PriorityStars from '../../components/ui/PriorityStars.jsx';
import {blank,gpaGap,applicationUrgency,deadlineTone} from '../../lib/applicationRules.js';
import {fmt} from '../../lib/dates.js';

export default function ApplicationsTable({apps,profile,setDetail,setModal}) {
  const [query,setQuery]=useState(''),[filter,setFilter]=useState('All'),[priority,setPriority]=useState('All'),[sort,setSort]=useState('deadline');
  const filtered=apps.filter(a=>(a.company+' '+a.position).toLowerCase().includes(query.toLowerCase())).filter(a=>filter==='All'||a.status===filter).filter(a=>priority==='All'||a.priority===priority).sort((a,b)=>sort==='priority'?({High:0,Medium:1,Low:2}[a.priority]-{High:0,Medium:1,Low:2}[b.priority]):sort==='applied'?(b.appliedDate||'').localeCompare(a.appliedDate||''):(a.deadline||'9999').localeCompare(b.deadline||'9999'));
  return (
<section id="applications" className="section"><SectionTitle eyebrow="YOUR OPPORTUNITIES" title="Applications" sub="Every opportunity, all in one place." action={<button className="primary" onClick={()=>setModal({type:'app',data:blank()})}><Plus size={16}/> Add application</button>}/><div className="panel table-panel"><div className="filters"><div className="search"><Search size={16}/><input placeholder="Search company or position..." value={query} onChange={e=>setQuery(e.target.value)}/></div><select value={filter} onChange={e=>setFilter(e.target.value)}><option>All</option>{STATUSES.map(s=><option>{s}</option>)}</select><select value={priority} onChange={e=>setPriority(e.target.value)}><option value="All">All interest</option><option value="High">★★★ Dream pick</option><option value="Medium">★★ Interested</option><option value="Low">★ Nice to have</option></select><select value={sort} onChange={e=>setSort(e.target.value)}><option value="deadline">Sort: deadline</option><option value="priority">Sort: interest ★</option><option value="applied">Sort: applied date</option></select></div><div className="table-scroll"><table><thead><tr><th>Company / Position</th><th>Status</th><th>Urgency</th><th>Deadline</th><th>Next action</th><th/></tr></thead><tbody>{filtered.map(a=><tr key={a.id} onClick={()=>setDetail(a)}><td><b>{a.company}<PriorityStars level={a.priority}/></b><small>{a.position}</small>{gpaGap(a,profile)&&<small className="gpa-warn">⚠ GPA {a.minGpa}+ required</small>}</td><td><Badge status={a.status}/></td><td><Urgency info={applicationUrgency(a)}/></td><td className={deadlineTone(a)}>{fmt(a.deadline)}</td><td>{a.nextAction||'—'}</td><td><button className="tiny-icon" onClick={e=>{e.stopPropagation();setModal({type:'app',data:a})}}><Pencil size={14}/></button></td></tr>)}</tbody></table>{!filtered.length&&<p className="empty">No applications match those filters.</p>}</div><div className="table-foot">{filtered.length} of {apps.length} applications <button className="link" onClick={()=>{setQuery('');setFilter('All');setPriority('All')}}>Clear filters</button></div></div></section>
  );
}
