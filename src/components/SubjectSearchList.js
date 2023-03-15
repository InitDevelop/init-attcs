import subjects from "../db/data.json";
import React from 'react'
import '../css/AppTable.css';
import '../App.css';
import LectureBox from "./LectureBox";


function SubjectSearchList(props) {

  function isRelatedName(abbrev, full) {
    abbrev = abbrev.replace(" ", "");
    full = full.replace(" ", "");
    var ret = true;
    for (let i = 0; i < abbrev.length; i++) {
      var sub = abbrev.substring(i, i + 1);
      if (full.includes(sub)) {
        full = full.substring(full.indexOf(sub));
      } else {
        ret = false;
        break;
      }
    }
    return ret;
  }

  return (
    <div className="appTable__container">
      <h2 className="mid_title">찾은 강좌</h2>
      <div className="appTable__scrollContainer">
        {subjects.subjects
        .map(subject => {
          let isRelated = isRelatedName(props.subj_name, subject.subj_name);
          let isRelatedKeyWord = (props.keyWord === "") || subject.extra_info.replace(' ', '').includes(props.keyWord);
          return (props.subj_name !== "") && isRelated && isRelatedKeyWord ? (
            <LectureBox
            boxType = "search"
            setHoveredSubj = {props.setHoveredSubj}
            setSubjHover = {props.setSubjHover}
            subject = {subject}
            displayPopup = {props.displayPopup}
            addSelSubj = {props.addSelSubj}
            selSubj = {props.selSubj}
            isExistingSubj = {props.isExistingSubj}
            handlePopSubject = {props.handlePopSubject}
            addedSubj={props.addedSubj}
            setAddedSubj={props.setAddedSubj}
          />
          ) : ""
        }
        )}
      </div>
    </div>
    )
}

export default SubjectSearchList;