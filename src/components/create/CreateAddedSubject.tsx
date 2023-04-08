import "../../css/SubjectList.css"
import "../../App.css"
import { lecture } from '../../interfaces/Lecture';

type propType = {
  subject: lecture;
  displayPopup: (title: string, content: JSX.Element) => void;
  timeShareLect: lecture[]; 
};

function CreateAddedSubject(props: propType) {
  return (
    <div className='list__addedsubject'
      style={
        { 
          textAlign: "left",
          position: "relative",
          fontSize: "large",
        }
      }
    >
      <span style={{ marginRight: "10px", fontWeight: "700" }}>{props.subject.subj_name}</span>

      {
        props.timeShareLect.length === 1 ? (
        <span style={{ position: "absolute", left: "50%" }}>
          <span className='credit' style={{marginRight: "10px"}}>{props.subject.lect_no}</span>
          <span style={{marginRight: "10px"}}>{props.subject.prof}</span>
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
        </span>
        ) : (
          <button className='button-tiny' onClick={
            () => {
              props.displayPopup("해당 시간대 분반 정보",
              <>
              {
                props.timeShareLect.map((lect: lecture) => {
                  return (
                    <div className='list__addedsubject'
                    style={
                      { 
                        textAlign: "left",
                        position: "relative",
                        fontSize: "large",
                      }
                    }
                  >
                    <span style={{ marginRight: "10px", fontWeight: "700" }}>{lect.subj_name}</span>
                    <span style={{ position: "absolute", left: "50%" }}>
                    <span className='credit' style={{marginRight: "10px"}}>{lect.lect_no}</span>
                    <span style={{marginRight: "10px"}}>{lect.prof}</span>
                    { (lect.lang !== "한국어") && (
                      <span className='credit' style={{marginRight: "10px"}}>{lect.lang}</span>
                    )}
                    </span>
                  </div>
                  )
                })
              }
              <br/>
              시간표에 표시된 강의 장소는 가장 위에 표시된 분반 기준입니다.
              </>
              );
            }
          }>여러 분반 중 선택 가능</button>
        )
      }
      
      
    </div>
  )
}

export default CreateAddedSubject;