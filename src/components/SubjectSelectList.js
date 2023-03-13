import React, { useState } from 'react'
import '../css/Table.css';
import '../App.css';
import LectureBox from './LectureBox';

function SubjectSelectList(props) {

  function getCreditSum() {
    let sum = 0;
    for (let i = 0; i < props.selSubj.length; i++) {
      sum += parseInt(props.selSubj[i].credit);
    }
    return sum;
  }

  return (
    <div className="table__container">
      <span className='mid_title'>담은 강좌</span>
      <div className="table__sel_scroll_container">
        {props.selSubj.map(
          subject => {
            return (
              <LectureBox
                boxType = "list"
                setHoveredSubj = {props.setHoveredSubj}
                setSubjHover = {props.setSubjHover}
                subject = {subject}
                displayPopup = {props.displayPopup}
                addSelSubj = {props.addSelSubj}
                selSubj = {props.selSubj}
                isExistingSubj = {props.isExistingSubj}
                handlePopSubject = {props.handlePopSubject}
                addedSubj={props.addedSubj}
                addSubj={props.addSubj}
              />
            )
          }
        )}
      </div>
      </div>
    )
}

export default SubjectSelectList;