import lectureData from "../../db/data.json";
import React, { useContext } from 'react'
import '../../css/AppTable.css';
import '../../AppMobile.css';
import '../../App.css';
import LectureBox from "../global/LectureBox";
import { PreviewContext } from "../../App";
import { lecture } from "../../interfaces/Lecture";

const lectureDatabase = (lectureData as { subjects: lecture[] }).subjects;

function SubjectSearchList() {

  const data = useContext(PreviewContext);

  const accuracy = (abbrev: string, full: string) => {
    return (abbrev.replace(" ", "").length / full.replace(" ", "").length);
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
      <h2 className="mid_title"><span style={{ marginRight: "5%" }}>찾은 강좌</span>
        <label className='label-1' style={{ fontWeight: "normal", marginRight: "2%" }}>수강반</label>
        <input className="input-1" type="text" style={{width: "20%", height: "80%"}} value={data.keyWord} onChange={data.handleKeywordChange}></input>
      </h2>
      <div className="appTable__scrollContainer">
        {
          lectureDatabase
          .filter(
            (subject: lecture) => {
              let args = data.searchText.split(" ");
              let isRelatedProf;
              let isRelated;
              if (args.length > 1) {
                isRelated = isRelatedName(
                  data.searchText.substring(0, data.searchText.length - args[args.length - 1].length), subject.subj_name);
                isRelatedProf = isRelatedName(args[args.length - 1], subject.prof);
              } else {
                isRelated = isRelatedName(data.searchText, subject.subj_name);
                isRelatedProf = true;
              }
              let isRelatedKeyWord = (data.keyWord === "") || subject.extra_info.replace(' ', '').includes(data.keyWord);
              return ((data.searchText.length > 1) && isRelated && isRelatedProf && isRelatedKeyWord);
            }
          )
          .sort((a, b) => (accuracy(data.searchText, b.subj_name) - accuracy(data.searchText, a.subj_name))).map(
            subject => {
              return (
                <LectureBox
                  boxType="search"
                  addSubject={data.addSubject}
                  popSubject={data.popSubject}
                  setSubjHover={data.setSubjHover}
                  setHoveredSubj={data.setHoveredSubj}
                  subject={subject}
                  isExistingSubj={data.isExistingSubj}
                  displayPopup={data.displayPopup} SubjectToRemove={{
                    lect_type: "",
                    lect_col: "",
                    lect_dept: "",
                    grad: "",
                    grade: "",
                    subj_id: "",
                    lect_no: "",
                    subj_name: "",
                    subj_subname: "",
                    credit: "",
                    cred_lect: "",
                    cred_lab: "",
                    time: "",
                    lect_form: "",
                    lect_room: "",
                    prof: "",
                    student_count: "",
                    extra_info: "",
                    lang: ""
                  }} setSubjectToRemove={function (param: lecture): void {
                    throw new Error("Function not implemented.");
                  } } selectedLectures={[]} addedLectures={[]} selectLecture={function (param: lecture): void {
                    throw new Error("Function not implemented.");
                  } } deselectLecture={function (param: lecture): void {
                    throw new Error("Function not implemented.");
                  } } setClickedSubject={function (param: string): void {
                    throw new Error("Function not implemented.");
                  } }              />
              )
            }
          )
        }
      </div>
    </div>
    )
}

export default SubjectSearchList;