import React, { useContext } from 'react';
import lectureData from "../../db/data.json";
import "../../css/AppTable.css"
import SubjectBox from './SubjectBox';
import { CreationContext } from "../../App";
import { lecture } from '../../interfaces/Lecture';

const lectureDatabase = (lectureData as { subjects: lecture[] }).subjects;

function AddSubjectSearchList() {

  const data = useContext(CreationContext);
  let subjectsAdded: string[] = [];

  const accuracy = (abbrev: string, subj_name: string) => {
    let prefix: number = 0;
    if (!isRelatedName(abbrev, subj_name)) {
      prefix -= 1000;
    }
    return prefix + (abbrev.replace(" ", "").length / subj_name.replace(" ", "").length);
  };

  function isRelatedName(abbrev: string, full: string): boolean {
    abbrev = abbrev.replace(" ", "");
    full = full.replace(" ", "");
    let ret: boolean = true;
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
        {lectureDatabase.filter(
          (subject: lecture) => {
            let isRelated = isRelatedName(data.addingSubjName, subject.prof + subject.subj_name + subject.prof);
            return ((data.addingSubjName !== "") && isRelated);
          }
        )
        .sort((a, b) => accuracy(data.addingSubjName, b.subj_name) - accuracy(data.addingSubjName, a.subj_name)).map(subject => {
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