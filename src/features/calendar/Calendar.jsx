import React from 'react';
import {today} from '../../lib/dates.js';
import {eventClass} from '../../lib/applicationRules.js';

const MAX_CHIPS=3;

export default function Calendar({month,selected,onSelect,events}){let first=new Date(month.getFullYear(),month.getMonth(),1),offset=(first.getDay()+6)%7,n=new Date(month.getFullYear(),month.getMonth()+1,0).getDate(),cells=Array.from({length:Math.ceil((offset+n)/7)*7},(_,i)=>i-offset+1);return <div className="cal-grid">{['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(x=><div className="weekday" key={x}>{x}</div>)}{cells.map((d,i)=>{let valid=d>0&&d<=n,iso=valid?`${month.getFullYear()}-${String(month.getMonth()+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`:'',ev=events.filter(e=>e.date===iso);return <button key={i} disabled={!valid} className={'day '+(!valid?'blank ':'')+(iso===today()?'today-day ':'')+(iso===selected?'selected':'')} onClick={()=>valid&&onSelect(iso)}><span>{valid?d:''}</span><div className="day-events">{ev.slice(0,MAX_CHIPS).map(e=><i key={e.id} title={e.title} className={'chip '+eventClass(e.type)}>{e.short||e.title}</i>)}{ev.length>MAX_CHIPS&&<small className="more">+{ev.length-MAX_CHIPS} more</small>}</div></button>})}</div>}
