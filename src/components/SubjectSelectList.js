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
    <div className="appTable__container">
      <h2 className='mid_title' style={{ width: "100%" }}>
        <span style={{ marginRight: "5%" }}>담은 강좌</span>
        <label className='label-1' style={{ fontWeight: "normal", cursor: "pointer" }}>
          <input style={{ cursor: "pointer", verticalAlign: "middle" }}
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
                boxType         = "list"
                
                addSubject      = {props.addSubject}
                popSubject      = {props.popSubject}
                
                setHoveredSubj  = {props.setHoveredSubj}
                setSubjHover    = {props.setSubjHover}
                
                subject         = {subject}
                isExistingSubj  = {props.isExistingSubj}
                
                displayPopup    = {props.displayPopup}
              />
            )
          }
        )}
      </div>
      </div>
    )
}

export default SubjectSelectList;