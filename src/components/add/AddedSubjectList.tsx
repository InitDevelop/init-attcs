import React, { useState, useContext, useRef, useEffect } from 'react'
import '../../css/SubjectList.css'
import '../../css/AppTable.css';
import '../../App.css';
import SubjectGroup from './SubjectGroup'
import { CreationContext } from "../../App";
import { lecture, lectureGroup } from '../../interfaces/Lecture';

type propType = {
  updateCount: number;
  setUpdateCount: (param: number) => void;
}

function AddedSubjectList(props: propType) {

  const data = useContext(CreationContext);
  
  return (
    <div className='appTable__container'>
      <h2 className="mid_title">담은 강좌</h2>
        <div className="appTable__scrollContainer">
          {
            data.lectureGroups.map(
              (lg: lectureGroup) => {
                return (
                  <SubjectGroup
                    lectureGroup={lg}
                    displayPopup={data.displayPopup}
                    popAddedLecture={data.removeLectureFromGroup}
                    updateCount={props.updateCount}
                    setUpdateCount={props.setUpdateCount}
                    />
                )
              }
            )
          }
        </div>
    </div>
  )
}

export default AddedSubjectList;