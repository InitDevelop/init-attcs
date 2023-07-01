import { useContext, useEffect, useState } from 'react';
import '../../App.css';
import '../../AppMobile.css';
import LectureBox from '../global/LectureBox';
import { PreviewContext } from "../../App";
import { Lecture, getAllTimeSlots, toTimeSlots } from '../../util/Lecture';
import { isTimeIntersect } from '../../util/Scenario';

function SubjectSelectList() {
  const data = useContext(PreviewContext);
  const [isIntersect, setIsIntersect] = useState<Map<Lecture, boolean>>(new Map);

  const getCreditSum = () => {
    let sum = 0;
    for (let i = 0; i < data.selSubj.length; i++) {
      sum += parseInt(data.selSubj[i].credit);
    }
    return sum;
  }

  useEffect(() => {
    let newMap: Map<Lecture, boolean> = new Map;
    for (const lect of data.selSubj) {
      let intersectFlag: boolean = false;
      const timeSlots = getAllTimeSlots(data.selSubj.filter(l => l.id !== lect.id));
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
    setIsIntersect(newMap);
  }, [data.selSubj]);

  return (
    <div className={ data.isMobile ? "appTable__container-smaller" : "appTable__container" }>
      { !data.isMobile &&
      <h2 className='large-title' style={{ width: "100%" }}>
        담은 강좌
        <span style={{ marginLeft: "10px", padding: "5px", fontSize: "large" }} className='credit'>
          총 {getCreditSum()}학점
        </span>
      </h2>
      }
      <div className={!data.isMobile ?
        "appTable__scrollContainer" : "appTable__scrollContainer-no-title"}>
        {data.selSubj.map(
          (lecture: Lecture) => {
            return (
              <LectureBox
                key={lecture.subjectID + " (" + lecture.lectureNumber + ")"}
                boxType={"list"} subject={lecture}
                displayPopup={data.displayPopup}
                addLectureToList={data.addSubject}
                removeLectureFromList={data.popSubject}
                setHoveredSubj={data.setHoveredSubj}
                setSubjHover={data.setSubjHover}
                isExistingSubj={data.isExistingSubj}
                selectedLectures={[]}
                lectureGroups={[]}
                includesLecture={function (param: Lecture): boolean {
                  throw new Error('Function not implemented.');
                } }
                isMobile={data.isMobile}
                selSubj={data.selSubj}
                intersects={isIntersect.get(lecture)}
                isNotKorean={lecture.language !== "한국어"}
                hasRestriction={lecture.extraInfo.includes("®")}
                />
            )
          }
        )}
      </div>
      </div>
    )
}

export default SubjectSelectList;