import React from 'react'
import './SubjectList.css'
import '../../css/AppTable.css';
import '../../App.css';
import SubjectGroup from './SubjectGroup'

function AddedSubjectList(props) {

  return (
    <div className='appTable__container'>
      <h2 className="mid_title">담은 강좌</h2>
        <div className="appTable__scrollContainer">
          {
            props.addedSubjectIDs.map(
              (subj_id) => {
                return (
                  <SubjectGroup
                  id = {subj_id}
                  lectures = {props.addedLectures.filter(
                    (lecture) => {return lecture.subj_id === subj_id}
                    )}
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
    </div>
  )
}

export default AddedSubjectList