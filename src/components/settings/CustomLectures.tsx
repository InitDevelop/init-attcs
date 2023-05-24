import React, { useContext } from 'react'
import "./PriorityBox.css";
import "../../App.css";
import { CreationContext } from '../../App';
import CustomLecture from './CustomLecture';
import { blankLecture, customSchedule, lecture, timeToTime } from '../../interfaces/Lecture';

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

  const formatTime = (interval: timeToTime) => {
    let returnString = "";

    let startTime = interval.start.hour * 100 + interval.start.minute;
    let endTime = interval.end.hour * 100 + interval.end.minute;

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
      interval: {
        start: {hour: 9, minute: 0},
        end: {hour: 10, minute: 0}
      },
      date: 0
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

  const handleSaveSchedule = (name: string, date: number, room: string, interval: timeToTime, customLecture: customSchedule) => {
    if (interval.start.hour * 100 + interval.start.minute < interval.end.hour * 100 + interval.end.minute) {
      let fixedSchedule = customLecture.schedule;
      fixedSchedule.time = getDateString(customLecture.date) + "(" + formatTime(interval) + ")";
      fixedSchedule.lect_room = room;
      fixedSchedule.subj_name = name;
      fixedSchedule.subj_id = "CUSTOM." + Math.floor(customLecture.id * 100000).toString();
      fixedSchedule.lect_no = "001";
      fixedSchedule.credit = "0";
      fixedSchedule.lang = "한국어";

      let thisLecture: customSchedule = {
        id: customLecture.id,
        schedule: fixedSchedule,
        editable: false,
        interval: interval,
        date: date
      };

      data.setCustomLectures(
        data.customLectures.filter(cl => cl.id !== customLecture.id).concat(thisLecture)
      );

    } else {
      data.displayPopup("\"나만의 일정\" 추가 오류", <>"나만의 일정"에서 끝 시간은 시작 시간보다 빠를 수 없습니다.</>)
    }
  }


  return (
    <div className="appTable__container" style={{ whiteSpace: "pre-wrap" }}>
      <p className="large-title">나만의 일정</p>
      <div className="appTable__scrollContainer">
        {
          data.customLectures.map(
            customLecture =>
            <CustomLecture
              customLecture = {customLecture}
              handleRemoveSchedule = {handleRemoveSchedule}
              handleEditSchedule = {handleEditSchedule}
              handleSaveSchedule = {handleSaveSchedule}
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