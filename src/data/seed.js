import React from 'react';
import {today,offset} from '../lib/dates.js';

export const initialApps=[
{id:'a1',company:'Northstar Labs',position:'Software Engineer Intern',jobType:'Internship',location:'Hybrid',jobLink:'',status:'To Apply',priority:'High',deadline:offset(4),appliedDate:'',followUpDate:'',interviewDate:'',testDate:'',expectedResultDate:'',nextAction:'Tailor resume for the role',actionDate:offset(1),eligibility:'Year 3 student',requiredDocs:'Resume, Transcript, Portfolio',hrContact:'',notes:'Review the job description and highlight React experience.'},
{id:'a2',company:'Moss & Co.',position:'Frontend Developer Intern',jobType:'Internship',location:'On-site',jobLink:'',status:'Applied',priority:'Medium',deadline:offset(12),appliedDate:offset(-3),followUpDate:offset(3),interviewDate:'',testDate:'',expectedResultDate:'',nextAction:'Follow up with HR',actionDate:offset(3),eligibility:'Undergraduate',requiredDocs:'Resume, Portfolio',hrContact:'',notes:'Application submitted through company portal.'},
{id:'a3',company:'Paperplane Digital',position:'Product Design Intern',jobType:'Internship',location:'Remote',jobLink:'',status:'Interview',priority:'High',deadline:'',appliedDate:offset(-8),followUpDate:'',interviewDate:offset(2),testDate:'',expectedResultDate:offset(8),nextAction:'Prepare portfolio walkthrough',actionDate:offset(1),eligibility:'Student',requiredDocs:'Portfolio, Resume',hrContact:'',notes:'Prepare two project case studies.'},
{id:'a4',company:'Greenfield Systems',position:'QA Intern',jobType:'Internship',location:'Hybrid',jobLink:'',status:'Technical Test',priority:'Medium',deadline:'',appliedDate:offset(-12),followUpDate:'',interviewDate:'',testDate:offset(5),expectedResultDate:'',nextAction:'Complete take-home test',actionDate:offset(4),eligibility:'Undergraduate',requiredDocs:'Resume',hrContact:'',notes:'Read testing instructions carefully.'},
{id:'a5',company:'Little Oak Studio',position:'Web Developer Intern',jobType:'Internship',location:'Remote',jobLink:'',status:'Offer',priority:'High',deadline:'',appliedDate:offset(-20),followUpDate:'',interviewDate:offset(-5),testDate:'',expectedResultDate:today(),nextAction:'Review offer details',actionDate:today(),eligibility:'',requiredDocs:'Resume, Portfolio',hrContact:'',notes:'Compare stipend and start date before responding.'}
];
export const initTasks=[{id:'t1',title:'Update resume summary',dueDate:today(),done:false,priority:'Medium',applicationId:'a1'},{id:'t2',title:'Prepare interview examples',dueDate:offset(1),done:false,priority:'Medium',applicationId:'a3'},{id:'t3',title:'Review technical test brief',dueDate:offset(3),done:false,priority:'Medium',applicationId:'a4'}];

// Resume facts. Contact/links are left blank on purpose: type them in the Profile page
// (kept in the browser/DB, not in source code, so they do not end up in a public repo).
export const initialProfile = {
  name: 'Nongnaphasorn Chumchoosri',
  summary: '3rd-year Digital Engineering student (Application Software Development track). Seeking a software development internship.',
  university: 'Sirindhorn International Institute of Technology (SIIT), Thammasat University',
  degree: 'B.Eng. Digital Engineering (Software Major)',
  years: '2024 – Present',
  gpa: '2.97',
  highSchool: "The Prince Royal's College (graduated 2024)",
  highSchoolGpa: '3.25',
  languages: 'Thai (Native), English (IELTS 6.5)',
  hardSkills: ['Python', 'Java', 'SQL', 'JavaScript (Node.js)', 'Express.js', 'REST APIs', 'MySQL', 'Git/GitHub (basic)', 'Postman', 'Docker (basic)', 'Figma', 'Wireshark', 'MS Excel', 'VS Code', 'Jupyter / Colab'],
  softSkills: [],
  email: '', phone: '', linkedin: '', github: '', portfolio: '',
};
