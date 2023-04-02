import React, { useContext } from 'react'
import '../../css/SubjectList.css'
import '../../css/AppTable.css';
import '../../App.css';
import SubjectGroup from './SubjectGroup.tsx'
import { CreationContext } from "../../App.tsx";

function AddedSubjectList() {

  const data = useContext(CreationContext);

  return (
    <div className='appTable__container'>
      <h2 className="mid_title">담은 강좌</h2>
        <div className="appTable__scrollContainer">
          {
            data.addedSubjectIDs.map(
              (subj_id) => {
                return (
                  <SubjectGroup
                  id = {subj_id}
                  lectures = {data.addedLectures.filter(
                    (lecture) => {return lecture.subj_id === subj_id}
                    )}
                  displayPopup = {data.displayPopup}
                  addedLectures     = {data.addedLectures}
                  setAddedLectures  = {data.setAddedLectures}
                  addedSubjectIDs = {data.addedSubjectIDs}
                  setAddedSubjectIDs = {data.setAddedSubjectIDs}
                  popAddedLecture = {data.popAddedLecture}
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