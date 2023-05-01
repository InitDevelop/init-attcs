import "./SubjectList.css"
import "../../App.css"
import { lecture } from '../../interfaces/Lecture';
import { LectureInformationTable } from "../global/LectureInformationTable";

type propType = {
  subject: lecture;
  displayPopup: (title: string, content: JSX.Element) => void;
  popAddedLecture: (lecture: lecture) => void;
  updateCount: number;
  setUpdateCount: (param: number) => void;
  isInScenario: (param: lecture) => boolean;
};

function AddedSubject(props: propType) {
  return (
    <div className='list-addedsubject' style={{ backgroundColor: props.isInScenario(props.subject) ? "#ccc" : "#fff" }}>
      <h3>
        <span className='credit' style={{marginRight: "10px"}}> {props.subject.lect_no} </span> {"\t"}
        <span 
          className='lecture_name'
          style={{ cursor: "pointer", marginRight: "10px"}}
          onClick={() => {
            props.displayPopup(`${props.subject.subj_name} [${props.subject.subj_id} (${props.subject.lect_no})]`,
              LectureInformationTable(props.subject)
            ); }
          }
          >
            {props.subject.prof}
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