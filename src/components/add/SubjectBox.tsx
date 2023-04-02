import React, { useState } from 'react'
import '../../css/LectureBox.css'
import '../../css/AppTable.css'

type propType = {
  subj_id: string;
  subj_name: string;
  clickedSubject: string;
  setClickedSubject: (param: string) => void;
}

function SubjectBox(props: propType) {

  const [showText, setShowText] = useState(false);

  return (
    <div className='lecturebox' style={
      { 
        cursor: "pointer",
        padding: "10px",
        paddingLeft: "15px",
        paddingRight: "15px",
        background: (props.subj_id === props.clickedSubject) ? "#76d1e8" : "#fff"
      }}
      onMouseEnter={() => setShowText(true)}
      onMouseLeave={() => setShowText(false)}
      onClick={() => {
        props.setClickedSubject(props.subj_id);
      }}
      >
      <p style={{textAlign: "start"}}>
        <strong>
          {props.subj_name + "  "}
        </strong>
          ({props.subj_id}){"  "}
        <h4 style={{ color: "#176BFF" }}><strong>{showText && "눌러서 선택"}</strong></h4>
      </p>
    </div>
  )
}

export default SubjectBox