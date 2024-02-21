import { useDispatch } from 'react-redux';
import { Lecture } from '../../types/Lecture';
import './LectureBox.css';

export const LectureBox = (props: { lecture: Lecture, intersects: boolean | undefined, alreadyExists: boolean }) => {

  const isNotKorean = props.lecture.language !== "한국어";
  const hasRestriction = props.lecture.extraInfo.includes("®");

  const dispatch = useDispatch();

  const handleMouseEnter = () => {
    dispatch({
      type: "SET_HOVERED",
      payload: {
        hovered: true,
      }
    });

    dispatch({
      type: "SET_HOVERED_LECTURE",
      payload: {
        lecture: props.lecture,
      }
    });
  }

  const handleMouseLeave = () => {
    dispatch({
      type: "SET_HOVERED",
      payload: {
        hovered: false,
      }
    });
  }

  const handleAddLecture = () => {
    dispatch({
      type: "ADD_LECTURE",
      payload: {
        lecture: props.lecture,
      }
    });
  }

  const handleRemoveLecture = () => {
    dispatch({
      type: "REMOVE_LECTURE",
      payload: {
        lecture: props.lecture,
      }
    });
  }

  const handleClick = (lecture: Lecture) => {
    dispatch({
      type: "SHOW_POPUP_LECTURES",
      payload: {
        popupTitle: lecture.subjectTitle + " (" + lecture.lectureNumber + ")",
        popupType: 'lectures add',
        useCloseButton: true,
        popupLectures: [lecture],
      }
    });
  }

  return (
    <div className='lecturebox-outer' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="lecturebox-inner">
        <div className="lecturebox-inner-left" onClick={() => handleClick(props.lecture)}>
          <div className="lecturebox-row">
            <div className="gray regular large right-margin-10">{props.lecture.program}</div>
            <div className="gray regular large right-margin-10">{props.lecture.classification}</div>
            <div className="extrabold hover large right-margin-15">{props.lecture.subjectTitle}</div>
            <div className="regular large right-margin-10">{props.lecture.lecturer}</div>

          </div>
          <div className="lecturebox-row">
            <div className="outline bold small right-margin-10">{props.lecture.credit}학점</div>
            {
              isNotKorean && <div className="blue bold small right-margin-10">외국어 강의</div>
            }
            {
              hasRestriction && <div className="lightblue bold small right-margin-10">수강반 제한</div>
            }
            {
              props.intersects && <div className="red bold small right-margin-10">시간 겹침</div>
            }
            {
              props.alreadyExists && <div className="orange bold small right-margin-10">담은 강좌</div>
            }
            <div className="bold regular small right-margin-10">{props.lecture.college} {props.lecture.department} 개설</div>
            <div className="regular small right-margin-10">{props.lecture.subjectID} ({props.lecture.lectureNumber})</div>
          </div>
        </div>

        <div className="lecturebox-inner-right">
          <button
            className={props.alreadyExists ? "button-red" : "button-blue"}
            onClick={() => { if (props.alreadyExists) handleRemoveLecture(); else handleAddLecture();}}>
              {props.alreadyExists ? "제거" : "추가"}
          </button>
        </div>
      </div>
    </div>
  )
}
