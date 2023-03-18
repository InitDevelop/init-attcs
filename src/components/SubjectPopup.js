import React from 'react';
import "../css/SubjectPopup.css";

function SubjectPopup(props) {
  return (
    <div className="subjectpopup">
      <div style={{whiteSpace:'pre-wrap'}} className="subjectpopup-inner">
        <h2 style={{marginBottom: "20px"}}>{props.subject.subj_name} [{props.subject.subj_id} ({props.subject.lect_no})]</h2>
        <table className='subjectpopup__table' style={{marginBottom: "20px"}}>
          <tbody>
            <tr>
              <td>
                <h4 className='key'>구분</h4>
                <h4 className='value'>{props.subject.lect_type}</h4>
              </td>
              <td>
              <h4 className='key'>과정</h4>
                <h4 className='value'>{props.subject.grad} 과정</h4>
              </td>
              <td>
                <h4 className='key'>개설학과</h4>
                <h4 className='value'>{props.subject.lect_col} {props.subject.lect_dept}</h4>
              </td>
            </tr>
            <tr>
              <td>
                <h4 className='key'>학년</h4>
                <h4 className='value'>{props.subject.grade}</h4>
              </td>
              <td>
                <h4 className='key'>강의 형태</h4>
                <h4 className='value'>{props.subject.lect_form}</h4>
              </td>
              <td>
                <h4 className='key'>강의 장소</h4>
                <h4 className='value'>{props.subject.lect_room}</h4>
              </td>
            </tr>
            <tr>
              <td colSpan="3">
                <h4 className='key'>강의 시간</h4>
                <h4 className='value'>{props.subject.time}</h4>
              </td>
            </tr>
            <tr>
              <td colSpan="3">
                <h4 className='key'>추가 정보</h4>
                <h4 className='value'>{props.subject.extra_info}</h4>
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