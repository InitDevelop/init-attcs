import { useContext } from 'react';
import "../../css/AppTable.css"
import SubjectBox from './SubjectBox';
import { CreationContext } from "../../App";


function AddSubjectSearchList() {
  const data = useContext(CreationContext);
  return (
    <div className="appTable__container"
      style={{ whiteSpace: "pre-wrap" }}>
      { !data.isMobile &&
      <h2 className="large-title">찾은 과목
      </h2>
      }
      <div className={!data.isMobile ?
        "appTable__scrollContainer" : "appTable__scrollContainer-no-title"}>
        {
          data.matchingSubjects.map(subject => 
            <SubjectBox
              key={subject.subjectID}
              subj_name           = {subject.subjectTitle}
              subj_id             = {subject.subjectID}
              clickedSubject      = {data.clickedSubject}
              setClickedSubject   = {data.setClickedSubject}
            />
          )
        }
      </div>
    </div>
    )
}

export default AddSubjectSearchList;