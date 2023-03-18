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
    }
    prevPropsRef.current = props;
  });

  const [selectedLectures, setSelectedLectures] = useState([]);

  return (
    <div className="appTable__container" style={{ whiteSpace: "pre-wrap" }}>
      <h2 className="mid_title"><span style={{ marginRight: "5%" }}>찾은 강좌</span>
        <label className='label-1' style={{ fontWeight: "normal", marginRight: "2%" }}>수강반</label>
        <input className="input-1" type="text" style={{width: "20%", height: "80%"}} value={props.keyWord} onChange={props.handleKeywordChange}></input>
      </h2>
      <div className="appTable__scrollContainer">
        {subjects.subjects
        .map(subject => {
          let isRelatedKeyWord = (props.keyWord === "") || subject.extra_info.replace(' ', '').includes(props.keyWord);
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


            displayPopup    = {props.displayPopup}
          />
          ) : ""
        }
        )}
      </div>
    </div>
  )
}

export default LectureSearchList