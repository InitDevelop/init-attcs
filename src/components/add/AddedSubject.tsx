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
  isInScenario: boolean;
};

function AddedSubject(props: propType) {
  return (
    <div className='list-addedsubject'>
      <h3>
        <span className={props.isInScenario ? 'highlighted-credit' : 'credit'}
          style={{marginRight: "10px"}}> {props.subject.lect_no} </span> {"\t"}
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