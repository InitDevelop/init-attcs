import React from 'react'
import '../../css/Popup.css'
import '../../App.css'

type propType = {
  title: string;
  content: React.ReactNode;
  onClose: () => void;
}

function Popup(props: propType) {
  return (
    <div className="popup">
      <div style={{whiteSpace:'pre-wrap'}} className="popup-inner">
        <h2 className="popup__title" style={{marginBottom: "20px"}}>{props.title}</h2>
        <div style={{marginBottom: "20px"}}>{props.content}</div>
        <button className='button-0'
         onClick={props.onClose}>확인</button>
      </div>
    </div>
  );
}

export default Popup