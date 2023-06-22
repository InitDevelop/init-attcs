import { useContext } from 'react'
import './SubjectList.css'
import '../../css/AppTable.css';
import '../../App.css';
import SubjectGroup from './SubjectGroup'
import { CreationContext } from "../../App";
import { lectureGroup } from '../../interfaces/Lecture';

type propType = {
  updateCount: number;
  setUpdateCount: (param: number) => void;
}

function AddedSubjectList(props: propType) {

  const data = useContext(CreationContext);
 
  const getCreditSum = () => {
    let returnValue = 0;
    for (let i = 0; i < data.lectureGroups.length; i++) {
      returnValue += parseInt(data.lectureGroups[i].lectures[0].credit);
    }
    return returnValue;
  }

  return (
    <div className='appTable__container'>
      <h2 className="large-title">담은 강좌
        <span style={{ marginLeft: "10px", padding: "5px", fontSize: "large" }} className='credit'>
          총 {getCreditSum()}학점
        </span>
      </h2>
        <div className="appTable__scrollContainer">
          {
            data.lectureGroups.map(
              (lg: lectureGroup) => {
                return (
                  <SubjectGroup
                    key={lg.subj_id}
                    lectureGroup={lg}
                    displayPopup={data.displayPopup}
                    popAddedLecture={data.removeLectureFromGroup}
                    updateCount={props.updateCount}
                    setUpdateCount={props.setUpdateCount}
                    />
                )
              }
            )
          }
        </div>
    </div>
  )
}

export default AddedSubjectList;