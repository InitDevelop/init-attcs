import { useDispatch } from "react-redux";
import { SEASON, SEMESTER, YEAR } from "../../App";
import { Lecture } from "../../types/Lecture";
import "./Popup.css";

export const LectureInformationTable = (props: { lecture: Lecture, useRemove: boolean, useAdd: boolean }) => {

  const dispatch = useDispatch();

  const openInNewTab = (lect: Lecture) => {
    let url: string = "https://sugang.snu.ac.kr/sugang/cc/cc103.action?openSchyy=";
    url += YEAR + "&openShtmFg=U00020000" + SEMESTER + "&openDetaShtmFg=U00030000" + SEASON;
    url += "&sbjtCd=" + lect.subjectID + "&ltNo=" + lect.lectureNumber + "&sbjtSubhCd=000";
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const removeLecture = (lecture: Lecture) => {
    dispatch(
      {
        type: "REMOVE_LECTURE",
        payload: {
          lecture: lecture,
        }
      }
    );
    dispatch({
      type: "SET_DISPLAY_POPUP",
      payload: {
        displayPopup: false,
      }
    });
  }

  const addLecture = (lecture: Lecture) => {
    dispatch(
      {
        type: "ADD_LECTURE",
        payload: {
          lecture: lecture,
        }
      }
    );
  }

  return (
    <table className='lectureinfo-table'>
      <tbody>
        <tr>
          <td colSpan={2}>
            <h4 className='key'>과목명</h4>
            <h4 className='value'>{props.lecture.subjectTitle}</h4>
          </td>
          <td>
            <h4 className='key'>교수</h4>
            <h4 className='value'>{props.lecture.lecturer}</h4>
          </td>
          <td>
            <h4 className='key'>과목 번호</h4>
            <h4 className='value'>{props.lecture.subjectID} ({props.lecture.lectureNumber})</h4>
          </td>
        </tr>
        <tr>
          <td>
            <h4 className='key'>구분</h4>
            <h4 className='value'>{props.lecture.classification}</h4>
          </td>
          <td>
            <h4 className='key'>학년</h4>
            <h4 className='value'>{props.lecture.year}</h4>
          </td>
          <td>
            <h4 className='key'>과정</h4>
            <h4 className='value'>{props.lecture.program} 과정</h4>
          </td>
          <td>
            <h4 className='key'>개설학과</h4>
            <h4 className='value'>{props.lecture.college} {props.lecture.department}</h4>
          </td>
        </tr>
        <tr>
          <td>
            <h4 className='key'>학점</h4>
            <h4 className='value'>{props.lecture.credit}</h4>
          </td>
          <td>
            <h4 className='key'>강의 형태</h4>
            <h4 className='value'>{props.lecture.lectureForm}</h4>
          </td>
          <td>
            <h4 className='key'>강의 언어</h4>
            <h4 className='value'>{props.lecture.language}</h4>
          </td>
          <td>
            <h4 className='key'>강의 장소</h4>
            <h4 className='value'>{props.lecture.lectureRoom}</h4>
          </td>
        </tr>
        <tr>
          <td colSpan={4}>
            <h4 className='key'>강의 시간</h4>
            <h4 className='value'>{props.lecture.time}</h4>
          </td>
        </tr>
        <tr>
          <td colSpan={4}>
            <h4 className='key'>추가 정보</h4>
            <h4 className='value'>{props.lecture.extraInfo}</h4>
          </td>
        </tr>
        <tr>
          <td colSpan={4}>
            <button className="button-gray" onClick={() => openInNewTab(props.lecture)}>강의 계획서 확인하기</button>
            {
              props.useRemove &&
              <button className="button-red left-margin-15" onClick={() => removeLecture(props.lecture)}>제거하기</button>
            }
            {
              props.useAdd &&
              <button className="button-blue left-margin-15" onClick={() => addLecture(props.lecture)}>추가하기</button>
            }
          </td>
        </tr>
      </tbody>
    </table>
  );
}