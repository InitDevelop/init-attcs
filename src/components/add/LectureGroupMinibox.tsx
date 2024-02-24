import { useDispatch } from 'react-redux';
import { Lecture } from '../../types/Lecture';
import './AddLectureBox.css';

export const LectureGroupMinibox = ( props: { lecture: Lecture, removeLectureFromGroup: (param: Lecture) => void } ) => {

  const dispatch = useDispatch();

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
            <div className="gray bold large right-margin-10">{props.lecture.lectureNumber}</div>
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
