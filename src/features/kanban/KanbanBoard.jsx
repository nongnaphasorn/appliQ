import React from 'react';
import {Pencil,GripVertical} from 'lucide-react';
import {STATUSES,tone} from '../../constants.js';
import Urgency from '../../components/ui/Urgency.jsx';
import SectionTitle from '../../components/ui/SectionTitle.jsx';
import PriorityStars from '../../components/ui/PriorityStars.jsx';
import {applicationUrgency} from '../../lib/applicationRules.js';
import {fmt} from '../../lib/dates.js';

export default function KanbanBoard({apps,drag,setDrag,setConfirm,setDetail,setModal}) {
  return (
<section id="pipeline" className="section"><SectionTitle eyebrow="MOVE THINGS FORWARD" title="Application pipeline" sub="Drag a card to a new stage. Confirm the change and add important dates."/><div className="kanban-note"><GripVertical size={15}/> Drag cards between columns. On touch devices, update status from application details.</div><div className="kanban">{STATUSES.map(s=><div className="kan-col" key={s} onDragOver={e=>e.preventDefault()} onDrop={()=>{if(drag&&drag.status!==s){setConfirm({app:drag,status:s,date:s==='Interview'?drag.interviewDate:s==='Technical Test'?drag.testDate:''});setDrag(null)}}}><div className="kan-head"><i className={tone[s]}/><b>{s}</b><small>{apps.filter(a=>a.status===s).length}</small></div>{apps.filter(a=>a.status===s).map(a=><article draggable key={a.id} className="kan-card" onDragStart={()=>setDrag(a)} onClick={()=>setDetail(a)}><div className="card-top"><span/><button className="tiny-icon" onClick={e=>{e.stopPropagation();setModal({type:'app',data:a})}}><Pencil size={12}/></button></div><b>{a.company}<PriorityStars level={a.priority}/></b><p>{a.position}</p><Urgency info={applicationUrgency(a)}/>{a.deadline&&<small>Deadline · {fmt(a.deadline)}</small>}{a.interviewDate&&s==='Interview'&&<small>Interview · {fmt(a.interviewDate)}</small>}</article>)}{!apps.some(a=>a.status===s)&&<div className="drop-empty">Drop a card here</div>}</div>)}</div></section>
  );
}
