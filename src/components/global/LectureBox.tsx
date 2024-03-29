import React from 'react'
import './LectureBox.css'
import '../../App.css'
import '../../AppMobile.css';
import { Lecture, LectureGroup } from '../../util/Lecture';
import { LectureInformationTable } from './LectureInformationTable';

type propType = {
  boxType: string;
  // "search" and "list" is for the preview page
  // "add" is for the add page

  // Common properties
  selSubj: Lecture[];
  subject: Lecture;
  displayPopup: (title: string, content: React.ReactNode) => void;

  addLectureToList: (param: Lecture) => void;
  removeLectureFromList: (param: Lecture) => void;

  intersects: boolean | undefined;
  isNotKorean: boolean;
  hasRestriction: boolean;

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

          {/* main Lecture box body */}

          <td style={{ width: "80%", whiteSpace: "pre-wrap", cursor: "pointer" }}
            onClick={() => {
              if (!props.isMobile) {
                props.displayPopup(`${props.subject.subjectTitle} [${props.subject.subjectID} (${props.subject.lectureNumber})]`,
                  LectureInformationTable(props.subject)
                );
              }
            }}
          >
            <table className='lecturebox-table-in-table'>
              <tbody>
                <tr>
                  <td>
                    <span className='medium-title-hoverable'
                      onClick={() => {
                        if (props.isMobile) {
                          props.displayPopup(`${props.subject.subjectTitle} [${props.subject.subjectID} (${props.subject.lectureNumber})]`,
                            LectureInformationTable(props.subject)
                          );
                        }
                      }}>
                      {props.subject.subjectTitle + "  "}
                    </span>
                    {
                      !props.isMobile && props.selSubj.includes(props.subject) &&
                      <span className='tiny-notice-4' style={{marginLeft: "5px"}}>
                        <p style={{fontSize: "medium" }}>담은 강좌</p>
                      </span>
                    }
                    {
                      props.intersects && !props.isMobile &&
                      <span className='tiny-notice-3' style={{marginLeft: "5px"}}>
                        <p style={{fontSize: "medium" }}>시간 겹침</p>
                      </span>
                    }
                    {
                      props.hasRestriction && !props.isMobile &&
                      <span className='tiny-notice' style={{marginLeft: "5px"}}>
                        <p style={{fontSize: "medium" }}>수강반 제한</p>
                      </span>
                    }
                    {
                      props.isNotKorean && !props.isMobile &&
                      <span className='tiny-notice-2' style={{marginLeft: "5px"}}>
                      <p style={{fontSize: "medium" }}>외국어</p>
                      </span>
                    }
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className='credit'>{props.subject.credit + "학점"}</span>{"  "}
                    { !props.isMobile &&
                      <span>{"  " + props.subject.lecturer}{"  " + props.subject.subjectID} ({props.subject.lectureNumber})</span>
                    }
                    {
                      props.isMobile && props.selSubj.includes(props.subject) &&
                      <span className='tiny-notice-4' style={{marginLeft: "5px"}}>
                        <p style={{fontSize: "medium" }}>담은 강좌</p>
                      </span>
                    }
                    {
                      props.isMobile && props.intersects &&
                      <span className='tiny-notice-3' style={{marginLeft: "5px"}}>
                        <p style={{fontSize: "medium" }}>시간 겹침</p>
                      </span>
                    }
                    {
                      props.hasRestriction && props.isMobile &&
                      <span className='tiny-notice' style={{marginLeft: "5px"}}>
                        <p style={{fontSize: "medium" }}>수강반 제한</p>
                      </span>
                    }
                    {
                      props.isNotKorean && props.isMobile &&
                      <span className='tiny-notice-2' style={{marginLeft: "5px"}}>
                      <p style={{fontSize: "medium" }}>외국어</p>
                      </span>
                    }
                  </td>
                </tr>
                { props.isMobile &&
                  <tr>
                    <td>
                      <span>{props.subject.lecturer}{"  " + props.subject.subjectID} ({props.subject.lectureNumber})</span>
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