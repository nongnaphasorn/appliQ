import React from 'react';

export default function Urgency({ info }) {
  return info ? <span className={'urg ' + info.key}>{info.label}</span> : <span className="urg none">—</span>;
}
