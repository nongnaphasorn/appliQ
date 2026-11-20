import React from 'react';
import {BriefcaseBusiness,Clock3,AlertCircle,Gift,Send,MessageCircle} from 'lucide-react';
import {STATUSES,tone,TO_APPLY_STATUSES,SENT_STATUSES} from '../../constants.js';
import {deadlineTone} from '../../lib/applicationRules.js';
import {fmt,days} from '../../lib/dates.js';

export default function StatsOverview({apps,setDetail}) {
  const urgent=apps.filter(a=>deadlineTone(a)==='urgent');
  return (
<>
<div className="stats-title"><div><small className="eyebrow">THE BIG PICTURE</small><h2>Your overview</h2></div><small>Updated automatically</small></div><div className="stats">{[[BriefcaseBusiness,'Total applications',apps.length,'All opportunities saved','sage'],[Send,'Applied',apps.filter(a=>SENT_STATUSES.includes(a.status)).length,'Applications submitted','blue'],[Clock3,'To apply',apps.filter(a=>TO_APPLY_STATUSES.includes(a.status)).length,'Still in preparation','sand'],[MessageCircle,'Interview',apps.filter(a=>a.status==='Interview').length,'In interview stage','pink'],[Gift,'Offers',apps.filter(a=>a.status==='Offer').length,'Good news!','lav'],[AlertCircle,'Urgent',urgent.length,'Deadline within 3 days','rose']].map(([Icon,label,val,desc,c])=><div className={'stat '+c} key={label}><div>{label}<Icon size={17}/></div><strong>{val}</strong><small>{desc}</small></div>)}</div>
 <div className="insights"><div className="panel insight"><small className="eyebrow">WHERE THINGS STAND</small><h2>Application stages</h2><div className="bar">{STATUSES.map(s=>{let n=apps.filter(a=>a.status===s).length;return n?<i key={s} className={tone[s]} style={{width:(n/apps.length*100)+'%'}} title={s+' '+n}/>:null})}</div><div className="stage-legend">{STATUSES.map(s=>{let n=apps.filter(a=>a.status===s).length;return n?<span key={s}><i className={tone[s]}/>{s}<b>{n}</b></span>:null})}</div></div><div className="panel insight"><small className="eyebrow">DON'T MISS A MOMENT</small><h2>Upcoming deadlines</h2>{apps.filter(a=>a.deadline&&TO_APPLY_STATUSES.includes(a.status)).sort((a,b)=>a.deadline.localeCompare(b.deadline)).slice(0,4).map(a=><button className="deadline-row" key={a.id} onClick={()=>setDetail(a)}><span className="date-chip"><b>{new Date(a.deadline+'T12:00:00').getDate()}</b><small>{fmt(a.deadline,{month:'short'})}</small></span><span><b>{a.company}</b><small>{a.position}</small></span><em className={deadlineTone(a)}>{days(a.deadline)<0?Math.abs(days(a.deadline))+'d overdue':days(a.deadline)+'d left'}</em></button>)}</div></div>
 
</>
  );
}
