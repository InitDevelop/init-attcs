import "./SubjectList.css"
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

  const handleRemoveAll = () => {
    for (const lect of props.lectureGroup.lectures) {
      props.popAddedLecture(lect);
    }
    props.setUpdateCount(props.updateCount + 1);
  }

  return (
    <div className='list-subjectgroupbox'>
      <h2 style={{fontWeight: "500"}}>
        <strong style={{ marginRight: "20px" }}>{props.lectureGroup.lectures[0].subj_name}</strong>
        <label style={{ marginRight: "20px" }}>
        <input style = {{ cursor: "pointer", verticalAlign: "middle" }}
          className='checkbox-1'
          type="checkbox"
          checked={props.lectureGroup.mustInclude}
          onChange={ () => { props.lectureGroup.mustInclude = !props.lectureGroup.mustInclude } }
        />  필수 과목</label>
        <button className="button-tiny" onClick={handleRemoveAll}>전체 제거</button>
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