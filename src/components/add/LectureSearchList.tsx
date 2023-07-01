import { useEffect, useRef, useContext } from 'react'
import '../../css/AppTable.css';
import '../../App.css';
import '../../AppMobile.css';
import LectureBox from "../global/LectureBox";
import { CreationContext } from "../../App";
import { Lecture } from "../../util/Lecture";

type propType = {
  selectedLectures: Lecture[];
  setSelectedLectures: (param: Lecture[]) => void;
  updateCount: number;
  setUpdateCount: (param: number) => void;
  selectedDates: number[];
  setSelectedDates: (param: number[]) => void;
  selectedOption: string;
  setSelectedOption: (param: string) => void;
}

function LectureSearchList(props: propType) {

  const data = useContext(CreationContext);
  const prevPropsRef = useRef(data);

  useEffect(() => {
    const prevProps = prevPropsRef.current;
    if (prevProps.clickedSubject !== data.clickedSubject) {
      props.setSelectedLectures([]);
      props.setSelectedOption("");
    }
    prevPropsRef.current = data;
  });

  return (
    <div className="appTable__container" style={{ whiteSpace: "pre-wrap" }}>
      {
        !data.isMobile &&
        <span className="large-title">찾은 강좌</span>
      }
      <div className={!data.isMobile ? 
        "appTable__scrollContainer" : "appTable__scrollContainer-no-title"}
        style = {{ bottom: "100px" }}>
        {data.matchingLectures.map(lecture => 
          <LectureBox
            key={lecture.subjectID + " (" + lecture.lectureNumber + ")"}
            boxType={"add"} subject={lecture}
            displayPopup={data.displayPopup}
            addLectureToList={
              (lect: Lecture) => {
                props.setSelectedLectures(props.selectedLectures.concat(lect));
              }
            }
            removeLectureFromList={
              (lect: Lecture) => {
                props.setSelectedLectures(props.selectedLectures.filter(l => l !== lect));
              }
            }
            setHoveredSubj={data.setHoveredSubj}
            setSubjHover={data.setSubjHover}
            isExistingSubj={data.isExistingSubj}
            selectedLectures={props.selectedLectures}
            lectureGroups={data.lectureGroups}
            includesLecture={data.includesLecture}    
            isMobile={data.isMobile} 
            selSubj={[]}
            isNotKorean={lecture.language !== "한국어"}
            hasRestriction={lecture.extraInfo.includes("®")}
            intersects={false}
            />
          )
        }
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
              <td style={{ paddingLeft: data.isMobile ? "0" : "10px" }}>
                <input style={{ cursor: "pointer", verticalAlign: "middle" }}
                className='checkbox-1'
                type="checkbox"
                checked={(props.selectedLectures.length === data.matchingLectures.length) && data.matchingLectures.length > 0}
                onChange={
                  (event) => {
                    if (!event.target.checked) {
                      props.setSelectedLectures([]);
                    } else {
                      props.setSelectedLectures(data.matchingLectures);
                    }
                  }
                }
                />
              </td>
              <td style={{ width: "80%", whiteSpace: "pre-wrap", paddingLeft: "20px" }}>
                <button className="button-0"
                  style={{ width: "100%", height: "100%", fontSize: data.isMobile ? "120%" : "100%" }}
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