import React from 'react';
import Modal from '../../components/ui/Modal.jsx';

export default function ConfirmMove({confirm,setConfirm,onConfirm}) {
  return (
<Modal title="Confirm stage change" onClose={()=>setConfirm(null)}><p className="confirm-copy">Move <b>{confirm.app.company}</b> from <b>{confirm.app.status}</b> to <b>{confirm.status}</b>?</p>{['Interview','Technical Test'].includes(confirm.status)&&<label className="field"><span>{confirm.status==='Interview'?'Interview date':'Technical test date'}</span><input type="date" value={confirm.date||''} onChange={e=>setConfirm({...confirm,date:e.target.value})}/></label>}<label className="field"><span>Update note (optional)</span><textarea rows="3" value={confirm.note||''} onChange={e=>setConfirm({...confirm,note:e.target.value})} placeholder="e.g. HR called to schedule the first interview..."/></label><div className="modal-actions"><button className="secondary" onClick={()=>setConfirm(null)}>Cancel</button><button className="primary" onClick={()=>onConfirm(confirm)}>Confirm move</button></div></Modal>
  );
}
