import "./SubjectList.css"
import "../../App.css"
import { LectureInformationTable } from "../global/LectureInformationTable";
import { Lecture } from "../../util/Lecture";

type propType = {
  lecture: Lecture;
  displayPopup: (title: string, content: JSX.Element) => void;
  popAddedLecture: (lecture: Lecture) => void;
  updateCount: number;
  setUpdateCount: (param: number) => void;
  isInScenario: boolean;
};

function AddedSubject(props: propType) {
  return (
    <div className='list-addedsubject'>
      <h3>
        <span className={props.isInScenario ? 'highlighted-credit' : 'credit'}
          style={{marginRight: "10px"}}> {props.lecture.lectureID} </span> {"\t"}
        {
          props.isInScenario &&
          (
            <strong
              style={{marginRight: "10px"}}> {"✅ 포함됨"} </strong>
          )
        }
        <span 
          className='medium-title-hoverable'
          style={{ cursor: "pointer", marginRight: "10px"}}
          onClick={() => {
            props.displayPopup(`${props.lecture.subjectTitle} [${props.lecture.subjectID} (${props.lecture.lectureID})]`,
              LectureInformationTable(props.lecture)
            ); }
          }
          >
            {props.lecture.lecturer}
        </span>

        <button className='button-tiny-3' style={
          {
            marginLeft: "5px",
            position: "absolute",
            right: "20px"
          }
        } onClick={
            () => {
              props.popAddedLecture(props.lecture);
              props.setUpdateCount(props.updateCount + 1);
            }
        }> 제거 </button>
      </h3>
    </div>
  )
}

export default AddedSubject