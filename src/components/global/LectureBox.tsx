import React from 'react'
import '../../css/LectureBox.css'
import '../../App.css'
import '../../AppMobile.css';
import { lecture } from '../../interfaces/Lecture';

type propType = {
  boxType: string;
  SubjectToRemove: lecture;

  setHoveredSubj: (param: lecture) => void;
  subject: lecture;
  setSubjHover: (param: boolean) => void;
  setSubjectToRemove: (param: lecture) => void;
  selectedLectures: lecture[];
  addedLectures: lecture[];
  selectLecture: (param: lecture) => void;
  deselectLecture: (param: lecture) => void;
  displayPopup: (title: string, content: React.ReactNode) => void;

  isExistingSubj: (param: lecture) => boolean;
  addSubject: (param: lecture) => void;
  popSubject: (param: lecture) => void;

  setClickedSubject: (param: string) => void;
}

function LectureBox(props: propType) {
  return (
    <table className='lecturebox' style={
      { 
        width: "100%",
        cursor: (props.boxType === "add" || props.boxType === "remove") ? "pointer" : "auto",
        border: props.boxType === "remove" ? (props.SubjectToRemove === props.subject ? "2px solid #405cf5" : "") : ""
      }}
    onMouseEnter={ (event) => {
      if (props.boxType === "list" || props.boxType === "search") {
        props.setHoveredSubj(props.subject);
        props.setSubjHover(true);
      }
    }}
    onMouseLeave={ (event) => {
      if (props.boxType === "list" || props.boxType === "search") {
        props.setSubjHover(false);
      }
      }
    }
    onClick={ (event) => {
      if (props.boxType === "remove") {
        props.setSubjectToRemove(props.subject);
      }
    }}>

      <tbody>
        <tr>
          {
            (props.boxType === "add") &&
            <td style={{ paddingLeft: "10px" }}
              onClick={ (event) => {
                if (props.selectedLectures.includes(props.subject)) {
                  props.deselectLecture(props.subject);
                } else {
                  props.selectLecture(props.subject);
                }
              }}
            >
              <input style={{ cursor: "pointer", verticalAlign: "middle" }}
              className='checkbox-1'
              type="checkbox"
              checked={
                !props.addedLectures.includes(props.subject) ?
                  props.selectedLectures.includes(props.subject) :
                  true
              }
              disabled={
                props.addedLectures.includes(props.subject)
              }
              onChange={
                (event) => {
                  if (!event.target.checked) {
                    props.deselectLecture(props.subject);
                  } else {
                    props.selectLecture(props.subject);
                  }
                }
              }
            />
            </td>
          }
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
                      }>수강반 제한</button>
                    )}
                    { (props.subject.lang !== "한국어") && (
                      <button className='button-tiny-2' style={{marginLeft: "5px"}} onClick={
                        () => {
                          props.displayPopup("강의 언어", props.subject.lang);
                        }
                      }>외국어</button>
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
          {
            props.boxType !== "add" ? <td style={{width: "20%", textAlign: "center"}}>
            {
              props.boxType === "list" ? (
              <button className="button-0" onClick={() => props.popSubject(props.subject)}>
                제거
              </button> 
              ) : props.boxType === "search" ? (
              <button className="button-0" onClick={() => {
                const addingSubj = props.subject;
                if (props.isExistingSubj(addingSubj)) {
                  props.displayPopup("교과목명 중복",
                    "이미 추가된 교과목입니다.\n해당 강좌를 담으시려면 \"교과목명 중복 허용하기\"를 체크하시길 바랍니다.");
                } else {
                  props.addSubject(addingSubj);
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
  )
}

export default LectureBox