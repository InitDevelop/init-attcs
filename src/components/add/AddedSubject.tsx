import "./SubjectList.css"
import "../../App.css"
import { Lecture } from '../../util/Lecture';
import { LectureInformationTable } from "../global/LectureInformationTable";

type propType = {
  subject: Lecture;
  displayPopup: (title: string, content: JSX.Element) => void;
  popAddedLecture: (Lecture: Lecture) => void;
  updateCount: number;
  setUpdateCount: (param: number) => void;
  isInScenario: boolean;
};

function AddedSubject(props: propType) {
  return (
    <div className='list-addedsubject'>
      <h3>
        <span className={props.isInScenario ? 'highlighted-credit' : 'credit'}
          onClick={() => {
            props.displayPopup(`${props.subject.subjectTitle} [${props.subject.subjectID} (${props.subject.lectureNumber})]`,
              LectureInformationTable(props.subject)
            );}}
          style={{ marginRight: "10px", cursor: "pointer" }}> {props.subject.lectureNumber} </span> {"\t"}
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
            props.displayPopup(`${props.subject.subjectTitle} [${props.subject.subjectID} (${props.subject.lectureNumber})]`,
              LectureInformationTable(props.subject)
            );}}
          >
            {props.subject.lecturer}
        </span>

        <button className='button-tiny-3' style={
          {
            marginLeft: "5px",
            position: "absolute",
            right: "20px"
          }
        } onClick={
            () => {
              props.popAddedLecture(props.subject);
              props.setUpdateCount(props.updateCount + 1);
            }
        }> 제거 </button>
      </h3>
    </div>
  )
}

export default AddedSubject