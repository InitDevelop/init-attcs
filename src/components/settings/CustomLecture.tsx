import React from 'react';
import { CustomSchedule } from '../../util/Lecture';

type propType = {
  customLecture: CustomSchedule;
  handleRemoveSchedule: (customLecture: CustomSchedule) => void;
  handleSaveSchedule: (customLecture: CustomSchedule, name: string, date: number,
    startHour: number, startMin: number, endHour: number, endMin: number,
    room: string, editable: boolean) => void;
  handleEditSchedule: (customLecture: CustomSchedule) => void;
  handleNameChange: (customLecture: CustomSchedule, name: string) => void;
  handleRoomChange: (customLecture: CustomSchedule, room: string) => void;
  handleDateChange: (customLecture: CustomSchedule, date: number) => void;
  handleTimeChange: (customLecture: CustomSchedule, startHour: number, startMin: number, endHour: number, endMin: number) => void;
};

const hours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
const minutes = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
const dates = ["월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];

const inputStyle: React.CSSProperties | undefined = {
  width: "100%",
  textAlign: "left",
  marginRight: "10px"
}

function CustomLecture(props: propType) {

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
            <td style={{ width: "20%" }}>
              <h4 className='item-square-key' style={{ whiteSpace: "nowrap" }}>일정 이름</h4>
            </td>
            <td style={{ width: "60%", textAlign: 'left' }}>
              {
                props.customLecture.editable ?
                <input type='text' onChange={(e) => {
                  props.handleNameChange(props.customLecture, e.target.value)
                }} value={props.customLecture.subjectTitle} style={inputStyle} className='input-1'></input>
                :
                <h4 style={{textAlign: "left", marginLeft: "10px"}}>{props.customLecture.subjectTitle}</h4>
              }
            </td>
            <td style={{ width: "20%" }}>
              {
                props.customLecture.editable ?

                <button className='button-0'
                onClick={() => {
                  props.handleSaveSchedule(
                    props.customLecture, props.customLecture.subjectTitle, props.customLecture.date, props.customLecture.startHour,
                    props.customLecture.startMin, props.customLecture.endHour, props.customLecture.endMin,
                    props.customLecture.lectureRoom, false
                  )
                  }}>
                  저장
                </button>
                :
                <button className='button-0'
                onClick={() => { props.handleEditSchedule(props.customLecture) }}>
                  편집
                </button>
              }
            </td>
          </tr>

          <tr>
            <td style={{ width: "20%" }}>
              <h4 className='item-square-key'>장소</h4>
            </td>
            <td style={{ width: "60%", textAlign: 'left' }}>
              {
                props.customLecture.editable ?
                <input type='text' onChange={(e) => {
                  props.handleRoomChange(props.customLecture, e.target.value)
                }}  value={props.customLecture.lectureRoom}
                    style={inputStyle} placeholder='예) 301-118'
                    className='input-1'></input>
                :
                <h4 style={{textAlign: "left", marginLeft: "10px"}}>{props.customLecture.lectureRoom}</h4>
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
            <td style={{ width: "20%" }}>
              <h4 className='item-square-key'>시간</h4>
            </td>
            <td colSpan={2} style={{ width: "80%", textAlign: 'left' }}>

            {
              props.customLecture.editable ?
              <div className='schedule-timeslot'>
                <select className='select' 
                  onChange={(e) => { props.handleDateChange(props.customLecture, dates.indexOf(e.target.value)) }}
                  value={getDateString(props.customLecture.date) + "요일"}>
                  {
                    dates.map(
                      date => <option value={date}>
                        {date}
                      </option>
                    )
                  }
                </select>{"   "}
                <select className='select'
                  onChange={(e) => {
                    props.handleTimeChange(props.customLecture,
                      parseInt(e.target.value), props.customLecture.startMin,
                      props.customLecture.endHour, props.customLecture.endMin)
                  }}
                  value={props.customLecture.startHour}>
                  {
                    hours.map(
                      hour => <option value={hour}>
                        {hour}
                      </option>
                    )
                  }
                </select>{" 시  "}
                <select className='select'
                  onChange={(e) => {
                    props.handleTimeChange(props.customLecture,
                      props.customLecture.startHour, parseInt(e.target.value),
                      props.customLecture.endHour, props.customLecture.endMin)}}
                  value={props.customLecture.startMin}>
                  {
                    minutes.map(
                      minute => <option value={minute}>
                        {minute}
                      </option>
                    )
                  }
                </select>{" 분부터"}
                <div style={{ height: "10px" }}/>
                <select className='select'
                  onChange={(e) => {
                    props.handleTimeChange(props.customLecture,
                      props.customLecture.startHour, props.customLecture.startMin,
                      parseInt(e.target.value), props.customLecture.endMin)
                  }}
                  value={props.customLecture.endHour}>
                  {
                    hours.map(
                      hour => <option value={hour}>
                        {hour}
                      </option>
                    )
                  }
                </select>{" 시  "}
                <select className='select'
                  onChange={(e) => {
                    props.handleTimeChange(props.customLecture,
                      props.customLecture.startHour, props.customLecture.startMin,
                      props.customLecture.endHour, parseInt(e.target.value))
                  }}
                  value={props.customLecture.endMin}>
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
                  + props.customLecture.startHour + "시  "
                  + props.customLecture.startMin + "분부터  "
                  + props.customLecture.endHour + "시  "
                  + props.customLecture.endMin + "분까지"
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