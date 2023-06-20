import React from 'react'
import './LectureBox.css'
import '../../App.css'
import '../../AppMobile.css';
import { LectureInformationTable } from './LectureInformationTable';
import { LectureGroup } from '../../util/LectureGroup';
import { Lecture } from '../../util/Lecture';

type propType = {
  boxType: string;
  // "search" and "list" is for the preview page
  // "add" is for the add page

  // Common properties
  subject: Lecture;
  displayPopup: (title: string, content: React.ReactNode) => void;

  addLectureToList: (param: Lecture) => void;
  removeLectureFromList: (param: Lecture) => void;

  // For preview page - both search and list
  setHoveredSubj: (param: Lecture) => void;
  setSubjHover: (param: boolean) => void;

  isExistingSubj: (param: Lecture) => boolean;

  // For add page
  selectedLectures: Lecture[];

  lectureGroups: LectureGroup[];
  includesLecture: (param: Lecture) => boolean;
  isMobile: boolean;
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
      if (props.boxType === "search" || props.boxType === "list" || props.boxType === "add") {
        props.setHoveredSubj(props.subject);
        props.setSubjHover(true);
      }
    }}
    onMouseLeave={ () => {
      if (props.boxType === "search" || props.boxType === "list" || props.boxType === "add") {
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
            <table className='lecturebox-table-in-table'>
              <tbody>
                <tr>
                  <td>
                    <span 
                      className='medium-title-hoverable'
                      onClick={() => { if (props.boxType !== "remove") {
                        props.displayPopup(`${props.subject.subjectTitle} [${props.subject.subjectID} (${props.subject.lectureID})]`,
                          LectureInformationTable(props.subject)
                        ); }
                      }
                      }>
                      {props.subject.subjectTitle + "  "}
                    </span>
                    { (props.subject.extraInfo.includes("®")) && !props.isMobile && (
                      <button className='button-tiny' onClick={
                        () => {
                          if (!props.isMobile) props.displayPopup("수강반 제한 정보", props.subject.extraInfo);
                        }
                      }><p style={{fontSize: "medium", fontWeight: 700}}>수강반</p></button>
                    )}
                    { (props.subject.language !== "한국어") && !props.isMobile && (
                      <button className='button-tiny-2' style={{marginLeft: "5px"}} onClick={
                        () => {
                          if (!props.isMobile) props.displayPopup("강의 언어", props.subject.language);
                        }
                      }><p style={{fontSize: "medium", fontWeight: 700}}>언어</p></button>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className='credit'>{props.subject.credit + "학점"}</span>{"  "}
                    { !props.isMobile &&
                      <span>{"  " + props.subject.lecturer}{"  " + props.subject.subjectID} ({props.subject.lectureID})</span>
                    }
                    { (props.subject.extraInfo.includes("®")) && props.isMobile && (
                      <button className='button-tiny'>
                        <p style={{fontSize: "medium", fontWeight: 700}}>수강반 제한</p>
                      </button>
                    )}
                    { (props.subject.language !== "한국어") && props.isMobile && (
                      <button className='button-tiny-2' style={{marginLeft: "5px"}}>
                        <p style={{fontSize: "medium", fontWeight: 700}}>외국어</p>
                      </button>
                    )}
                  </td>
                </tr>
                { props.isMobile &&
                  <tr>
                    <td>
                      <span>{props.subject.lecturer}{"  " + props.subject.subjectID} ({props.subject.lectureID})</span>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </td>

          {/* button that appears at the very right */}
          
          { (props.boxType !== "add") ?
            <td style={{width: "20%", textAlign: "center"}}>
            {
              props.boxType === "list" ? (
              
              <button className="button-0" onClick={() => {
                props.removeLectureFromList(props.subject);
                props.setSubjHover(false);
              }}>
                제거
              </button> 
              )
              
              : 
              
              props.boxType === "search" ? (
              <button className="button-0" onClick={() => {
                const addingSubj = props.subject;
                if (props.isExistingSubj(addingSubj)) {
                  props.displayPopup("교과목 중복",
                    "이미 추가된 교과목입니다.");
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