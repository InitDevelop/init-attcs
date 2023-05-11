import "./TimeTable.css"
import '../../AppMobile.css';
import "../../css/AppTable.css"
import { PreviewContext } from "../../App";
import { lecture, timeSlot } from '../../interfaces/Lecture';
import { getDateValue, isTimeIntersect } from '../../interfaces/Scenario';
import React from "react";

let times = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
export const colors = ["#de6b54", "#de8954", "#deb954", "#6aad51", "#51ad8d", "#519ead", "#4f6cc2", "#6d598f", "#8f5987"];
//const colors = ["#FE8484", "#FEA784", "#FEDB84", "#8DDB8B", "#7FCADF", "#7FA4DF", "#8686D8", "#B98BD3", "#E399CA"];

type propType = {
  isMobile: boolean;
  lectures: lecture[];
  subjHover: boolean;

  timeSlots: timeSlot[];
  hoveredTimeSlots: timeSlot[];

  setShowTooltip: (param: boolean) => void;
  setTooltipContent: (param: React.ReactNode) => void;
  displayPopup: (title: string, content: React.ReactNode) => void;
}

function TimeTable(props: propType) {
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

            
              {props.timeSlots.map(
                item => {
                  return (
                    <div className='timetable-subject'
                      onMouseOver={ () => {
                        let intersectFlag: boolean = false;
                        props.setShowTooltip(true);
                        let content = item.subjName;
                        for (let i = 0; i < props.timeSlots.length; i++) {
                          if (item.id === props.timeSlots[i].id) {
                            continue;
                          }
                          if (item.date === props.timeSlots[i].date) {
                            if (isTimeIntersect(item.startTime, item.endTime, props.timeSlots[i].startTime, props.timeSlots[i].endTime)) {
                                content += ("\n" + props.timeSlots[i].subjName);
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
                props.hoveredTimeSlots.map(
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