import "./TimeTable.css"
import '../../AppMobile.css';
import "../../css/AppTable.css"
import { CreationContext, PreviewContext } from "../../App";
import { lecture, timeSlot } from '../../interfaces/Lecture';
import { isTimeIntersect } from '../../interfaces/Scenario';
import React, { useContext } from "react";
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
  lectures: lecture[];
  subjHover: boolean;

  mode: string;

  timeSlots: timeSlot[];
  hoveredTimeSlots: timeSlot[];

  setShowTooltip: (param: boolean) => void;
  setTooltipContent: (param: React.ReactNode) => void;
  displayPopup: (title: string, content: React.ReactNode) => void;
}

function TimeTable(props: propType) {

  const dataPreview = useContext(PreviewContext);
  const dataCreate = useContext(CreationContext);

  return (
    <PreviewContext.Consumer>
      { () => {
        return (
          <div className='appTable__container'
          style = { {
            transform: props.isMobile ? (
              props.subjHover ? `translateY(-${(Math.floor(props.hoveredTimeSlots[0].startTime / 100) - 9) * 100 / 13}%)` : "none"
              ) : "none",
            backgroundColor: props.subjHover ? "white" : "none"
          } }

          >
            <div className="timetable-host-box">
            <table className='timetable-table'>
              <tbody>
                {times.map(
                  time => 
                    <tr key={time} className='timetable-row'>
                      <td key={"time"} className='timetable-timeslot'>{time}</td>
                      <td key={"mon"} className='timetable-item'></td>
                      <td key={"tue"} className='timetable-item'></td>
                      <td key={"wed"} className='timetable-item'></td>
                      <td key={"thu"} className='timetable-item'></td>
                      <td key={"fri"} className='timetable-item'></td>
                    </tr>
                  )
                }
              </tbody>         
            </table>
              {props.timeSlots.map(
                item => {
                  return (
                    <div className='timetable-subject'
                      onMouseOver={ () => {
                        if (props.isMobile) {
                          return;
                        }
                        if (props.mode === "preview") {
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
                            {content + "\n"}
                            {!intersectFlag && <span style={{fontWeight: "400"}}>{item.room}</span>}
                            {intersectFlag && (
                              <span style={{color: "darkred", fontWeight: "800"}}>{"\n"}강좌의 시간이 겹칩니다!</span>
                            )}
                          </div>
                          );
                        } else if (props.mode === "create") {
                          let prof_rooms = [];
                          if (dataCreate.scenarios.length > 0) {
                            for (const l of 
                              dataCreate.relatedLectures.filter(lect => lect.subj_id === item.lecture.subj_id)) {
                                prof_rooms.push({ prof : l.prof, room : l.lect_room, lect_no: l.lect_no });
                            }
                          }
                          props.setTooltipContent(
                            <div>
                              <span style={
                                {
                                  fontWeight: "700",
                                  backgroundColor: colors[item.id % colors.length],
                                  color: "#fff",
                                  padding: "3px",
                                  borderRadius: "3px",
                                  lineHeight: "2.0"
                                }
                                }>{item.subjName + "\n"}</span>
                              {
                                prof_rooms.map(
                                  pr =>
                                  <>
                                    <span style={{fontWeight: "600"}}>{pr.prof.length > 0 ? pr.prof : "교수 미정"}
                                    {` (${pr.lect_no})`}</span>
                                    <span style={{fontWeight: "400"}}>{" " + pr.room.split("/")[item.index] + "\n"}</span>
                                  </>
                                )
                              }
                            </div>
                          );
                          props.setShowTooltip(true);
                        }
                      }}
                      onMouseOut={ () => {
                        props.setShowTooltip(false);
                      }}
                      onClick={ () => {
                        if (props.isMobile) {
                          return;
                        }
                        if (props.mode === "preview") {
                          props.displayPopup(`${item.lecture.subj_name} [${item.lecture.subj_id} (${item.lecture.lect_no})]`,
                            LectureInformationTable(item.lecture)
                          );
                        } else if (props.mode === "create") {
                          props.displayPopup(`${item.lecture.subj_name} [${item.lecture.subj_id}]`,
                            MultLectureInformationTable(dataCreate.relatedLectures.filter(lect => lect.subj_id === item.lecture.subj_id))
                          );
                        }
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
                  item => 
                    <div className='timetable-subject'
                      style={
                        {
                          left: item.leftPos,
                          top: item.topPos,
                          height: item.height,
                          backgroundColor: "rgba(0, 0, 0, 0.2)"
                        }
                      }>
                      <span><strong>{item.subjName}</strong>{"\n"}{item.room}</span>
                    </div>
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