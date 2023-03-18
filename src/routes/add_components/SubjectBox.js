import React, { useState } from 'react'
import '../../css/LectureBox.css'

function LectureBox(props) {

  const [showText, setShowText] = useState(false);

  return (
    <div className='lecturebox' style={
      { 
        cursor: "pointer",
        padding: "10px",
        paddingLeft: "15px",
        paddingRight: "15px"
      }}
      onMouseEnter={() => setShowText(true)}
      onMouseLeave={() => setShowText(false)}
      >
      <p style={{textAlign: "left"}}>
        <strong>
          {props.subj_name + "  "}
        </strong>
          ({props.subj_id}){"  "}
        <span style={{ color: "#176BFF" }}>{showText && "눌러서 담기"}</span>
      </p>
    </div>
  )
}

export default LectureBox