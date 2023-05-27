import { useContext } from 'react'
import "./PriorityBox.css";
import "../../App.css";
import { CreationContext } from '../../App';
import CustomLecture from './CustomLecture';
import { blankLecture, customSchedule, lecture } from '../../interfaces/Lecture';

function CustomLectures() {

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

  const formatTime = (startHour: number, startMin: number, endHour: number, endMin: number) => {
    let returnString = "";

    let startTime = startHour * 100 + startMin;
    let endTime = endHour * 100 + endMin;

    if (startTime.toString().length === 3) {
      returnString += "0" + startTime.toString().substring(0, 1) + ":" + startTime.toString().substring(1);
    } else {
      returnString += startTime.toString().substring(0, 2) + ":" + startTime.toString().substring(2);
    }

    returnString += "~";

    if (endTime.toString().length === 3) {
      returnString += "0" + endTime.toString().substring(0, 1) + ":" + endTime.toString().substring(1);
    } else {
      returnString += endTime.toString().substring(0, 2) + ":" + endTime.toString().substring(2);
    }

    return returnString;
  }

  const data = useContext(CreationContext);

  const handleAddSchedule = () => {
    let addingObj: customSchedule = {
      id: Math.random(),
      editable: true,
      schedule: blankLecture,
      startHour: 9,
      startMin: 0,
      endHour: 10,
      endMin: 0,
      date: 0,
      room: "",
      name: ""
    };

    data.setCustomLectures(
      data.customLectures.concat(addingObj)
    );
  }

  const handleRemoveSchedule = (customLecture: customSchedule) => {
    data.setCustomLectures(
      data.customLectures.filter(cl => cl.id !== customLecture.id)
    );
  }

  const handleEditSchedule = (customLecture: customSchedule) => {
    let thisLecture = customLecture;
    thisLecture.editable = true;
    data.setCustomLectures(
      data.customLectures.filter(cl => cl.id !== customLecture.id).concat(thisLecture)
    );
  }

  const handleSaveSchedule = (customLecture: customSchedule, name: string, date: number,
      startHour: number, startMin: number, endHour: number, endMin: number,
      room: string, editable: boolean) => {

    if (startHour * 100 + startMin < endHour * 100 + endMin || editable === true) {
      let fixedSchedule: lecture = {
        lect_type: '',
        lect_col: '',
        lect_dept: '',
        grad: '',
        grade: '',
        subj_id: "CUSTOM." + Math.floor(customLecture.id * 100000).toString(),
        lect_no: "001",
        subj_name: name,
        subj_subname: '',
        credit: "0",
        cred_lect: '',
        cred_lab: '',
        time: getDateString(customLecture.date) + "(" + formatTime(startHour, startMin, endHour, endMin) + ")",
        lect_form: '',
        lect_room: room,
        prof: '',
        student_count: '',
        extra_info: '',
        lang: "한국어"
      };

      let thisLecture: customSchedule = {
        id: customLecture.id,
        schedule: fixedSchedule,
        editable: editable,
        
        startHour: startHour,
        startMin: startMin,
        endHour: endHour,
        endMin: endMin,

        date: date,
        room: room,
        name: name
      };

      data.setCustomLectures(
        data.customLectures.filter(cl => cl.id !== customLecture.id).concat(thisLecture)
      );

    } else {
      data.displayPopup("\"나만의 일정\" 추가 오류", <>"나만의 일정"에서 끝 시간은 시작 시간보다 빠를 수 없습니다.</>)
    }
  }

  const handleNameChange = (customLecture: customSchedule, name: string) => {
    handleSaveSchedule(customLecture, name, customLecture.date, customLecture.startHour,
      customLecture.startMin, customLecture.endHour, customLecture.endMin, customLecture.room, true);
  }

  const handleRoomChange = (customLecture: customSchedule, room: string) => {
    handleSaveSchedule(customLecture, customLecture.name, customLecture.date, customLecture.startHour,
      customLecture.startMin, customLecture.endHour, customLecture.endMin, room, true);
  } 

  const handleDateChange = (customLecture: customSchedule, date: number) => {
    handleSaveSchedule(customLecture, customLecture.name, date, customLecture.startHour,
      customLecture.startMin, customLecture.endHour, customLecture.endMin, customLecture.room, true);
  } 

  const handleTimeChange = (customLecture: customSchedule, startHour: number, startMin: number, endHour: number, endMin: number) => {
    handleSaveSchedule(customLecture, customLecture.name, customLecture.date, startHour,
      startMin, endHour, endMin, customLecture.room, true);
  } 

  return (
    <div className="appTable__container" style={{ whiteSpace: "pre-wrap" }}>
      <p className="large-title">나만의 일정</p>
      <div className="appTable__scrollContainer">
        {
          data.customLectures.map(
            customLecture =>
            <CustomLecture
              customLecture={customLecture}
              handleRemoveSchedule={handleRemoveSchedule}
              handleEditSchedule={handleEditSchedule}
              handleSaveSchedule={handleSaveSchedule}
              handleNameChange={handleNameChange}
              handleRoomChange={handleRoomChange}
              handleDateChange={handleDateChange}
              handleTimeChange={handleTimeChange}
            />
          )
        }
        <div className="prioritybox" style={{ padding: "12px 10px" }}>
          <button className='button-0' onClick={handleAddSchedule}>나만의 일정 추가하기</button>
        </div>
      </div>
    </div>
  )
}

export default CustomLectures;