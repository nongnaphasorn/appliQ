import React,{useState} from 'react';
import {Plus,Pencil,Trash2,Check} from 'lucide-react';
import Urgency from '../../components/ui/Urgency.jsx';
import PriorityStars from '../../components/ui/PriorityStars.jsx';
import {urgencyOf} from '../../lib/urgency.js';
import {fmt} from '../../lib/dates.js';

export default function TodoWidget({tasks,apps,onAdd,onEdit,onToggle,onDelete}) {
  const [showDone, setShowDone] = useState(false);
  const pending = tasks.filter((x) => !x.done).sort((a, b) => (a.dueDate || '9999').localeCompare(b.dueDate || '9999'));
  const done = tasks.filter((x) => x.done);
  const row = (x) => (
    <div className={'todo' + (x.done ? ' done' : '')} key={x.id}>
      <button className="check" title={x.done ? 'Mark as not done' : 'Mark as done'} onClick={() => onToggle(x)}>{x.done && <Check size={12} />}</button>
      <span>
        <b>{x.title}<PriorityStars level={x.priority} /></b>
        {!x.done && urgencyOf(x.dueDate) && <Urgency info={urgencyOf(x.dueDate)} />}
        <small>{fmt(x.dueDate)}{x.applicationId ? ' · ' + (apps.find((a) => a.id === x.applicationId)?.company || '') : ''}</small>
      </span>
      <div className="todo-actions">
        <button className="tiny-icon" title="Edit" onClick={() => onEdit(x)}><Pencil size={13} /></button>
        <button className="tiny-icon" title="Delete" onClick={() => onDelete(x)}><Trash2 size={13} /></button>
      </div>
    </div>
  );
  return (
    <div className="panel widget">
      <div className="panel-head">
        <div><small className="eyebrow">A FEW THINGS TO DO</small><h2>My to-do list <span className="pill">{pending.length}</span></h2></div>
        <button className="round" onClick={onAdd}><Plus /></button>
      </div>
      <div className="todo-list">
        {pending.map(row)}
        {!pending.length && <p className="empty">All caught up. Lovely work!</p>}
        {done.length > 0 && (
          <button className="link" onClick={() => setShowDone(!showDone)}>{showDone ? 'Hide' : 'Show'} completed ({done.length})</button>
        )}
        {showDone && done.map(row)}
      </div>
      <button className="link full" onClick={onAdd}>+ Add a task</button>
    </div>
  );
}
