import React, { useState } from 'react'
import "../css/LectureBox.css"
import "../App.css"

function LectureBoxSearch(props) {
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
      onClick={ (event) => {
          
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
                    <td colspan="2">
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
                      <span>{"  " + props.subject.prof}{"  " + props.subject.subj_id} ({props.subject.lect_no})</span>
                    </td>
                    <td>
                      
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td style={{width: "20%", textAlign: "center"}}>
              <button className="button-0" onClick={() => {
                const addingSubj = props.subject;
                if (props.isExistingSubj(addingSubj)) {
                  props.displayPopup("교과목명 중복",
                    "이미 추가된 교과목입니다.\n해당 강좌를 담으시려면 \"교과목명 중복 허용하기\"를 체크하시길 바랍니다.");
                } else {
                  props.addSelSubj(props.selSubj.concat(addingSubj))
                }

                }
                }>
                추가
              </button>
            </td>
          </tr>

          
        </tbody>
      </table>
    </div>
  )
}

export default LectureBoxSearch