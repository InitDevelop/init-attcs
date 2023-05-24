import React, { useState } from 'react';
import { customSchedule, lecture, timeToTime } from '../../interfaces/Lecture';
import { getTimeSlots } from '../../interfaces/Scenario';
import buildingData from "../../db/building_data.json";

type propType = {
  customLecture: customSchedule;
  handleRemoveSchedule: (customLecture: customSchedule) => void;
  handleSaveSchedule: (name: string, date: number, room: string, interval: timeToTime, customLecture: customSchedule) => void;
  handleEditSchedule: (customLecture: customSchedule) => void;
};

const hours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
const minutes = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
const dates = ["월요일", "화요일", "수요일", "목요일", "금요일"];

const inputStyle: React.CSSProperties | undefined = {
  width: "60%",
  textAlign: "center",
  marginRight: "10px"
}

function CustomLecture(props: propType) {

  const [eventName, setEventName] = useState<string>(props.customLecture.schedule.subj_name);
  const [eventRoom, setEventRoom] = useState<string>(props.customLecture.schedule.lect_room);
  const [eventDate, setEventDate] = useState<number>(props.customLecture.date);
  const [startHour, setStartHour] = useState<number>(props.customLecture.interval.start.hour);
  const [startMin, setStartMin] = useState<number>(props.customLecture.interval.start.minute);
  const [endHour, setEndHour] = useState<number>(props.customLecture.interval.end.hour);
  const [endMin, setEndMin] = useState<number>(props.customLecture.interval.end.minute);


  const getDateString = (dateNumber: number) => {
    switch (dateNumber) {
      case 0:
        return "월";
      case 1:
        return "화";
      case 2:
        return "수";
      case 3:
        return "목";
      case 4:
        return "금";
      default:
        return "";
    }
  }

  return (
    <div className='prioritybox'>
      <table className='prioritybox-table'>
        <tbody>



          <tr>
            <td style={{ width: "30%" }}>
              <h4 className='item-square-key'>일정 이름</h4>
            </td>
            <td style={{ width: "50%", textAlign: 'left' }}>
              {
                props.customLecture.editable ?
                <input type='text' onChange={(e) => {
                  setEventName(e.target.value)
                }} value={eventName} style={inputStyle} className='input-1'></input>
                :
                <h4 style={{textAlign: "left", marginLeft: "10px"}}>{props.customLecture.schedule.subj_name}</h4>
              }
            </td>
            <td style={{ width: "20%" }}>
              {
                props.customLecture.editable ?

                <button className='button-0'
                onClick={() => {props.handleSaveSchedule(eventName, eventDate, eventRoom,
                {
                  start: {hour: startHour, minute: startMin}, end: {hour: endHour, minute: endMin}
                }, props.customLecture)}}>
                  저장
                </button>
                :
                <button className='button-0'
                onClick={() => {props.handleEditSchedule(props.customLecture)}}>
                  편집
                </button>
              }
            </td>
          </tr>

          <tr>
            <td style={{ width: "30%" }}>
              <h4 className='item-square-key'>장소</h4>
            </td>
            <td style={{ width: "50%", textAlign: 'left' }}>
              {
                props.customLecture.editable ?
                <>
                  <input type='text' onChange={(e) => {
                    setEventRoom(e.target.value)
                  }} value={eventRoom} style={inputStyle} className='input-1'></input>
                  {"  (예) 301-118"}
                </>
                :
                <h4 style={{textAlign: "left", marginLeft: "10px"}}>{props.customLecture.schedule.lect_room}</h4>
              }

            </td>
            <td style={{ width: "20%" }}>
              <button className='button-0'
                onClick={() => {props.handleRemoveSchedule(props.customLecture)}}>
                  제거
              </button>
            </td>
          </tr>

          <tr>
            <td style={{ width: "30%" }}>
              <h4 className='item-square-key'>시간</h4>
            </td>
            <td colSpan={2} style={{ width: "70%", textAlign: 'left' }}>

            {
              props.customLecture.editable ?
              <div className='schedule-timeslot'>
                <select className='select' 
                  onChange={(e) => {setEventDate(dates.indexOf(e.target.value))}}
                  value={getDateString(eventDate) + "요일"}>
                  {
                    dates.map(
                      date => <option value={date}>
                        {date}
                      </option>
                    )
                  }
                </select>{"   "}
                <select className='select'
                  onChange={(e) => {setStartHour(parseInt(e.target.value))}}
                  value={startHour}>
                  {
                    hours.map(
                      hour => <option value={hour}>
                        {hour}
                      </option>
                    )
                  }
                </select>{" 시  "}
                <select className='select'
                  onChange={(e) => {setStartMin(parseInt(e.target.value))}}
                  value={startMin}>
                  {
                    minutes.map(
                      minute => <option value={minute}>
                        {minute}
                      </option>
                    )
                  }
                </select>{" 분부터  "}
                <select className='select'
                  onChange={(e) => {setEndHour(parseInt(e.target.value))}}
                  value={endHour}>
                  {
                    hours.map(
                      hour => <option value={hour}>
                        {hour}
                      </option>
                    )
                  }
                </select>{" 시  "}
                <select className='select'
                  onChange={(e) => {setEndMin(parseInt(e.target.value))}}
                  value={endMin}>
                  {
                    minutes.map(
                      minute => <option value={minute}>
                        {minute}
                      </option>
                    )
                  }
                </select>{" 분까지  "}
              </div>
              :
              <h4 style={{textAlign: "left", marginLeft: "10px"}}>
                {getDateString(props.customLecture.date) + "요일  "
                  + props.customLecture.interval.start.hour + "시  "
                  + props.customLecture.interval.start.minute + "분부터  "
                  + props.customLecture.interval.end.hour + "시  "
                  + props.customLecture.interval.end.minute + "분까지"
                }
              </h4>
            }

            
            </td>
          </tr>



        </tbody>
      </table>
    </div>
  )
}

export default CustomLecture;