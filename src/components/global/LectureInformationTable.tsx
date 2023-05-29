import "./Popup.css";
import { lecture } from "../../interfaces/Lecture";

export function LectureInformationTable(lect: lecture) {
  return (
    <table className='subjectpopup-table'>
      <tbody>
        <tr>
          <td colSpan={2}>
            <h4 className='key'>과목명</h4>
            <h4 className='value'>{lect.subj_name}</h4>
          </td>
          <td>
            <h4 className='key'>교수</h4>
            <h4 className='value'>{lect.prof}</h4>
          </td>
          <td>
            <h4 className='key'>과목명</h4>
            <h4 className='value'>{lect.subj_id} ({lect.lect_no})</h4>
          </td>
        </tr>
        <tr>
          <td>
            <h4 className='key'>구분</h4>
            <h4 className='value'>{lect.lect_type}</h4>
          </td>
          <td>
            <h4 className='key'>학년</h4>
            <h4 className='value'>{lect.grade}</h4>
          </td>
          <td>
            <h4 className='key'>과정</h4>
            <h4 className='value'>{lect.grad} 과정</h4>
          </td>
          <td>
            <h4 className='key'>개설학과</h4>
            <h4 className='value'>{lect.lect_col} {lect.lect_dept}</h4>
          </td>
        </tr>
        <tr>
          <td>
            <h4 className='key'>학점</h4>
            <h4 className='value'>{lect.credit}</h4>
          </td>
          <td>
            <h4 className='key'>강의 형태</h4>
            <h4 className='value'>{lect.lect_form}</h4>
          </td>
          <td>
            <h4 className='key'>강의 언어</h4>
            <h4 className='value'>{lect.lang}</h4>
          </td>
          <td>
            <h4 className='key'>강의 장소</h4>
            <h4 className='value'>{lect.lect_room}</h4>
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
            <h4 className='value'>{lect.extra_info}</h4>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export function MultLectureInformationTable(lectures: lecture[]) {
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
            <h4 className='value'>{lect.subj_name}</h4>
          </td>
          <td style={{ backgroundColor: "#ECB546" }}>
            <h4 className='key'>교수</h4>
            <h4 className='value'>{lect.prof}</h4>
          </td>
          <td>
            <h4 className='key'>과목명</h4>
            <h4 className='value'>{lect.subj_id} ({lect.lect_no})</h4>
          </td>
        </tr>
        <tr>
          <td>
            <h4 className='key'>구분</h4>
            <h4 className='value'>{lect.lect_type}</h4>
          </td>
          <td>
            <h4 className='key'>학년</h4>
            <h4 className='value'>{lect.grade}</h4>
          </td>
          <td>
            <h4 className='key'>과정</h4>
            <h4 className='value'>{lect.grad} 과정</h4>
          </td>
          <td>
            <h4 className='key'>개설학과</h4>
            <h4 className='value'>{lect.lect_col} {lect.lect_dept}</h4>
          </td>
        </tr>
        <tr>
          <td>
            <h4 className='key'>학점</h4>
            <h4 className='value'>{lect.credit}</h4>
          </td>
          <td>
            <h4 className='key'>강의 형태</h4>
            <h4 className='value'>{lect.lect_form}</h4>
          </td>
          <td>
            <h4 className='key'>강의 언어</h4>
            <h4 className='value'>{lect.lang}</h4>
          </td>
          <td>
            <h4 className='key'>강의 장소</h4>
            <h4 className='value'>{lect.lect_room}</h4>
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
            <h4 className='value'>{lect.extra_info}</h4>
          </td>
        </tr>
      </tbody>
    </table>
      )
    }
    </>
  );
}