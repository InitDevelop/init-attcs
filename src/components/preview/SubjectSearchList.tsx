import { useContext, useEffect, useState } from 'react'
import '../../css/AppTable.css';
import '../../App.css';
import '../../AppMobile.css';
import LectureBox from "../global/LectureBox";
import { PreviewContext } from "../../App";
import { Lecture, getAllTimeSlots, toTimeSlots } from "../../util/Lecture";
import { isTimeIntersect } from '../../util/Scenario';

function SubjectSearchList() {
  const data = useContext(PreviewContext);
  const [intersects, setIntersects] = useState<Map<Lecture, boolean>>(new Map);

  useEffect(() => {
    let newMap: Map<Lecture, boolean> = new Map;
    const timeSlots = getAllTimeSlots(data.selSubj);
    for (const lect of data.shownLectures) {
      let intersectFlag: boolean = false;
      loop:
      for (const ts of timeSlots) {
        for (const tsLect of toTimeSlots(lect, 0)) {
          if (ts.date !== tsLect.date) continue;
          if (isTimeIntersect(ts.startTime, ts.endTime, tsLect.startTime, tsLect.endTime)) {
            intersectFlag = true;
            break loop;
          }
        }
      }
      newMap.set(lect, intersectFlag);
    }
    setIntersects(newMap);
  }, [data.selSubj, data.shownLectures]);

  return (
    <div className={ data.isMobile ? "appTable__container-smaller" : "appTable__container" }
          style={{ whiteSpace: "pre-wrap" }}>
      { !data.isMobile &&
        <p className="large-title">찾은 강좌</p>
      }
      <div className={!data.isMobile ?
        "appTable__scrollContainer" : "appTable__scrollContainer-no-title"}>
        {
          data.shownLectures.length > 0 && data.isMobile &&
          <div className="prioritybox"><p style={{ fontWeight: "700", fontSize: "medium", color: "#1987E1" }}>
          강좌명을 클릭하면 상세정보를 볼 수 있습니다.</p></div>
        }
        { (data.shownLectures.length <= 500) ?
          data.shownLectures.map(
            (lecture: Lecture) => {
              return (
                <LectureBox 
                  key={lecture.subjectID + " (" + lecture.lectureNumber + ")"}
                  boxType={"search"} subject={lecture}
                  displayPopup={data.displayPopup}
                  addLectureToList={data.addSubject}
                  removeLectureFromList={data.popSubject}
                  setHoveredSubj={data.setHoveredSubj}
                  setSubjHover={data.setSubjHover}
                  isExistingSubj={data.isExistingSubj}
                  selectedLectures={[]}
                  lectureGroups={[]}
                  includesLecture={function (param: Lecture): boolean {
                    throw new Error("Function not implemented.");
                  } }
                  isMobile={data.isMobile}
                  selSubj={data.selSubj}

                  isNotKorean={lecture.language !== "한국어"}
                  hasRestriction={lecture.extraInfo.includes("®")}
                  intersects={intersects.get(lecture)}
                  />
              )
            }
          )
          :
          <>
            <br/>
            <p className='medium-title'>검색 결과가 500개가 넘습니다.</p>
            <p className='medium-title'>더 구체적으로 검색해주세요!</p>
          </>
        }
      </div>


    </div>
    )
}

export default SubjectSearchList;