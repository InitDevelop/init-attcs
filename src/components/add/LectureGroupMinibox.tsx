import { useDispatch, useSelector } from 'react-redux';
import { Lecture } from '../../types/Lecture';
import './AddLectureBox.css';
import { combinedStateType } from '../../reducers';

export const LectureGroupMinibox = ( props: { lecture: Lecture, removeLectureFromGroup: (param: Lecture) => void } ) => {

  const relatedLectures = useSelector((state: combinedStateType) => state.scenarioReducer.relatedLectures);
  const dispatch = useDispatch();

  const isRelated = (relatedLectures.filter(l => l.id === props.lecture.id).length > 0);

  const isNotKorean = props.lecture.language !== "한국어";
  const hasRestriction = props.lecture.extraInfo.includes("®");

  const handleClick = (lecture: Lecture) => {
    dispatch({
      type: "SHOW_POPUP_LECTURES",
      payload: {
        popupTitle: lecture.subjectTitle + " (" + lecture.lectureNumber + ")",
        popupType: 'lectures',
        useCloseButton: true,
        popupLectures: [lecture],
      }
    });
  }

  return (
    <div className='minibox-outer'>
      <div className='minibox-inner'>
        <div className="minibox-inner-left" onClick={() => handleClick(props.lecture)}>
          <div className="minibox-row">
            <div className={ (isRelated ? 'lightgreen' : 'gray') + " bold large right-margin-10" }>{props.lecture.lectureNumber}</div>
            <div className="regular large right-margin-10">{props.lecture.lecturer}</div>
            {
              isNotKorean && <div className="blue bold small right-margin-10">외국어</div>
            }
            {
              hasRestriction && <div className="lightblue bold small right-margin-10">수강반</div>
            }
          </div>
        </div>
        <div className="minibox-inner-right">
          <button className="button-red tiny-button" onClick={() => props.removeLectureFromGroup(props.lecture)}>
            <span className='small'>제거</span>
          </button>
        </div>
      </div>
    </div>
  )
}
