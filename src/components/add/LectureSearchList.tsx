import lectureData from "../../db/data.json";
import { useEffect, useRef, useContext } from 'react'
import '../../css/AppTable.css';
import '../../App.css';
import '../../AppMobile.css';
import LectureBox from "../global/LectureBox";
import { CreationContext } from "../../App";
import { lecture } from "../../interfaces/Lecture";

const lectureDatabase = (lectureData as { subjects: lecture[] }).subjects;

type propType = {
  selectedLectures: lecture[];
  setSelectedLectures: (param: lecture[]) => void;
  updateCount: number;
  setUpdateCount: (param: number) => void;
}

function LectureSearchList(props: propType) {

  let shownLectures: lecture[] = [];

  const data = useContext(CreationContext);
  const prevPropsRef = useRef(data);

  useEffect(() => {
    const prevProps = prevPropsRef.current;
    if (prevProps.clickedSubject !== data.clickedSubject) {
      props.setSelectedLectures([]);
      shownLectures = [];
    }
    prevPropsRef.current = data;
  });

  return (
    <div className="appTable__container" style={{ whiteSpace: "pre-wrap" }}>
      <h2 className="mid_title"><span style={{ marginRight: "5%" }}>찾은 강좌</span>
        <label className='label-1' style={{ fontWeight: "normal", marginRight: "2%" }}>수강반</label>
        <input className="input-1" type="text" style={{width: "20%", height: "80%"}} value={data.addedSubjKeyWord} onChange={data.handleAddKeywordChange}></input>
      </h2>
      <div className="appTable__scrollContainer" style = {{ bottom: "100px" }}>
        {lectureDatabase
        .map(subject => {
          let isRelatedKeyWord = (data.addedSubjKeyWord === "") || subject.extra_info.replace(' ', '').includes(data.addedSubjKeyWord);
          if ((data.clickedSubject === subject.subj_id) && isRelatedKeyWord) {
            shownLectures.push(subject);
          }
          return (data.clickedSubject === subject.subj_id) && isRelatedKeyWord ? (
            <LectureBox boxType={"add"} subject={subject}
            displayPopup={data.displayPopup}
            addLectureToList={
              (lect: lecture) => {
                props.setSelectedLectures(props.selectedLectures.concat(lect));
              }
            }
            removeLectureFromList={
              (lect: lecture) => {
                props.setSelectedLectures(props.selectedLectures.filter(l => l !== lect));
              }
            }
            setHoveredSubj={data.setHoveredSubj}
            setSubjHover={data.setSubjHover}
            isExistingSubj={data.isExistingSubj}
            selectedLectures={props.selectedLectures}
            lectureGroups={data.lectureGroups}
            includesLecture={data.includesLecture}            
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
                checked={(props.selectedLectures.length === shownLectures.length) && shownLectures.length > 0}
                onChange={
                  (event) => {
                    if (!event.target.checked) {
                      props.setSelectedLectures([]);
                    } else {
                      props.setSelectedLectures(shownLectures);
                    }
                  }
                }
                />
              </td>
              <td style={{width: "80%", whiteSpace: "pre-wrap", paddingLeft: "20px"}}>
                <button className="button-0 button-0-larger"
                  style={{ width: "100%", height: "100%" }}
                  disabled={props.selectedLectures.filter(item => !data.includesLecture(item)).length === 0}
                  onClick={() => {
                    for (let i = 0; i < props.selectedLectures.length; i++) {
                      data.addLectureToGroup(props.selectedLectures[i]);
                      props.setSelectedLectures([]);
                    }
                  }}>
                  {
                    (props.selectedLectures.filter(item => !data.includesLecture(item)).length !== 0) ?
                    (
                      <span>선택한 강좌 <strong>{props.selectedLectures.filter(item => !data.includesLecture(item)).length}개</strong> 모두 담기</span>
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

export default LectureSearchList;