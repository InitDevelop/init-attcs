import React from 'react'
import '../../css/LectureBox.css'
import '../../App.css'
import '../../AppMobile.css';
import { lecture, lectureGroup } from '../../interfaces/Lecture';

type propType = {
  boxType: string;
  // "search" and "list" is for the preview page
  // "add" is for the add page

  // Common properties
  subject: lecture;
  displayPopup: (title: string, content: React.ReactNode) => void;

  addLectureToList: (param: lecture) => void;
  removeLectureFromList: (param: lecture) => void;

  // For preview page - both search and list
  setHoveredSubj: (param: lecture) => void;
  setSubjHover: (param: boolean) => void;

  isExistingSubj: (param: lecture) => boolean;

  // For add page
  selectedLectures: lecture[];

  lectureGroups: lectureGroup[];
  includesLecture: (param: lecture) => boolean;

}

function LectureBox(props: propType) {
  return (
    <table className='lecturebox'
    style={
      {
        width: "100%",
        cursor: (props.boxType === "add") ? "pointer" : "auto"
      }
    }
    onMouseEnter={ () => {
      if (props.boxType === "search" || props.boxType === "list") {
        props.setHoveredSubj(props.subject);
        props.setSubjHover(true);
      }
    }}
    onMouseLeave={ () => {
      if (props.boxType === "search" || props.boxType === "list") {
        props.setSubjHover(false);
      }
      }
    }
    onClick={ () => {
      // TODO To be added...
    }}
    >

      <tbody>
        <tr>

          {/* A checkbox that conditionally appears in the add page */}
          {/* The functions removeLectureFromList and addLectureToList is used in the context of the add page! */}

          {
            (props.boxType === "add") &&
            <td style={{ paddingLeft: "10px" }}
              onClick={ () => {
                if (props.selectedLectures.includes(props.subject)) {
                  props.removeLectureFromList(props.subject);
                } else {
                  props.addLectureToList(props.subject);
                }
              }}
            >
              <input className='checkbox-1' type="checkbox" style={{ cursor: "pointer", verticalAlign: "middle" }}
                checked={
                  props.includesLecture(props.subject) ?
                    true :
                    props.selectedLectures.includes(props.subject)
                }
                disabled={
                  props.includesLecture(props.subject)
                }
                onChange={
                  (event) => {
                    if (!event.target.checked) {
                      props.removeLectureFromList(props.subject);
                    } else {
                      props.addLectureToList(props.subject);
                    }
                  }
                }
              />
            </td>
          }

          {/* main lecture box body */}

          <td style={{width: "80%", whiteSpace: "pre-wrap"}}>
            <table className='lecturebox__table_in_table'>
              <tbody>
                <tr>
                  <td>
                    <span 
                      className='lecture_name'
                      style={{ fontWeight: "600", cursor: "pointer" }}
                      onClick={() => { if (props.boxType !== "remove") {
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
                      }>
                      {props.subject.subj_name + "  "}
                    </span>
                    { (props.subject.extra_info.includes("®")) && (
                      <button className='button-tiny' onClick={
                        () => {
                          props.displayPopup("수강반 제한 정보", props.subject.extra_info);
                        }
                      }>수강반</button>
                    )}
                    { (props.subject.lang !== "한국어") && (
                      <button className='button-tiny-2' style={{marginLeft: "5px"}} onClick={
                        () => {
                          props.displayPopup("강의 언어", props.subject.lang);
                        }
                      }>언어</button>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className='credit'>{props.subject.credit + "학점"}</span>
                    <span>{"  " + props.subject.prof}{"  " + props.subject.subj_id} ({props.subject.lect_no})</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>

          {/* button that appears at the very right */}
          
          { (props.boxType !== "add") ?
            <td style={{width: "20%", textAlign: "center"}}>
            {
              props.boxType === "list" ? (
              
              <button className="button-0" onClick={() => props.removeLectureFromList(props.subject)}>
                제거
              </button> 
              )
              
              : 
              
              props.boxType === "search" ? (
              <button className="button-0" onClick={() => {
                const addingSubj = props.subject;
                if (props.isExistingSubj(addingSubj)) {
                  props.displayPopup("교과목명 중복",
                    "이미 추가된 교과목입니다.\n해당 강좌를 담으시려면 \"교과목명 중복 허용하기\"를 체크하시길 바랍니다.");
                } else {
                  props.addLectureToList(addingSubj);
                }
                }
                }>
                추가
              </button>


              ) : (<p></p>)
            }
            </td> : ("")
          }

        </tr>
      </tbody>

    </table>
  );
}

export default LectureBox;