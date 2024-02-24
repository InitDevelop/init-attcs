import { Lecture } from '../../types/Lecture';
import { LectureGroup } from '../../types/LectureGroup';
import './LectureGroupBox.css';
import { LectureGroupMinibox } from './LectureGroupMinibox';

export const LectureGroupBox = (
  props: {
    lectureGroup: LectureGroup,
    showLectures: boolean,
    toggleShow: (param: string) => void,
    removeLectureFromGroup: (param: Lecture) => void,
  }
  ) => {

  const showAllLectures = props.showLectures;
  const numOfLectures = props.lectureGroup.lectures.length;

  return (
    <div>
      <div className='lecturegroup-header'>
        {
          props.lectureGroup.lectures.length > 0 &&
            <>
              <span className="darkergray bold large right-margin-10">{props.lectureGroup.lectures[0].credit}학점</span>
              <span className="darkgray regular large right-margin-10">{props.lectureGroup.lectures[0].classification}</span>
              <span className="large bold right-margin-10">{props.lectureGroup.lectures[0].subjectTitle}</span>
              <span className="large regular">({props.lectureGroup.lectures[0].subjectID})</span>
            </>
        }
      </div>
      <div className='lecturegroup-box'>
      
        <div className='large extrabold hover disable-select' onClick={() => props.toggleShow(props.lectureGroup.subjectID)}>
          {
            showAllLectures ?
            `▼ ${numOfLectures}개의 강좌` : `▶ ${numOfLectures}개의 강좌`
          }
        </div>
        {
          showAllLectures && 
          <div className="search-result-container">
            {
              props.lectureGroup.lectures.map(lecture => 
                <LectureGroupMinibox lecture={lecture} removeLectureFromGroup={props.removeLectureFromGroup}/>
              )
            }
          </div>
        }
      </div>
    </div>
  )
}
