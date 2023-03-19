import React, { useEffect, useRef } from 'react'
import "./SubjectList.css"
import '../../css/AppTable.css';
import '../../App.css';
import AddedSubject from './AddedSubject'

function SubjectGroup(props) {

  return (
    <div className='list__subjectgroupbox'>
      <h2 style={{fontWeight: "500"}}>
        <strong>{props.lectures[0].subj_name}</strong>
        {"      "}<span> {props.lectures.length}개 강좌 </span>
        {"      "}
        <label>
        <input style = {{ cursor: "pointer", verticalAlign: "middle" }}
          className='checkbox-1'
          type="checkbox"
          checked={true}
        />  필수 과목</label>
      </h2>
      {
        props.lectures.map(
          subject => {
            return (
              <AddedSubject
                subject = {subject}
                displayPopup = {props.displayPopup}

                addedLectures     = {props.addedLectures}
                setAddedLectures  = {props.setAddedLectures}
      
                addedSubjectIDs = {props.addedSubjectIDs}
                setAddedSubjectIDs = {props.setAddedSubjectIDs}

                popAddedLecture = {props.popAddedLecture}
              />
            )
          }
        )
      }

    </div>
  )
}

export default SubjectGroup