import React, { useContext } from 'react'
import '../../App.css';
import '../../AppMobile.css';
import LectureBox from '../global/LectureBox';
import { PreviewContext } from "../../App";
import { lecture } from '../../interfaces/Lecture';

function SubjectSelectList() {

  const data = useContext(PreviewContext);

  function getCreditSum() {
    let sum = 0;
    for (let i = 0; i < data.selSubj.length; i++) {
      sum += parseInt(data.selSubj[i].credit);
    }
    return sum;
  }

  return (
    <div className="appTable__container">
      <h2 className='large-title' style={{ width: "100%" }}>
        <span style={{ marginRight: "5%" }}>담은 강좌</span>
        <button className='button-tiny'
          onClick={
            () => {data.handleAllowMultChange();}
          }
        >{data.allowMult ? "중복 허용됨" : "중복 제외됨"}</button>
      </h2>
      <div className="appTable__selectScrollContainer">
        {data.selSubj.map(
          (subject: lecture) => {
            return (
              <LectureBox boxType={"list"} subject={subject}
              displayPopup={data.displayPopup}
              addLectureToList={data.addSubject}
              removeLectureFromList={data.popSubject}
              setHoveredSubj={data.setHoveredSubj}
              setSubjHover={data.setSubjHover}
              isExistingSubj={data.isExistingSubj}
              selectedLectures={[]}
              lectureGroups={[]}
              includesLecture={function (param: lecture): boolean {
                throw new Error('Function not implemented.');
              }}/>
            )
          }
        )}
      </div>
      </div>
    )
}

export default SubjectSelectList;