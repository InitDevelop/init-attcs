import lectureData from "../../db/data.json";
import React, { useContext } from 'react'
import '../../css/AppTable.css';
import '../../App.css';
import '../../AppMobile.css';
import LectureBox from "../global/LectureBox";
import { PreviewContext } from "../../App";
import { lecture } from "../../interfaces/Lecture";

const lectureDatabase = (lectureData as { subjects: lecture[] }).subjects;

function SubjectSearchList() {

  const data = useContext(PreviewContext);

  const accuracy = (abbrev: string, subj_name: string, prof: string) => {
    let prefix: number = 0;
    if (!isRelatedName(abbrev, subj_name)) {
      prefix -= 1000;
    }
    return prefix + (abbrev.replace(" ", "").length / subj_name.replace(" ", "").length);
  };

  function isRelatedName(abbrev: string, full: string) {
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
      <span className="large-title">
        <span style={{ marginRight: "5%" }}>찾은 강좌</span>
        <label className='label-1' style={{ fontWeight: "normal", marginRight: "2%" }}>
          <span className="large-text">수강반</span>
        </label>
        <input className="input-1" type="text" style={{width: "20%", height: "100%", fontSize: "17px"}} value={data.keyWord} onChange={data.handleKeywordChange}></input>
      </span>
      <div className="appTable__scrollContainer">
        {
          lectureDatabase
          .filter(
            (subject: lecture) => {
              let isRelated = isRelatedName(data.searchText, subject.prof + subject.subj_name + subject.prof);
              let isRelatedKeyWord = (data.keyWord === "") || subject.extra_info.replace(' ', '').includes(data.keyWord);
              return ((data.searchText.length > 1) && isRelated && isRelatedKeyWord);
            }
          )
          .sort((a, b) => (accuracy(data.searchText, b.subj_name, b.prof) - accuracy(data.searchText, a.subj_name, a.prof))).map(
            (subject: lecture) => {
              return (
                <LectureBox boxType={"search"} subject={subject}
                displayPopup={data.displayPopup}
                addLectureToList={data.addSubject}
                removeLectureFromList={data.popSubject}
                setHoveredSubj={data.setHoveredSubj}
                setSubjHover={data.setSubjHover}
                isExistingSubj={data.isExistingSubj}
                selectedLectures={[]}
                lectureGroups={[]}
                includesLecture={function (param: lecture): boolean {
                  throw new Error("Function not implemented.");
                } }/>
              )
            }
          )
        }
      </div>
    </div>
    )
}

export default SubjectSearchList;