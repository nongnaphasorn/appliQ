import React from 'react';
import {X} from 'lucide-react';

export default function Modal({title,onClose,children,wide}){return <div className="backdrop" onMouseDown={e=>e.target===e.currentTarget&&onClose()}><div className={'modal '+(wide?'wide':'')}><div className="modal-head"><h2>{title}</h2><button onClick={onClose}><X/></button></div>{children}</div></div>}
