import "../../css/SubjectList.css"
import "../../App.css"
import { lecture } from '../../interfaces/Lecture';

type propType = {
  subject: lecture;
  displayPopup: (title: string, content: JSX.Element) => void;
  popAddedLecture: (lecture: lecture) => void;
  updateCount: number;
  setUpdateCount: (param: number) => void;
};

function AddedSubject(props: propType) {
  return (
    <div className='list__addedsubject'>
      <h3>
        <span className='credit' style={{marginRight: "10px"}}> {props.subject.lect_no} </span> {"\t"}
        <span 
          className='lecture_name'
          style={{ cursor: "pointer", marginRight: "10px"}}
          onClick={() => {
            props.displayPopup(`${props.subject.subj_name} [${props.subject.subj_id} (${props.subject.lect_no})]`,
              <table className='subjectpopup__table'>
                <tbody>
                  <tr>
                    <td>
                      <h4 className='key'>구분</h4>
                      <h4 className='value'>{props.subject.lect_type}</h4>
                    </td>
                    <td>
                      <h4 className='key'>과정</h4>
                      <h4 className='value'>{props.subject.grad} 과정</h4>
                    </td>
                    <td>
                      <h4 className='key'>개설학과</h4>
                      <h4 className='value'>{props.subject.lect_col} {props.subject.lect_dept}</h4>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h4 className='key'>학년</h4>
                      <h4 className='value'>{props.subject.grade}</h4>
                    </td>
                    <td>
                      <h4 className='key'>강의 형태</h4>
                      <h4 className='value'>{props.subject.lect_form}</h4>
                    </td>
                    <td>
                      <h4 className='key'>강의 장소</h4>
                      <h4 className='value'>{props.subject.lect_room}</h4>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={3}>
                      <h4 className='key'>강의 시간</h4>
                      <h4 className='value'>{props.subject.time}</h4>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={3}>
                      <h4 className='key'>추가 정보</h4>
                      <h4 className='value'>{props.subject.extra_info}</h4>
                    </td>
                  </tr>
                </tbody>
              </table>
            ); }
          }
          >
            {props.subject.prof}
        </span>
        {"\t"}
        { (props.subject.extra_info.includes("®")) && (
          <button className='button-tiny' onClick={
            () => {
              props.displayPopup("수강반 제한 정보", <>{props.subject.extra_info}</>);
            }
          }>수강반</button>
        )}
        { (props.subject.lang !== "한국어") && (
          <button className='button-tiny-2' style={{marginLeft: "5px"}} onClick={
            () => {
              props.displayPopup("강의 언어", <>{props.subject.lang}</>);
            }
          }>언어</button>
        )}

        <button className='button-tiny-3' style={
          {
            marginLeft: "5px",
            position: "absolute",
            right: "20px"
          }
        } onClick={
            () => {
              props.popAddedLecture(props.subject);
              props.setUpdateCount(props.updateCount + 1);
            }
        }> 제거 </button>
      </h3>
    </div>
  )
}

export default AddedSubject