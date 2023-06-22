import React from 'react'
import './LectureBox.css'
import '../../App.css'
import '../../AppMobile.css';
import { lecture, lectureGroup } from '../../interfaces/Lecture';
import { LectureInformationTable } from './LectureInformationTable';

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

          <td style={{ width: "80%", whiteSpace: "pre-wrap", cursor: "pointer" }}
            onClick={() => { if (props.boxType !== "remove") {
              props.displayPopup(`${props.subject.subj_name} [${props.subject.subj_id} (${props.subject.lect_no})]`,
                LectureInformationTable(props.subject)
              ); }
            }}
          >
            <table className='lecturebox-table-in-table'>
              <tbody>
                <tr>
                  <td>
                    <span className='medium-title-hoverable'>
                      {props.subject.subj_name + "  "}
                    </span>
                    { (props.subject.extra_info.includes("®")) && !props.isMobile && (
                      <span className='tiny-notice' style={{marginLeft: "5px"}}>
                        <p style={{fontSize: "medium", fontWeight: 700}}>수강반 제한</p>
                      </span>
                    )}
                    { (props.subject.lang !== "한국어") && !props.isMobile && (
                      <span className='tiny-notice-2' style={{marginLeft: "5px"}}>
                        <p style={{fontSize: "medium", fontWeight: 700}}>외국어</p>
                      </span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className='credit'>{props.subject.credit + "학점"}</span>{"  "}
                    { !props.isMobile &&
                      <span>{"  " + props.subject.prof}{"  " + props.subject.subj_id} ({props.subject.lect_no})</span>
                    }
                    { (props.subject.extra_info.includes("®")) && props.isMobile && (
                      <button className='tiny-notice'>
                        <p style={{fontSize: "medium", fontWeight: 700}}>수강반 제한</p>
                      </button>
                    )}
                    { (props.subject.lang !== "한국어") && props.isMobile && (
                      <button className='tiny-notice-2' style={{marginLeft: "5px"}}>
                        <p style={{fontSize: "medium", fontWeight: 700}}>외국어</p>
                      </button>
                    )}
                  </td>
                </tr>
                { props.isMobile &&
                  <tr>
                    <td>
                      <span>{props.subject.prof}{"  " + props.subject.subj_id} ({props.subject.lect_no})</span>
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