import React, { useState } from 'react'
import '../css/Table.css';
import '../App.css';
import LectureBoxSelected from "./LectureBoxSelected";

function SubjectSelectList(props) {

  function getCreditSum() {
    let sum = 0;
    for (let i = 0; i < props.selSubj.length; i++) {
      sum += parseInt(props.selSubj[i].credit);
    }
    return sum;
  }

  return (
    <div>
    {props.selSubj.length > 0 && (
      <div className="table__sel_subjects">
      <span className='mid_title'>담은 강좌</span>
        <div className="table__sel_scroll_container">
          <table className="table">
            <tbody>
              {props.selSubj.map(
                subject => {
                  return (
                    <LectureBoxSelected
                      setHoveredSubj = {props.setHoveredSubj}
                      setSubjHover = {props.setSubjHover}
                      subject = {subject}
                      displayPopup = {props.displayPopup}
                      addSelSubj = {props.addSelSubj}
                      selSubj = {props.selSubj}
                      isExistingSubj = {props.isExistingSubj}
                      handlePopSubject = {props.handlePopSubject}
                    />
                  )
                }
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
  </div>)
}

export default SubjectSelectList;