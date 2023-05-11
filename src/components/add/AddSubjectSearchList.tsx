import React, { useContext } from 'react';
import "../../css/AppTable.css"
import SubjectBox from './SubjectBox';
import { CreationContext } from "../../App";
import { lecture } from '../../interfaces/Lecture';
import { CheckRelatedLecture, isRelatedName } from '../global/CheckRelatedLecture';


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

  return (
    <div className="appTable__container" style={{ whiteSpace: "pre-wrap" }}>
      <h2 className="large-title">찾은 과목
      </h2>
      <div className="appTable__scrollContainer">
        {data.lectureDatabase.filter(
          (lect: lecture) => {
            return ((data.addingSubjName !== "") && CheckRelatedLecture(data.addingSubjName, lect));
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