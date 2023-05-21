import { useContext } from 'react'
import '../../css/AppTable.css';
import '../../App.css';
import '../../AppMobile.css';
import LectureBox from "../global/LectureBox";
import { PreviewContext } from "../../App";
import { lecture } from "../../interfaces/Lecture";
import { PreviewSearchListHelp } from '../global/Information';

function SubjectSearchList() {

  const data = useContext(PreviewContext);

  return (
    <div className="appTable__container" style={{ whiteSpace: "pre-wrap" }}>
      <p className="large-title">찾은 강좌</p>
      <div className="appTable__scrollContainer">
        {
          data.shownLectures.map(
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
                } }
                isMobile={data.isMobile}
                />
              )
            }
          )
        }
      </div>


    </div>
    )
}

export default SubjectSearchList;