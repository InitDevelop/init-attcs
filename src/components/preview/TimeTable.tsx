import "./TimeTable.css"
import '../../AppMobile.css';
import "../../css/AppTable.css"
import { PreviewContext } from "../../App";
import { lecture, timeSlot } from '../../interfaces/Lecture';
import { getDateValue, isTimeIntersect } from '../../interfaces/Scenario';
import React from "react";

let times = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
const colors = ["#de6b54", "#de8954", "#deb954", "#6aad51", "#51ad8d", "#519ead", "#4f6cc2", "#6d598f", "#8f5987"];
//const colors = ["#FE8484", "#FEA784", "#FEDB84", "#8DDB8B", "#7FCADF", "#7FA4DF", "#8686D8", "#B98BD3", "#E399CA"];

type propType = {
  isMobile: boolean;
  lectures: lecture[];
  subjHover: boolean;
  hoveredSubj: lecture;
  setShowTooltip: (param: boolean) => void;
  setTooltipContent: (param: React.ReactNode) => void;
  displayPopup: (title: string, content: React.ReactNode) => void;
}

function TimeTable(props: propType) {
  //const data = useContext(PreviewContext);

  let timeSlots: timeSlot[] = [];
  let hoveredTimeSlots: timeSlot[] = [];

  for (let j = 0; j < props.lectures.length; j++) {
    let times = props.lectures[j].time.split("/");
    let count = times.length;
    let rooms = props.lectures[j].lect_room.split("/")

    for (let i = 0; i < count; i++) {
      let date = 0;
      let startHour = parseInt(times[i].substring(2, 4));
      let startMin = parseInt(times[i].substring(5, 7));
      let endHour = parseInt(times[i].substring(8, 10));
      let endMin = parseInt(times[i].substring(11, 13));

      date = getDateValue(times[i].substring(0, 1));

      let topPos = `calc((100%)*${((startHour - 9) + startMin / 60)}/13)`;
      let height = `calc((100%)*${((endHour - startHour) + (endMin - startMin) / 60)}/13)`;
      let leftPos = `${7.5 + date * 18.5}%`;

      timeSlots.push({
        startTime: startHour * 100 + startMin,
        endTime: endHour * 100 + endMin,
        date: date,
        id: j,
        subjName: props.lectures[j].subj_name,
        leftPos: leftPos,
        topPos: topPos,
        height: height,
        room: rooms[i],
        lectures: [props.lectures[j]]
      });
    }
  }

  if (props.subjHover) {
    let hoverTimes = props.hoveredSubj.time.split("/");
    let hoverCount = hoverTimes.length;
    let rooms = props.hoveredSubj.lect_room.split("/")

    for (let k = 0; k < hoverCount; k++) {
      let date = 0;
      let startHour = parseInt(hoverTimes[k].substring(2, 4));
      let startMin = parseInt(hoverTimes[k].substring(5, 7));
      let endHour = parseInt(hoverTimes[k].substring(8, 10));
      let endMin = parseInt(hoverTimes[k].substring(11, 13));

      date = getDateValue(hoverTimes[k].substring(0, 1));

      let topPos = `calc((100%)*${((startHour - 9) + startMin / 60)}/13)`;
      let height = `calc((100%)*${((endHour - startHour) + (endMin - startMin) / 60)}/13)`;
      let leftPos = `${7.5 + date * 18.5}%`;

      hoveredTimeSlots.push({
        startTime: startHour * 100 + startMin,
        endTime: endHour * 100 + endMin,
        date: date,
        subjName: props.hoveredSubj.subj_name,
        leftPos: leftPos,
        topPos: topPos,
        height: height,
        id: 0,
        room: rooms[k],
        lectures: [props.hoveredSubj]
      });
    }
  }

  return (
    <PreviewContext.Consumer>
      { () => {
        return (
          <div className='appTable__container'>
            <div className="timetable-host-box">
            <table className='timetable-table'>
              <tbody>
                {times.map(
                  time => {
                    return (
                      <tr className='timetable-row'>
                        <td className='timetable-timeslot'>{time}</td>
                        <td className='timetable-item'></td>
                        <td className='timetable-item'></td>
                        <td className='timetable-item'></td>
                        <td className='timetable-item'></td>
                        <td className='timetable-item'></td>
                      </tr>
                    )
                  }
                )}
              </tbody>         
            </table>

            
              {timeSlots.map(
                item => {
                  return (
                    <div className='timetable-subject'
                      onMouseOver={ () => {
                        let intersectFlag: boolean = false;
                        props.setShowTooltip(true);
                        let content = item.subjName;
                        for (let i = 0; i < timeSlots.length; i++) {
                          if (item.id === timeSlots[i].id) {
                            continue;
                          }
                          if (item.date === timeSlots[i].date) {
                            if (isTimeIntersect(item.startTime, item.endTime, timeSlots[i].startTime, timeSlots[i].endTime)) {
                                content += ("\n" + timeSlots[i].subjName);
                                intersectFlag = true;
                            }
                          }
                        }
                        props.setTooltipContent(
                        <div>
                          {content}
                          {"\n"}
                          <span style={{fontWeight: "400"}}>{item.room}</span>
                          {intersectFlag && (
                            <span style={{color: "darkred", fontWeight: "800"}}>{"\n"}강좌의 시간이 겹칩니다!</span>
                          )}
                        </div>
                        );
                      }}
                      onMouseOut={ () => {
                        props.setShowTooltip(false);
                      }}
                      onClick={ () => {/*
                        props.displayPopup("강좌 상세 정보",
                          MultLectureInformationTable(item.lectures)
                        );*/
                      }}
                      style={
                        {
                          left: item.leftPos,
                          top: item.topPos,
                          height: item.height,
                          backgroundColor: colors[item.id % colors.length]
                        }
                      }
                    >
                      <span><strong>{item.subjName}</strong>{"\n"}{item.room}</span>
                    </div>
                  )
                }
              )}

              {props.subjHover && (
                hoveredTimeSlots.map(
                  item => {
                    return (
                      <div className='timetable-subject'
                      style={
                        {
                          left: item.leftPos,
                          top: item.topPos,
                          height: item.height,
                          backgroundColor: !props.isMobile ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0.9)"
                        }
                      }>
                      <span><strong>{item.subjName}</strong>{"\n"}{item.room}</span>
                      </div>
                    )
                  }
                )
              )}
            </div>


          </div>
        )
      }
      }
    </PreviewContext.Consumer>
  )
}

export default TimeTable