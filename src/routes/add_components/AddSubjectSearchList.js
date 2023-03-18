import React from 'react';
import subjects from "../../db/data.json";
import "../../css/AppTable.css"
import SubjectBox from './SubjectBox';

function AddSubjectSearchList(props) {

  let subjectsAdded = [];

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
      <h2 className="mid_title">찾은 과목
      </h2>
      <div className="appTable__scrollContainer">
        {subjects.subjects
        .map(subject => {
          let isRelated = isRelatedName(props.subj_name, subject.subj_name);
          
          if ((props.subj_name !== "") && isRelated && !subjectsAdded.includes(subject.subj_id)) {
            subjectsAdded.push(subject.subj_id);
            return (
              <SubjectBox
                subj_name = {subject.subj_name}
                subj_id = {subject.subj_id}
              />
            )
          } else {
            return ("")
          }
        }
        )}
      </div>
    </div>
    )
}

export default AddSubjectSearchList