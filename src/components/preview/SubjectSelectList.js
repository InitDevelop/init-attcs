import React, { useContext } from 'react'
import '../../App.css';
import LectureBox from './../global/LectureBox';
import { PreviewContext } from "../../App";

function SubjectSelectList() {

  const data = useContext(PreviewContext);

  function getCreditSum() {
    let sum = 0;
    for (let i = 0; i < data.selSubj.length; i++) {
      sum += parseInt(data.selSubj[i].credit);
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
            checked={data.allowMult}
            onChange={data.handleAllowMultChange}
        /> 중복 허용</label>
      </h2>
      <div className="appTable__selectScrollContainer">
        {data.selSubj.map(
          subject => {
            return (
              <LectureBox
                boxType         = "list"
                addSubject      = {data.addSubject}
                popSubject      = {data.handlePopSubject}
                setHoveredSubj  = {data.setHoveredSubj}
                setSubjHover    = {data.setSubjHover}
                subject         = {subject}
                isExistingSubj  = {data.isExistingSubj}
                displayPopup    = {data.displayPopup}
              />
            )
          }
        )}
      </div>
      </div>
    )
}

export default SubjectSelectList;