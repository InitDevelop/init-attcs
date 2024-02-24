import { useDispatch, useSelector } from "react-redux";
import { Lecture } from "../../types/Lecture";
import './AddLectureBox.css';

export const AddLectureBox = (
  props: {
    lecture: Lecture,
    selectedLectureList: Lecture[],
    removeLectureFromList: (param: Lecture) => void,
    addLectureToList: (param: Lecture) => void,
    isIncludedInGroups: (param: Lecture) => boolean,
    isIncludedInList: (param: Lecture) => boolean,
  }
  ) => {
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
    <div className='addlecturebox-outer' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="addlecturebox-inner">
        <div className="addlecturebox-inner-left">
          <input className='checkbox-1' type="checkbox" style={{ cursor: "pointer", verticalAlign: "middle" }}
            checked={ props.isIncludedInGroups(props.lecture) ? true : props.isIncludedInList(props.lecture) }
            disabled={ props.isIncludedInGroups(props.lecture) }
            onChange={
              (event) => {
                if (!event.target.checked) {
                  props.removeLectureFromList(props.lecture);
                } else {
                  props.addLectureToList(props.lecture);
                }
              }
            }
          />
        </div>
        <div className="addlecturebox-inner-right" onClick={() => handleClick(props.lecture)}>
          <div className="addlecturebox-row">
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
      </div>
    </div>
  )
}
