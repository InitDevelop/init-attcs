import React from 'react'
import "./SubjectList.css"
import "../../App.css"

function AddedSubject(props) {
  return (
    <div className='list__addedsubject'>
      <h3>
        <span className='credit' style={{marginRight: "10px"}}> {props.subject.lect_no} </span> {"\t"}
        <span style={{marginRight: "10px"}}> {props.subject.prof} </span>
        {"\t\t"}
        { (props.subject.extra_info.includes("®")) && (
          <button className='button-tiny' onClick={
            () => {
              props.displayPopup("수강반 제한 정보", props.subject.extra_info);
            }
          }>수강반 제한</button>
        )}
        { (props.subject.lang !== "한국어") && (
          <button className='button-tiny-2' style={{marginLeft: "5px"}} onClick={
            () => {
              props.displayPopup("강의 언어", props.subject.lang);
            }
          }>외국어</button>
        )}

        <button className='button-tiny-3' style={
          {
            marginLeft: "5px",
            position: "absolute",
            right: "20px"
          }
        } onClick={
            () => {props.popAddedLecture(props.subject)}
        }> 제거 </button>
      </h3>
    </div>
  )
}

export default AddedSubject