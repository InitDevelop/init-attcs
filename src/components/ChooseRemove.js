import React from 'react'
import "../css/AppTable.css"

function ChooseRemove(props) {
  return (
    <div className='appTable__selectScrollContainer'>
      {props.selSubj.filter((subject) => {subject.subj_id === props.removeID}).map(
          subject => {
            return (
              <LectureBox
                boxType         = "remove"
                                
                subject         = {subject}
                isExistingSubj  = {props.isExistingSubj}

                subjectToRemove = {props.subjectToRemove}
                setSubjectToRemove = {props.setSubjectToRemove}

                displayPopup    = {props.displayPopup}
              />
            )
          }
        )}
    </div>
  )
}

export default ChooseRemove