import subjects from "../../db/data.json";
import React, { useState, useEffect, useRef } from 'react'
import '../../css/AppTable.css';
import '../../App.css';
import LectureBox from "../../components/LectureBox";

function LectureSearchList(props) {

  const prevPropsRef = useRef(props);

  useEffect(() => {
    const prevProps = prevPropsRef.current;
    if (prevProps.subj_id !== props.subj_id) {
      setSelectedLectures([]);
      shownLectures = [];
    }
    prevPropsRef.current = props;
  });

  const [selectedLectures, setSelectedLectures] = useState([]);
  let shownLectures = [];

  return (
    <div className="appTable__container" style={{ whiteSpace: "pre-wrap" }}>
      <h2 className="mid_title"><span style={{ marginRight: "5%" }}>찾은 강좌</span>
        <label className='label-1' style={{ fontWeight: "normal", marginRight: "2%" }}>수강반</label>
        <input className="input-1" type="text" style={{width: "20%", height: "80%"}} value={props.keyWord} onChange={props.handleKeywordChange}></input>
      </h2>
      <div className="appTable__scrollContainer" style = {{ bottom: "100px" }}>
        {subjects.subjects
        .map(subject => {
          let isRelatedKeyWord = (props.keyWord === "") || subject.extra_info.replace(' ', '').includes(props.keyWord);
          if ((props.subj_id === subject.subj_id) && isRelatedKeyWord) {
            shownLectures.push(subject);
          }
          return (props.subj_id === subject.subj_id) && isRelatedKeyWord ? (
            <LectureBox
              boxType         = "add"

              addSubject      = {props.addSubject}
              popSubject      = {props.popSubject}

              setSubjHover    = {props.setSubjHover}
              setHoveredSubj  = {props.setHoveredSubj}
              
              subject         = {subject}
              isExistingSubj  = {props.isExistingSubj}

              setClickedSubject = {props.setClickedSubject}

              selectedLectures = {selectedLectures}
              selectLecture = {
                (lecture) => {
                  setSelectedLectures(selectedLectures.concat(lecture));
                }
              }
              deselectLecture = {
                (lecture) => {
                  setSelectedLectures(
                    selectedLectures.filter(
                      (other) => (lecture.lect_no !== other.lect_no)
                    )
                  );
                }
              }
              addedLectures = {props.addedLectures}
              displayPopup    = {props.displayPopup}
            />
          ) : ""
        }
        )}
      </div>
      <div style={
        {
          position: "absolute",
          right: "20px",
          left: "20px",
          bottom: "20px",
          height: "60px",
          marginTop: "10px"
        }
        }>
        <table style={
          {
            width: "100%",
            height: "100%"
          }
        }>
          <tbody>
            <tr>
              <td style={{ paddingLeft: "10px" }}>
                <input style={{ cursor: "pointer", verticalAlign: "middle" }}
                className='checkbox-1'
                type="checkbox"
                checked={(selectedLectures.length === shownLectures.length) && shownLectures.length > 0}
                onChange={
                  (event) => {
                    if (!event.target.checked) {
                      setSelectedLectures([]);
                    } else {
                      setSelectedLectures(shownLectures);
                    }
                  }
                }
                />
              </td>
              <td style={{width: "80%", whiteSpace: "pre-wrap", paddingLeft: "20px"}}>
                <button className="button-0"
                  style={{ width: "100%", fontSize: "130%" }}
                  disabled={(selectedLectures.length === 0)}
                  onClick={() => {
                      if (selectedLectures.length > 0) {
                        props.setAddedLectures(props.addedLectures.concat(
                          selectedLectures.filter(
                            (lecture) => {return !props.addedLectures.includes(lecture)}
                          )
                          ));
                      }
                      if (!props.addedSubjectIDs.includes(props.subj_id)) {
                        props.setAddedSubjectIDs(props.addedSubjectIDs.concat(props.subj_id));
                      }
                    }
                  }>
                  {
                    selectedLectures.length !== 0 ?
                    (
                      <span>선택한 강좌 <strong>{selectedLectures.length}개</strong> 모두 담기</span>
                    ) : (<strong>담을 과목을 선택하세요</strong>)
                  }
                </button> 
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default LectureSearchList