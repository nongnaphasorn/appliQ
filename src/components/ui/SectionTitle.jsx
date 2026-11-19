import React from 'react';

export default function SectionTitle({eyebrow,title,sub,action}){return <div className="section-title"><div><small className="eyebrow">{eyebrow}</small><h2>{title}</h2><p>{sub}</p></div>{action}</div>}
