import React from 'react'
import "../css/TimeTable.css"

let times = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
const colors = ["#de6b54", "#de8954", "#deb954", "#6aad51",
  "#51ad8d", "#519ead", "#4f6cc2", "#6d598f", "#8f5987"];

const isTimeIntersect = (thisStart, thisEnd, thatStart, thatEnd) => {
  let ret = true;
  if (thisStart > thatEnd || thisEnd < thatStart) {
    ret = false;
  }
  return ret;
}

const getDateValue = (dateChar) => {
  let date = 5;
  switch (dateChar) {
    case "월":
      date = 0;
      break;
    case "화":
      date = 1;
      break;
    case "수":
      date = 2;
      break;
    case "목":
      date = 3;
      break;
    case "금":
      date = 4;
      break;
  }
  return date;
}

function TimeTable(props) {
  let timeSlots = [];
  let hoveredTimeSlots = [];

  for (let j = 0; j < props.selSubj.length; j++) {
    let times = props.selSubj[j].time.split("/");
    let count = times.length;

    for (let i = 0; i < count; i++) {
      let date = 0;
      let startHour = parseInt(times[i].substring(2, 4));
      let startMin = parseInt(times[i].substring(5, 7));
      let endHour = parseInt(times[i].substring(8, 10));
      let endMin = parseInt(times[i].substring(11, 13));

      date = getDateValue(times[i].substring(0, 1));

      let topPos = `${((startHour - 9) + startMin / 60) * 6}vh`;
      let height = `${((endHour - startHour) + (endMin - startMin) / 60) * 6}vh`;
      let leftPos = `${10 + date * 18}%`;

      timeSlots.push({
        startTime: startHour * 100 + startMin,
        endTime: endHour * 100 + endMin,
        date: date,
        id: j,
        subjName: props.selSubj[j].subj_name,
        leftPos: leftPos,
        topPos: topPos,
        height: height
      });
    }
  }

  if (props.subjHover) {
    let hoverTimes = props.hoveredSubj.time.split("/");
    let hoverCount = hoverTimes.length;

    for (let k = 0; k < hoverCount; k++) {
      let date = 0;
      let startHour = parseInt(hoverTimes[k].substring(2, 4));
      let startMin = parseInt(hoverTimes[k].substring(5, 7));
      let endHour = parseInt(hoverTimes[k].substring(8, 10));
      let endMin = parseInt(hoverTimes[k].substring(11, 13));

      date = getDateValue(hoverTimes[k].substring(0, 1));

      let topPos = `${((startHour - 9) + startMin / 60) * 6}vh`;
      let height = `${((endHour - startHour) + (endMin - startMin) / 60) * 6}vh`;
      let leftPos = `${10 + date * 18}%`;

      hoveredTimeSlots.push({
        startTime: startHour * 100 + startMin,
        endTime: endHour * 100 + endMin,
        date: date,
        subjName: props.hoveredSubj.subj_name,
        leftPos: leftPos,
        topPos: topPos,
        height: height
      });
    }
  }

  return (
    <div className='timetable__container'>
      <div style={{position: 'relative'}}>
        <table className='timetable__table'>
          <tbody>
            {times.map(
              time => {
                return (
                  <tr className='timetable__row'>
                    <td className='timetable__timeslot'>{time}</td>
                    <td className='timetable__item'></td>
                    <td className='timetable__item'></td>
                    <td className='timetable__item'></td>
                    <td className='timetable__item'></td>
                    <td className='timetable__item'></td>
                  </tr>
                )
              }
            )}
          </tbody>         
        </table>

        {timeSlots.map(
          item => {
            return (
              <div className='timetable__subject'
                onMouseOver={(event) => {
                  props.setShowTooltip(true);
                  let content = item.subjName;
                  for (let i = 0; i < timeSlots.length; i++) {
                    if (item.id === timeSlots[i].id) {
                      continue;
                    }
                    if (item.date === timeSlots[i].date) {
                      if (isTimeIntersect(item.startTime, item.endTime, timeSlots[i].startTime, timeSlots[i].endTime)) {
                          content += ("\n" + timeSlots[i].subjName);
                      }
                    }
                  }
                  props.setTooltipContent(content);
                }}
                onMouseOut={(event) => {
                  props.setShowTooltip(false);
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
                {item.subjName}
              </div>
            )
          }
        )}

        {props.subjHover && (
          hoveredTimeSlots.map(
            item => {
              return (
                <div className='timetable__subject'
                style={
                  {
                    left: item.leftPos,
                    top: item.topPos,
                    height: item.height,
                    backgroundColor: "rgba(0, 0, 0, 0.2)"
                  }
                }>
                </div>
              )
            }
          )
        )}


      </div>
      
    </div>
  )
}

export default TimeTable