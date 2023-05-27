import { useContext } from 'react'
import '../../css/AppTable.css';
import '../../App.css';
import '../../AppMobile.css';
import LectureBox from "../global/LectureBox";
import { PreviewContext } from "../../App";
import { lecture } from "../../interfaces/Lecture";

function SubjectSearchList() {

  const data = useContext(PreviewContext);

  return (
    <div className="appTable__container" style={{ whiteSpace: "pre-wrap" }}>
      { !data.isMobile &&
        <p className="large-title">찾은 강좌</p>
      }
      <div className={!data.isMobile ?
        "appTable__scrollContainer" : "appTable__scrollContainer-no-title"}>
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