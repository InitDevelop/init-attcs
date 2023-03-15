import React, { useState } from 'react'
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
    <div className="appTable__containerFull">
      <h2 className='mid_title' style={{ width: "100%" }}>
        <span style={{ marginRight: "5%" }}>담은 강좌</span>
        <label className='label-1' style={{ fontWeight: "normal" }}>
          <input 
            className='checkbox-1'
            type="checkbox"
            checked={props.allowMult}
            onChange={props.handleAllowMultChange}
        /> 중복 허용</label>
      </h2>
      <div className="appTable__selectScrollContainer">
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