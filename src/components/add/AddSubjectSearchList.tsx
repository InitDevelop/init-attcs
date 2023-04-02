import React, { useContext } from 'react';
import subjects from "../../db/data.json";
import "../../css/AppTable.css"
import SubjectBox from './SubjectBox.tsx';
import { CreationContext } from "../../App.tsx";

function AddSubjectSearchList() {

  const data = useContext(CreationContext);
  let subjectsAdded = [];

  const accuracy = (abbrev, full) => {
    return (abbrev.replace(" ", "").length / full.replace(" ", "").length);
  };

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
        {subjects.subjects.filter(
          (subject) => {
            let isRelated = isRelatedName(data.addingSubjName, subject.subj_name);
            return ((data.addingSubjName !== "") && isRelated);
          }
        )
        .sort((a, b) => (accuracy(data.addingSubjName, b.subj_name) - accuracy(data.addingSubjName, a.subj_name))).map(subject => {
          if (!subjectsAdded.includes(subject.subj_id)) {
            subjectsAdded.push(subject.subj_id);
            return (
              <SubjectBox
                subj_name           = {subject.subj_name}
                subj_id             = {subject.subj_id}
                clickedSubject      = {data.clickedSubject}
                setClickedSubject   = {data.setClickedSubject}
              />
            )
          }
        }
        )}
      </div>
    </div>
    )
}

export default AddSubjectSearchList;