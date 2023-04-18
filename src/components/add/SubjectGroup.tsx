import "../../css/SubjectList.css"
import '../../css/AppTable.css';
import '../../App.css';
import AddedSubject from './AddedSubject'
import { lecture, lectureGroup } from "../../interfaces/Lecture";
import { CreationContext } from "../../App";
import { useContext } from "react";
import { range } from "../../interfaces/Util";

type propType = {
  lectureGroup: lectureGroup;
  displayPopup: (title: string, content: React.ReactNode) => void;
  popAddedLecture: (param: lecture) => void;
  updateCount: number;
  setUpdateCount: (param: number) => void;
}

function SubjectGroup(props: propType) {
  const data = useContext(CreationContext);

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
          checked={props.lectureGroup.mustInclude}
          onChange={ () => { props.lectureGroup.mustInclude = !props.lectureGroup.mustInclude } }
        />  필수 과목</label>
      </h2>
      {
        props.lectureGroup.lectures.sort((a, b) => parseInt(a.lect_no) - parseInt(b.lect_no)).map(
          subject => {
            return (
              <AddedSubject
                subject = {subject}
                displayPopup = {props.displayPopup}
                popAddedLecture = {props.popAddedLecture}
                updateCount={props.updateCount}
                setUpdateCount={props.setUpdateCount}
                isInScenario={(lect: lecture) => {
                  if (data.scenarios.length > 0) {
                    return data.relatedLectures.includes(lect);
                  } else {
                    return false;
                  }
                }}
              />
            )
          }
        )
      }

    </div>
  )
}

export default SubjectGroup