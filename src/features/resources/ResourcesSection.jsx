import React from 'react';
import {Plus,Trash2,FileText,ExternalLink} from 'lucide-react';
import SectionTitle from '../../components/ui/SectionTitle.jsx';
import {fmt} from '../../lib/dates.js';

export default function ResourcesSection({resources,setResources,setModal}) {
  return (
<section id="resources" className="section"><SectionTitle eyebrow="YOUR CAREER TOOLKIT" title="Resources" sub="Keep your application documents and useful links close by." action={<button className="secondary" onClick={()=>setModal({type:'resource'})}><Plus size={16}/> Add resource</button>}/><div className="resources">{resources.map(r=><div className="panel resource" key={r.id}><span className="file-icon"><FileText/></span><span><b>{r.name}</b><small>{r.type} · {r.version||'No version'}</small><small>Updated {fmt(r.updated)}</small></span>{r.url&&<a href={r.url} target="_blank" rel="noreferrer"><ExternalLink size={15}/></a>}<button className="tiny-icon" onClick={()=>{if(window.confirm('Delete this resource?'))setResources(old=>old.filter(x=>x.id!==r.id))}}><Trash2 size={14}/></button></div>)}</div></section>
  );
}
