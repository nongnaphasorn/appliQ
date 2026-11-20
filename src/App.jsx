import React,{useState,useMemo} from 'react';
import {User,CalendarDays,BriefcaseBusiness,FolderHeart,Plus,ChevronLeft,ChevronRight,Search,Pencil,Trash2,Check,Clock3,AlertCircle,Gift,Send,MessageCircle,FileText,StickyNote,Download,Upload,Menu,ExternalLink,GripVertical} from 'lucide-react';
import {STATUSES,tone,TO_APPLY_STATUSES,SENT_STATUSES} from './constants.js';
import {moveStatus,historyEntry} from './lib/statusRules.js';
import {isValidBackup} from './lib/backup.js';
import {today,offset,fmt,days} from './lib/dates.js';
import {id} from './lib/ids.js';
import {initialApps,initTasks,initialProfile} from './data/seed.js';
import {useStore} from './hooks/useStore.js';
import {blank,appEvents,eventClass,gpaGap,applicationUrgency,deadlineTone} from './lib/applicationRules.js';
import SectionTitle from './components/ui/SectionTitle.jsx';
import Badge from './components/ui/Badge.jsx';
import Modal from './components/ui/Modal.jsx';
import KanbanBoard from './features/kanban/KanbanBoard.jsx';
import ApplicationsTable from './features/applications/ApplicationsTable.jsx';
import ResourcesSection from './features/resources/ResourcesSection.jsx';
import StatsOverview from './features/dashboard/StatsOverview.jsx';
import TodoWidget from './features/todos/TodoWidget.jsx';
import ApplicationDetail from './features/applications/ApplicationDetail.jsx';
import ConfirmMove from './features/kanban/ConfirmMove.jsx';
import Logo, { LogoMark } from './components/ui/Logo.jsx';
import Urgency from './components/ui/Urgency.jsx';
import { urgencyOf } from './lib/urgency.js';
import { priorityLevel } from './lib/priority.js';
import PriorityStars from './components/ui/PriorityStars.jsx';
import ProfileSection from './features/profile/ProfileSection.jsx';
import GpaNote from './features/applications/GpaNote.jsx';
import Calendar from './features/calendar/Calendar.jsx';
import EventForm from './features/calendar/EventForm.jsx';
import ApplicationForm from './features/applications/ApplicationForm.jsx';
import TaskForm from './features/todos/TaskForm.jsx';
import ResourceForm from './features/resources/ResourceForm.jsx';

function App(){
 const [apps,setApps]=useStore('cb-apps',initialApps),[tasks,setTasks]=useStore('cb-tasks',initTasks),[ownEvents,setOwnEvents]=useStore('cb-events',[{id:'e1',title:'Career fair',date:offset(7),type:'Personal',notes:'Bring updated resume.'}]),[resources,setResources]=useStore('cb-resources',[{id:'r1',name:'Resume',type:'Resume',version:'v3',updated:offset(-2),url:''},{id:'r2',name:'Portfolio',type:'Portfolio',version:'v2',updated:offset(-5),url:''}]),[profile,setProfile]=useStore('cb-profile',initialProfile),[notes,setNotes]=useStore('cb-notes','Remember to tailor each resume to the role. Small steps count! ⭐');
 const [month,setMonth]=useState(new Date()),[selected,setSelected]=useState(today()),[section,setSection]=useState('overview'),[modal,setModal]=useState(null),[detail,setDetail]=useState(null),[drag,setDrag]=useState(null),[confirm,setConfirm]=useState(null),[mobile,setMobile]=useState(false),[toast,setToast]=useState('');
 const events=useMemo(()=>[...apps.flatMap(appEvents),...tasks.filter(t=>t.dueDate).map(t=>({id:'task'+t.id,title:t.title,date:t.dueDate,type:'Task',applicationId:t.applicationId})),...ownEvents], [apps,tasks,ownEvents]);
 
 
 const urgent=apps.filter(a=>deadlineTone(a)==='urgent');
 
 const notify=s=>{setToast(s);setTimeout(()=>setToast(''),2300)};
 const jump=s=>{setSection(s);setMobile(false);document.getElementById(s)?.scrollIntoView({behavior:'smooth'})};
 const saveApp=f=>{setApps(old=>f.id?old.map(a=>a.id!==f.id?a:moveStatus(a,f.status,f)):[{...f,id:id('app'),history:[historyEntry(null,f.status,'Added to tracker')]},...old]);setModal(null);notify(f.id?'Application updated':'Application added')};
 const changeStatus=(a,status,extra={},note='')=>{const cur=apps.find(x=>x.id===a.id)||a;const updated=moveStatus(cur,status,extra,note);setApps(old=>old.map(x=>x.id===a.id?updated:x));setDetail(x=>x&&x.id===a.id?updated:x);setConfirm(null);notify(a.company+' moved to '+status)};
 const confirmMove=c=>{const extra={};if(c.status==='Interview'&&c.date)extra.interviewDate=c.date;if(c.status==='Technical Test'&&c.date)extra.testDate=c.date;changeStatus(c.app,c.status,extra,c.note||'')};
 const toggleTask=t=>setTasks(old=>old.map(x=>x.id===t.id?{...x,done:!x.done}:x));
 const deleteTask=t=>{if(window.confirm('Delete this task?')){setTasks(old=>old.filter(x=>x.id!==t.id));notify('Task deleted')}};
 const deleteApp=a=>{if(window.confirm('Delete this application?')){setApps(old=>old.filter(x=>x.id!==a.id));setTasks(old=>old.map(t=>t.applicationId===a.id?{...t,applicationId:''}:t));setDetail(null);notify('Application deleted')}};
 const saveTask=t=>{setTasks(old=>t.id?old.map(x=>x.id===t.id?{...x,...t}:x):[{...t,id:id('task'),done:false},...old]);setModal(null);notify(t.id?'Task updated':'Task added')};
 const exportBackup=()=>{let blob=new Blob([JSON.stringify({apps,tasks,ownEvents,resources,notes,profile},null,2)],{type:'application/json'}),u=URL.createObjectURL(blob),a=document.createElement('a');a.href=u;a.download='appliq-backup.json';a.click();URL.revokeObjectURL(u)};
 const importBackup=file=>{if(!file||!window.confirm('Importing replaces ALL current data. Continue?'))return;let r=new FileReader();r.onload=()=>{try{let d=JSON.parse(r.result);if(!isValidBackup(d))throw 0;setApps(d.apps);setTasks(d.tasks);setOwnEvents(d.ownEvents||[]);setResources(d.resources||[]);setNotes(d.notes||'');setProfile(d.profile||initialProfile);notify('Backup restored')}catch{notify('Invalid backup file')}};r.readAsText(file)};
 const nav=[['overview','Overview',CalendarDays],['applications','Applications',BriefcaseBusiness],['pipeline','Pipeline',GripVertical],['resources','Resources',FolderHeart],['profile','Profile',User]];
 return <div className="shell"><aside className={'sidebar '+(mobile?'open':'')}><div className="brand"><Logo size={34}/></div><small className="side-label">YOUR PERSONAL WORKSPACE</small><nav>{nav.map(([id0,label,Icon])=><button className={section===id0?'active':''} key={id0} onClick={()=>jump(id0)}><Icon size={17}/>{label}</button>)}</nav><div className="side-bottom"><div className="tip">★<b>Little steps add up.</b><small>Keep showing up for your future.</small></div><button onClick={exportBackup}><Download size={16}/> Export backup</button><label className="file-label"><Upload size={16}/> Import backup<input type="file" accept="application/json" onChange={e=>importBackup(e.target.files?.[0])}/></label></div></aside>
 <main className="main"><header className="topbar"><button className="hamb" onClick={()=>setMobile(!mobile)}><Menu/></button><div className="crumb">My workspace <span>/</span> {nav.find(n=>n[0]===section)?.[1]}</div><div className="top-right"><small>{fmt(today(),{weekday:'short',month:'short',day:'numeric',year:'numeric'})}</small><button className="primary" onClick={()=>setModal({type:'app',data:blank()})}><Plus size={16}/> Add application</button></div></header>
 <section id="overview" className="section"><div className="welcome"><div><small className="eyebrow">YOUR APPLICATION QUEUE ★</small><h1>Good things take <em>a little time.</em></h1><p>A little clarity for every step of your career journey.</p></div><div className="flower-art">★</div></div>
 <div className="planner"><div className="panel calendar"><div className="panel-head"><div><small className="eyebrow">YOUR MONTH AT A GLANCE</small><h2>{month.toLocaleDateString('en-US',{month:'long',year:'numeric'})}</h2></div><div className="cal-controls"><button onClick={()=>setMonth(new Date(month.getFullYear(),month.getMonth()-1,1))}><ChevronLeft/></button><button className="today" onClick={()=>{setMonth(new Date());setSelected(today())}}>Today</button><button onClick={()=>setMonth(new Date(month.getFullYear(),month.getMonth()+1,1))}><ChevronRight/></button></div></div><Calendar month={month} selected={selected} onSelect={setSelected} events={events}/><div className="legend">{[['Deadline','deadline'],['Interview','interview'],['Technical Test','test'],['Follow-up','follow'],['Task','task']].map(([s,c])=><span key={s}><i className={'dot '+c}/>{s}</span>)}</div><div className="selected"><div className="selected-head"><b>{fmt(selected,{weekday:'long',month:'short',day:'numeric'})}</b><button className="link" onClick={()=>setModal({type:'event',data:{title:'',date:selected,type:'Personal',notes:''}})}><Plus size={14}/> Add event</button></div>{events.filter(e=>e.date===selected).length?events.filter(e=>e.date===selected).map(e=><button className="event-row" key={e.id} onClick={()=>e.applicationId?setDetail(apps.find(a=>a.id===e.applicationId)):null}><i className={'dot '+eventClass(e.type)}/><span><b>{e.title}</b><small>{e.subtitle||e.type}</small></span></button>):<p className="empty">A little breathing room. No events planned ★</p>}</div></div>
 <div className="widgets"><TodoWidget tasks={tasks} apps={apps} onAdd={()=>setModal({type:'task'})} onEdit={x=>setModal({type:'task',preset:x})} onToggle={toggleTask} onDelete={deleteTask}/>
 <div className="panel widget notes"><div className="panel-head"><div><small className="eyebrow">A SPACE FOR THOUGHTS</small><h2><StickyNote size={17}/> Quick notes</h2></div><small className="saved">Auto-saved</small></div><textarea value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Jot down a thought, reminder, or little idea..."/></div></div></div>
 <StatsOverview apps={apps} setDetail={setDetail}/>
 </section>
 <ApplicationsTable apps={apps} profile={profile} setDetail={setDetail} setModal={setModal}/>
 <KanbanBoard apps={apps} drag={drag} setDrag={setDrag} setConfirm={setConfirm} setDetail={setDetail} setModal={setModal}/>
 <ResourcesSection resources={resources} setResources={setResources} setModal={setModal}/>
 
 <ProfileSection profile={profile} onSave={setProfile}/>
 <footer><LogoMark size={16}/> Made with care for your next chapter. <span>AppliQ · Personal workspace</span></footer></main>
 {modal&&<Modal title={modal.type==='app'?(modal.data.id?'Edit application':'Add an application'):modal.type==='task'?(modal.preset?.id?'Edit task':'Add a task'):modal.type==='event'?'Add calendar event':'Add a resource'} onClose={()=>setModal(null)} wide={modal.type==='app'}>{modal.type==='app'?<ApplicationForm initial={modal.data} onSave={saveApp} onClose={()=>setModal(null)}/>:modal.type==='task'?<TaskForm apps={apps} onSave={saveTask} onClose={()=>setModal(null)} preset={modal.preset||{}}/>:modal.type==='event'?<EventForm initial={modal.data} onSave={e=>{setOwnEvents(old=>[{...e,id:id('event')},...old]);setModal(null);notify('Event added')}} onClose={()=>setModal(null)}/>:<ResourceForm onSave={r=>{setResources(old=>[{...r,id:id('resource')},...old]);setModal(null);notify('Resource saved')}} onClose={()=>setModal(null)}/>}</Modal>}
 {detail&&apps.some(a=>a.id===detail.id)&&<ApplicationDetail detail={detail} tasks={tasks} profile={profile} onClose={()=>setDetail(null)} onEdit={x=>{setModal({type:'app',data:x});setDetail(null)}} onDelete={deleteApp} onStatus={changeStatus} onAddTask={x=>{setModal({type:'task',preset:{title:'Follow up: '+x.company,applicationId:x.id}});setDetail(null)}}/>}
 {confirm&&<ConfirmMove confirm={confirm} setConfirm={setConfirm} onConfirm={confirmMove}/>}
 {toast&&<div className="toast"><Check size={15}/>{toast}</div>}</div>
}

export default App;
