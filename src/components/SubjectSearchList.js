import subjects from "../db/data.json";
import React from 'react'
import '../css/Table.css';
import '../App.css';
import LectureBoxSearch from "./LectureBoxSearch";


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
      <div className="table__container">
        <span className="mid_title">찾은 강좌</span>
        <div className="table__scroll_container">
        <table className="table_borderless">
          <tbody>
            {subjects.subjects
            .map(subject => {
              let isRelated = isRelatedName(props.subj_name, subject.subj_name);
              let isRelatedKeyWord = (props.keyWord === "") || isRelatedName(props.keyWord, subject.extra_info);
              return (props.subj_name !== "") && isRelated && isRelatedKeyWord ? (
                <LectureBoxSearch
                setHoveredSubj = {props.setHoveredSubj}
                setSubjHover = {props.setSubjHover}
                subject = {subject}
                displayPopup = {props.displayPopup}
                addSelSubj = {props.addSelSubj}
                selSubj = {props.selSubj}
                isExistingSubj = {props.isExistingSubj}
                />

              ) : ""
            }
            )}
          </tbody>
        </table>
        </div>
      </div>
      )
}

export default SubjectSearchList;