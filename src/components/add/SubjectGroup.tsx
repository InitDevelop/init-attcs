import "../../css/SubjectList.css"
import '../../css/AppTable.css';
import '../../App.css';
import AddedSubject from './AddedSubject'
import { lecture, lectureGroup } from "../../interfaces/Lecture";

type propType = {
  lectureGroup: lectureGroup;
  displayPopup: (title: string, content: React.ReactNode) => void;
  popAddedLecture: (param: lecture) => void;
  updateCount: number;
  setUpdateCount: (param: number) => void;
}

function SubjectGroup(props: propType) {

  return (
    <div className='list__subjectgroupbox'>
      <h2 style={{fontWeight: "500"}}>
        <strong>{props.lectureGroup.lectures[0].subj_name}</strong>
        {"      "}<span> {props.lectureGroup.lectures.length}개 강좌 </span>
        {"      "}
        <label>
        <input style = {{ cursor: "pointer", verticalAlign: "middle" }}
          className='checkbox-1'
          type="checkbox"
          checked={true}
        />  필수 과목</label>
      </h2>
      {
        props.lectureGroup.lectures.map(
          subject => {
            return (
              <AddedSubject
                subject = {subject}
                displayPopup = {props.displayPopup}
                popAddedLecture = {props.popAddedLecture}
                updateCount={props.updateCount}
                setUpdateCount={props.setUpdateCount}  
              />
            )
          }
        )
      }

    </div>
  )
}

export default SubjectGroup