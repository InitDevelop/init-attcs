import React from 'react';
import "../css/Popup.css";
import "../css/SubjectPopup.css";

function SubjectPopup() {
  return (
    <div className="popup">
      <div style={{whiteSpace:'pre-wrap'}} className="popup-inner">
        <h2 style={{marginBottom: "20px"}}>{props.subject.subj_name} [{props.subject.subj_id} ({props.subject.lect_no})]</h2>
        <table className='subjectpopup__table' style={{marginBottom: "20px"}}>
          <tbody>
            <tr>
              <td>
                <strong>구분 </strong>{props.subject.lect_type}
              </td>
              <td>
                <strong>{props.subject.grad} 과정</strong>
              </td>
              <td>
                <strong>개설학과 </strong>{props.subject.lect_col} {props.subject.lect_dept}
              </td>
            </tr>
          </tbody>
        </table>
        <p style={{marginBottom: "20px"}}>{props.content}</p>
        <button className='button-0'
         onClick={props.onClose}>확인</button>
      </div>
    </div>
  );
}

export default SubjectPopup