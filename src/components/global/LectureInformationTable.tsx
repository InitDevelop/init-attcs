import "./Popup.css";
import { Lecture } from "../../util/Lecture";

export function LectureInformationTable(lect: Lecture) {
  return (
    <table className='subjectpopup-table'>
      <tbody>
        <tr>
          <td colSpan={2}>
            <h4 className='key'>과목명</h4>
            <h4 className='value'>{lect.subjectTitle}</h4>
          </td>
          <td>
            <h4 className='key'>교수</h4>
            <h4 className='value'>{lect.lecturer}</h4>
          </td>
          <td>
            <h4 className='key'>과목명</h4>
            <h4 className='value'>{lect.subjectID} ({lect.lectureNumber})</h4>
          </td>
        </tr>
        <tr>
          <td>
            <h4 className='key'>구분</h4>
            <h4 className='value'>{lect.classification}</h4>
          </td>
          <td>
            <h4 className='key'>학년</h4>
            <h4 className='value'>{lect.year}</h4>
          </td>
          <td>
            <h4 className='key'>과정</h4>
            <h4 className='value'>{lect.program} 과정</h4>
          </td>
          <td>
            <h4 className='key'>개설학과</h4>
            <h4 className='value'>{lect.college} {lect.department}</h4>
          </td>
        </tr>
        <tr>
          <td>
            <h4 className='key'>학점</h4>
            <h4 className='value'>{lect.credit}</h4>
          </td>
          <td>
            <h4 className='key'>강의 형태</h4>
            <h4 className='value'>{lect.lectureForm}</h4>
          </td>
          <td>
            <h4 className='key'>강의 언어</h4>
            <h4 className='value'>{lect.language}</h4>
          </td>
          <td>
            <h4 className='key'>강의 장소</h4>
            <h4 className='value'>{lect.lectureRoom}</h4>
          </td>
        </tr>
        <tr>
          <td colSpan={4}>
            <h4 className='key'>강의 시간</h4>
            <h4 className='value'>{lect.time}</h4>
          </td>
        </tr>
        <tr>
          <td colSpan={4}>
            <h4 className='key'>추가 정보</h4>
            <h4 className='value'>{lect.extraInfo}</h4>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export function MultLectureInformationTable(lectures: Lecture[]) {
  return (
    <>
    {
      lectures.map(
        lect => 
      <table className='subjectpopup-table' style={{ marginTop: "10px" }}>
      <tbody>
        <tr>
          <td colSpan={2}>
            <h4 className='key'>과목명</h4>
            <h4 className='value'>{lect.subjectTitle}</h4>
          </td>
          <td style={{ backgroundColor: "#ECB546" }}>
            <h4 className='key'>교수</h4>
            <h4 className='value'>{lect.lecturer}</h4>
          </td>
          <td>
            <h4 className='key'>과목명</h4>
            <h4 className='value'>{lect.subjectID} ({lect.lectureNumber})</h4>
          </td>
        </tr>
        <tr>
          <td>
            <h4 className='key'>구분</h4>
            <h4 className='value'>{lect.classification}</h4>
          </td>
          <td>
            <h4 className='key'>학년</h4>
            <h4 className='value'>{lect.year}</h4>
          </td>
          <td>
            <h4 className='key'>과정</h4>
            <h4 className='value'>{lect.program} 과정</h4>
          </td>
          <td>
            <h4 className='key'>개설학과</h4>
            <h4 className='value'>{lect.college} {lect.department}</h4>
          </td>
        </tr>
        <tr>
          <td>
            <h4 className='key'>학점</h4>
            <h4 className='value'>{lect.credit}</h4>
          </td>
          <td>
            <h4 className='key'>강의 형태</h4>
            <h4 className='value'>{lect.lectureForm}</h4>
          </td>
          <td>
            <h4 className='key'>강의 언어</h4>
            <h4 className='value'>{lect.language}</h4>
          </td>
          <td>
            <h4 className='key'>강의 장소</h4>
            <h4 className='value'>{lect.lectureRoom}</h4>
          </td>
        </tr>
        <tr>
          <td colSpan={4}>
            <h4 className='key'>강의 시간</h4>
            <h4 className='value'>{lect.time}</h4>
          </td>
        </tr>
        <tr>
          <td colSpan={4}>
            <h4 className='key'>추가 정보</h4>
            <h4 className='value'>{lect.extraInfo}</h4>
          </td>
        </tr>
      </tbody>
    </table>
      )
    }
    </>
  );
}