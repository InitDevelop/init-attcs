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
    <div className="appTable__container" style={{ whiteSpace: "pre-wrap" }}>
      <h2 className="mid_title"><span style={{ marginRight: "5%" }}>찾은 강좌</span>
        <label className='label-1' style={{ fontWeight: "normal", marginRight: "2%" }}>수강반</label>
        <input className="input-1" type="text" style={{width: "20%", height: "80%"}} value={props.keyWord} onChange={props.handleKeywordChange}></input>
      </h2>
      <div className="appTable__scrollContainer">
        {subjects.subjects
        .map(subject => {
          let isRelated = isRelatedName(props.subj_name, subject.subj_name);
          let isRelatedKeyWord = (props.keyWord === "") || subject.extra_info.replace(' ', '').includes(props.keyWord);
          return (props.subj_name.length > 1) && isRelated && isRelatedKeyWord ? (
            <LectureBox
            boxType         = "search"

            addSubject      = {props.addSubject}
            popSubject      = {props.popSubject}

            setSubjHover    = {props.setSubjHover}
            setHoveredSubj  = {props.setHoveredSubj}
            
            subject         = {subject}
            isExistingSubj  = {props.isExistingSubj}

            displayPopup    = {props.displayPopup}
          />
          ) : ""
        }
        )}
      </div>
    </div>
    )
}

export default SubjectSearchList;