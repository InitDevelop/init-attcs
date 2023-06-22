import { useContext } from 'react';
import '../../App.css';
import '../../AppMobile.css';
import LectureBox from '../global/LectureBox';
import { PreviewContext } from "../../App";
import { Lecture } from '../../util/Lecture';

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
        담은 강좌
        {/* <button className='button-tiny'
          onClick={
            () => {data.handleAllowMultChange();}
          }
        >{data.allowMult ? "중복 허용됨" : "중복 제외됨"}</button> */}
        <span style={{ marginLeft: "10px", padding: "5px", fontSize: "large" }} className='credit'>
          총 {getCreditSum()}학점
        </span>
      </h2>
      <div className="appTable__selectScrollContainer">
        {data.selSubj.map(
          (subject: Lecture) => {
            return (
              <LectureBox
                key={subject.subjectID + " (" + subject.lectureNumber + ")"}
                boxType={"list"} subject={subject}
                displayPopup={data.displayPopup}
                addLectureToList={data.addSubject}
                removeLectureFromList={data.popSubject}
                setHoveredSubj={data.setHoveredSubj}
                setSubjHover={data.setSubjHover}
                isExistingSubj={data.isExistingSubj}
                selectedLectures={[]}
                lectureGroups={[]}
                includesLecture={function (param: Lecture): boolean {
                  throw new Error('Function not implemented.');
                }}
                isMobile={data.isMobile}
                />
            )
          }
        )}
      </div>
      </div>
    )
}

export default SubjectSelectList;