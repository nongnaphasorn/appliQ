import React from 'react';

export default function Field({label,children,full}){return <label className={'field '+(full?'full':'')}><span>{label}</span>{children}</label>}
