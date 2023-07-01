import "./TimeTable.css"
import '../../AppMobile.css';
import "../../css/AppTable.css"
import { CreationContext, PreviewContext } from "../../App";
import { Lecture, TimeSlot } from '../../util/Lecture';
import { isTimeIntersect } from '../../util/Scenario';
import React, { useContext, useEffect, useState } from "react";
import { LectureInformationTable, MultLectureInformationTable } from "../global/LectureInformationTable";

let times = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
export const colors = [
  "#EC4E46",
  "#EC7946",
  "#ECB546",
  "#53B42C",
  "#0EAA94",
  "#13B5E7",
  "#1987E1",
  "#4656CE",
  "#8A57D5",
  "#BC61D9",
  "#E36DB0"
];

type propType = {
  isMobile: boolean;
  lectures: Lecture[];
  subjHover: boolean;
  mode: string;
  timeSlots: TimeSlot[];
  hoveredTimeSlots: TimeSlot[];

  setShowTooltip: (param: boolean) => void;
  setTooltipContent: (param: React.ReactNode) => void;
  displayPopup: (title: string, content: React.ReactNode) => void;
}

const getTimeSlotStyle = (item: TimeSlot): React.CSSProperties => {
  return {
    left: item.leftPosition,
    top: item.topPosition,
    height: item.height,
    backgroundColor: colors[item.displayOrder % colors.length]
  };
}

const getHoveredTimeSlotStyle = (item: TimeSlot): React.CSSProperties => {
  return {
    left: item.leftPosition,
    top: item.topPosition,
    height: item.height,
    backgroundColor: "rgba(0, 0, 0, 0.2)"
  };
}

const getSubjectLabelStyle = (order: number): React.CSSProperties => {
  return {
    fontWeight: "700",
    backgroundColor: colors[order % colors.length],
    color: "#fff",
    padding: "3px",
    borderRadius: "3px",
    lineHeight: "2.0"
  };
}

const TimeTable = (props: propType) => {
  const data = useContext(CreationContext);
  const [tooltipContents, setTooltipContents] = useState<Map<TimeSlot, React.ReactNode>>(new Map);

  const onClickSlot = (item: TimeSlot) => {
    if (props.isMobile) {
      return;
    }
    if (props.mode === "preview") {
      props.displayPopup(`${item.subjectTitle} [${item.subjectID} (${item.lectureNumber})]`,
        LectureInformationTable(item)
      );
    } else if (props.mode === "create") {
      props.displayPopup(`${item.subjectTitle} [${item.subjectID}]`,
        MultLectureInformationTable(data.relatedLectures.filter(lect => lect.subjectID === item.subjectID))
      );
    }
  };

  const getTooltipContent = (item: TimeSlot): React.ReactNode => {
    if (props.isMobile) {
      return <></>;
    }
    if (props.mode === "preview") {
      let intersectFlag: boolean = false;
      let content = item.subjectTitle;
      for (let i = 0; i < props.timeSlots.length; i++) {
        if (item.id === props.timeSlots[i].id) {
          continue;
        }
        if (item.date === props.timeSlots[i].date) {
          if (isTimeIntersect(
            item.startTime, item.endTime, props.timeSlots[i].startTime, props.timeSlots[i].endTime)) {
              content += ("\n" + props.timeSlots[i].subjectTitle);
              intersectFlag = true;
          }
        }
      }
      return (
        <div>
          {content + "\n"}
          {!intersectFlag && <span style={{ fontWeight: "400" }}>{item.slotRoom}</span>}
          {intersectFlag && (
            <span style={{ color: "darkred", fontWeight: "800" }}>{"\n"}강좌의 시간이 겹칩니다!</span>
          )}
        </div>
      );
    } else if (props.mode === "create") {
      let prof_rooms = [];
      if (data.scenarios.length > 0) {
        for (const l of 
          data.relatedLectures.filter(lect => lect.subjectID === item.subjectID)) {
            prof_rooms.push({ prof : l.lecturer, room : l.lectureRoom, lect_no: l.lectureNumber });
        }
      }
      return (
        <div>
          <span style={getSubjectLabelStyle(item.displayOrder)}>{item.subjectTitle + "\n"}</span>
          { prof_rooms.map( pr =>
              <>
                <span style={{fontWeight: "600"}}>{pr.prof.length > 0 ? pr.prof : "교수 미정"}
                {` (${pr.lect_no})`}</span>
                <span style={{fontWeight: "400"}}>{" " + pr.room.split("/")[item.slotOrder] + "\n"}</span>
              </>
          ) }
        </div>
      );
    }
  }

  const onMouseOverSlot = (item: TimeSlot) => {
    if (props.isMobile) {
      props.setShowTooltip(false);
    } else {
      props.setTooltipContent(tooltipContents.get(item));
      props.setShowTooltip(true);
    }
  }

  useEffect(() => {
    let newMap: Map<TimeSlot, React.ReactNode> = new Map;
    for (const ts of props.timeSlots) {
      newMap.set(ts, getTooltipContent(ts));
    }
    setTooltipContents(newMap);
  }, [props.timeSlots]);

  return (
    <PreviewContext.Consumer>
      { () => {
        return (
          <div className='appTable__container'>
            <div className="timetable-host-box">
            <table className='timetable-table'>
              <tbody>
                { times.map(time => 
                    <tr key={time} className='timetable-row'>
                      <td key={"time"} className='timetable-timeslot'>{time}</td>
                      <td key={"mon"} className='timetable-item'></td>
                      <td key={"tue"} className='timetable-item'></td>
                      <td key={"wed"} className='timetable-item'></td>
                      <td key={"thu"} className='timetable-item'></td>
                      <td key={"fri"} className='timetable-item'></td>
                    </tr>
                ) }
              </tbody>         
            </table>
              { props.timeSlots.filter(ts => ts.date in [0, 1, 2, 3, 4]).map(item => 
                <div className='timetable-subject'
                  onMouseOver={() => onMouseOverSlot(item)}
                  onMouseOut={() => props.setShowTooltip(false)}
                  onMouseEnter={() => props.setShowTooltip(!data.isMobile && true)}
                  onClick={() => onClickSlot(item)}
                  style={getTimeSlotStyle(item)}>
                    <span><strong>{item.subjectTitle}</strong>{"\n"}{item.slotRoom}</span>
                </div>
              ) }

              { props.subjHover && (
                props.hoveredTimeSlots.filter(ts => ts.date in [0, 1, 2, 3, 4]).map(item => 
                  <div className='timetable-subject'
                    style={getHoveredTimeSlotStyle(item)}>
                    <span><strong>{item.subjectTitle}</strong>{"\n"}{item.slotRoom}</span>
                  </div>
                )) }
            </div>
          </div>
        )
      }
      }
    </PreviewContext.Consumer>
  )
}

export default TimeTable