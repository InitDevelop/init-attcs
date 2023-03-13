import React from 'react'
import "./SubjectList.css"
import "../../App.css"
import AddedSubject from './AddedSubject'

function SubjectGroup(props) {

  let matchingSubjects = [];

  for (let i = 0; i < props.addedSubj.length; i++) {
    if (props.addedSubj[i].subj_id === props.id) {
      matchingSubjects.push(props.addedSubj[i]);
    }
  }

  return (
    <div className='list__subjectgroupbox'>
      <h2 style={{fontWeight: "500"}}>
        <strong>{props.lectures[0].subj_name}</strong>
        {"      "}<span className='credit'> {props.lectures.length}개 강좌 </span>
        {"      "}
        <label>
        <input
          className='checkbox-1'
          type="checkbox"
          // checked={props.allowMult}
          // onChange={props.handleAllowMultChange}
        />  필수 과목</label>
      </h2>
      {
        matchingSubjects.map(
          subject => {
            <AddedSubject
              subject = {subject}
            />
          }
        )
      }

    </div>
  )
}

export default SubjectGroup