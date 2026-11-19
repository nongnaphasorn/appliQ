import React from 'react';

export const today=()=>{const d=new Date();return new Date(d.getTime()-d.getTimezoneOffset()*60000).toISOString().slice(0,10)};
export const offset=n=>{let d=new Date();d.setDate(d.getDate()+n);return new Date(d.getTime()-d.getTimezoneOffset()*60000).toISOString().slice(0,10)};
export const fmt=(v,opt={month:'short',day:'numeric'})=>v?new Date(v+'T12:00:00').toLocaleDateString('en-US',opt):'—';
export const days=v=>v?Math.round((new Date(v+'T00:00:00')-new Date(today()+'T00:00:00'))/86400000):null;
