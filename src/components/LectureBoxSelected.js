import React, { useState } from 'react'
import "../css/LectureBox.css"
import "../App.css"

function LectureBoxSelected(props) {
  return (
    <div className='lecturebox'
      onMouseEnter={ (event) => {
        props.setHoveredSubj(props.subject);
        props.setSubjHover(true);
      }}
      onMouseLeave={ (event) => {
          props.setSubjHover(false);
        }
      }
    >
      <table className='lecturebox__table' style={{width: "100%"}}>
        <tbody>
          <tr>
            <td style={{width: "80%", whiteSpace: "pre-wrap"}}>
              <table className='lecturebox__table_in_table'>
                <tbody>
                  <tr>
                  <td colSpan="2">
                    <span style={{fontWeight: "600"}}>{props.subject.subj_name + "  "}</span>
                    { (props.subject.extra_info.includes("®")) && (
                      <button className='button-tiny' onClick={
                        () => {
                          props.displayPopup("수강반 제한 정보", props.subject.extra_info);
                        }
                      }>수강반 제한</button>
                    )}
                    {"  "}
                    { (props.subject.lang !== "한국어") && (
                      <button className='button-tiny-2' onClick={
                        () => {
                          props.displayPopup("강의 언어", props.subject.lang);
                        }
                      }>외국어</button>
                    )}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className='credit'>{props.subject.credit + "학점"}</span>
                      <span>{"  " + props.subject.prof + "  " + props.subject.subj_id} ({props.subject.lect_no})</span>
                    </td>
                    <td>
                      
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td style={{width: "20%", textAlign: "center"}}>
              <button className="button-0" onClick={() => props.handlePopSubject(props.subject)}>
                제거
              </button>  
            </td>
          </tr>

          
        </tbody>
      </table>
    </div>
  )
}

export default LectureBoxSelected