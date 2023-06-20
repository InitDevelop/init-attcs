import React from 'react';
import CustomLecture from '../../util/CustomLecture';

type propType = {
  customLecture: CustomLecture;
  handleRemoveSchedule: (customLecture: CustomLecture) => void;
  handleSaveSchedule: (customLecture: CustomLecture, name: string, date: number,
    startHour: number, startMin: number, endHour: number, endMin: number,
    room: string, editable: boolean) => void;
  handleEditSchedule: (customLecture: CustomLecture) => void;
  handleNameChange: (customLecture: CustomLecture, name: string) => void;
  handleRoomChange: (customLecture: CustomLecture, room: string) => void;
  handleDateChange: (customLecture: CustomLecture, date: number) => void;
  handleTimeChange: (customLecture: CustomLecture, startHour: number, startMin: number, endHour: number, endMin: number) => void;
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

  // const [eventName, setEventName] = useState<string>(props.customLecture.schedule.subj_name);
  // const [eventRoom, setEventRoom] = useState<string>(props.customLecture.schedule.lect_room);
  // const [eventDate, setEventDate] = useState<number>(props.customLecture.date);
  // const [startHour, setStartHour] = useState<number>(props.customLecture.interval.start.hour);
  // const [startMin, setStartMin] = useState<number>(props.customLecture.interval.start.minute);
  // const [endHour, setEndHour] = useState<number>(props.customLecture.interval.end.hour);
  // const [endMin, setEndMin] = useState<number>(props.customLecture.interval.end.minute);

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
              <h4 className='item-square-key'>일정 이름</h4>
            </td>
            <td style={{ width: "60%", textAlign: 'left' }}>
              {
                props.customLecture.editable ?
                <input type='text' onChange={(e) => {
                  props.handleNameChange(props.customLecture, e.target.value)
                }} value={props.customLecture.name} style={inputStyle} className='input-1'></input>
                :
                <h4 style={{textAlign: "left", marginLeft: "10px"}}>{props.customLecture.schedule.subj_name}</h4>
              }
            </td>
            <td style={{ width: "20%" }}>
              {
                props.customLecture.editable ?

                <button className='button-0'
                onClick={() => {
                  props.handleSaveSchedule(
                    props.customLecture, props.customLecture.name, props.customLecture.date, props.customLecture.startHour,
                    props.customLecture.startMin, props.customLecture.endHour, props.customLecture.endMin,
                    props.customLecture.room, false
                  )
                  }}>
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
            <td style={{ width: "20%" }}>
              <h4 className='item-square-key'>장소</h4>
            </td>
            <td style={{ width: "60%", textAlign: 'left' }}>
              {
                props.customLecture.editable ?
                <>
                  <input type='text' onChange={(e) => {
                    props.handleRoomChange(props.customLecture, e.target.value)
                  }} value={props.customLecture.room} style={inputStyle} className='input-1'></input>
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
                </select>{" 분부터  "}
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