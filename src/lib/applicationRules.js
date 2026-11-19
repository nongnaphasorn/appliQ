import React from 'react';
import { days } from './dates.js';
import { urgencyOf } from './urgency.js';

export const blank=()=>({company:'',position:'',jobType:'Internship',location:'Hybrid',jobLink:'',status:'To Apply',priority:'Medium',deadline:'',appliedDate:'',followUpDate:'',interviewDate:'',testDate:'',expectedResultDate:'',nextAction:'',actionDate:'',eligibility:'',requiredDocs:'',hrContact:'',notes:'',minGpa:''});
export function appEvents(a){const out=[];const add=(date,type,label)=>date&&out.push({id:a.id+type,date,type,title:label+': '+a.company,short:a.company,subtitle:a.position,applicationId:a.id});if(['To Apply','Preparing'].includes(a.status))add(a.deadline,'Deadline','Deadline');add(a.followUpDate,'Follow-up','Follow-up');add(a.interviewDate,'Interview','Interview');add(a.testDate,'Technical Test','Technical test');add(a.expectedResultDate,'Expected Result','Expected result');return out}
export function eventClass(t){return ({Deadline:'deadline',Interview:'interview','Technical Test':'test','Follow-up':'follow','Expected Result':'expected',Task:'task',Personal:'personal'}[t]||'personal')}

export function gpaGap(app, profile) {
  const need = parseFloat(app?.minGpa);
  const have = parseFloat(profile?.gpa);
  return Number.isFinite(need) && Number.isFinite(have) && have < need ? { need, have } : null;
}

// The date that matters most right now for an application.
export function nextDateOf(a) {
  if (['To Apply', 'Preparing'].includes(a.status)) return a.deadline || '';
  if (['Rejected', 'Withdrawn', 'Offer'].includes(a.status)) return '';
  const upcoming = [a.interviewDate, a.testDate, a.followUpDate, a.expectedResultDate].filter((d) => d && days(d) >= 0).sort();
  return upcoming[0] || '';
}
export const applicationUrgency = (a) => urgencyOf(nextDateOf(a));
