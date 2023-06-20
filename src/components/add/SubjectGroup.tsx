import "./SubjectList.css"
import '../../css/AppTable.css';
import '../../App.css';
import AddedSubject from './AddedSubject'
import { CreationContext } from "../../App";
import { useContext } from "react";
import { LectureGroup } from "../../util/LectureGroup";
import { Lecture } from "../../util/Lecture";
import { isSameLecture } from "../../util/LectureUtil";

type propType = {
  lectureGroup: LectureGroup;
  displayPopup: (title: string, content: React.ReactNode) => void;
  popAddedLecture: (param: Lecture) => void;
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
        <strong style={{ marginRight: "20px" }}>{props.lectureGroup.lectures[0].subjectTitle}</strong>
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
        props.lectureGroup.lectures.sort((a, b) => parseInt(a.lectureID) - parseInt(b.lectureID)).map(
          subject => {
            return (
              <AddedSubject
                key={subject.subjectID + " (" + subject.lectureID + ")"}
                lecture = {subject}
                displayPopup = {props.displayPopup}
                popAddedLecture = {props.popAddedLecture}
                updateCount={props.updateCount}
                setUpdateCount={props.setUpdateCount}
                isInScenario={
                  (data.scenarios.length > 0) ?
                  (data.relatedLectures.filter(l => isSameLecture(l, subject)).length > 0)
                  :
                  false
                  }
              />
            )
          }
        )
      }

    </div>
  )
}

export default SubjectGroup