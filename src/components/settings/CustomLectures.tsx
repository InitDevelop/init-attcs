import { useContext } from 'react'
import "./PriorityBox.css";
import "../../App.css";
import { CreationContext } from '../../App';
import CustomLecture from './CustomLecture';
import { blankLecture, CustomSchedule, Lecture } from '../../util/Lecture';

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
    let addingObj: CustomSchedule = {
      ...blankLecture,
      indicator: Math.random(),
      editable: true,
      startHour: 9,
      startMin: 0,
      endHour: 10,
      endMin: 0,
      startTime: 900,
      endTime: 1000,
      date: 0,
      slotRoom: "",
      slotOrder: -1
    };

    data.setCustomLectures(
      data.customLectures.concat(addingObj)
    );
  }

  const handleRemoveSchedule = (customLecture: CustomSchedule) => {
    data.setCustomLectures(
      data.customLectures.filter(cl => cl.id !== customLecture.id)
    );
  }

  const handleEditSchedule = (customLecture: CustomSchedule) => {
    let thisLecture = customLecture;
    thisLecture.editable = true;
    data.setCustomLectures(
      data.customLectures.filter(cl => cl.id !== customLecture.id).concat(thisLecture)
    );
  }

  const handleSaveSchedule = (customLecture: CustomSchedule, name: string, date: number,
      startHour: number, startMin: number, endHour: number, endMin: number,
      room: string, editable: boolean) => {

    if (startHour * 100 + startMin < endHour * 100 + endMin || editable === true) {
      let fixedSchedule: Lecture = {
        id: "CUSTOM." + Math.floor(customLecture.indicator * 100000).toString(),
        classification: '기타',
        college: '나만의 일정',
        department: '',
        program: '',
        year: '',
        subjectID: "CUSTOM." + Math.floor(customLecture.indicator * 100000).toString(),
        lectureNumber: "001",
        subjectTitle: name,
        subjectSubtitle: '',
        credit: "0",
        creditLecture: '',
        creditLab: '',
        time: getDateString(customLecture.date) + "(" + formatTime(startHour, startMin, endHour, endMin) + ")",
        lectureForm: '',
        lectureRoom: room,
        lecturer: '',
        quota: '',
        extraInfo: '',
        language: "한국어"
      };

      let thisLecture: CustomSchedule = {
        ...fixedSchedule,

        indicator: customLecture.indicator,
        editable: editable,
        
        startHour: startHour,
        startMin: startMin,
        endHour: endHour,
        endMin: endMin,

        startTime: startHour * 100 + startMin,
        endTime: endHour * 100 + endMin,

        date: date,
        slotRoom: room,
        slotOrder: -1
      };

      data.setCustomLectures(
        data.customLectures.filter(cl => cl.id !== customLecture.id).concat(thisLecture)
      );

    } else {
      data.displayPopup("\"나만의 일정\" 추가 오류", <>"나만의 일정"에서 끝 시간은 시작 시간보다 빠를 수 없습니다.</>)
    }
  }

  const handleNameChange = (customLecture: CustomSchedule, name: string) => {
    handleSaveSchedule(customLecture, name, customLecture.date, customLecture.startHour,
      customLecture.startMin, customLecture.endHour, customLecture.endMin, customLecture.lectureRoom, true);
  }

  const handleRoomChange = (customLecture: CustomSchedule, room: string) => {
    handleSaveSchedule(customLecture, customLecture.subjectTitle, customLecture.date, customLecture.startHour,
      customLecture.startMin, customLecture.endHour, customLecture.endMin, room, true);
  } 

  const handleDateChange = (customLecture: CustomSchedule, date: number) => {
    handleSaveSchedule(customLecture, customLecture.subjectTitle, date, customLecture.startHour,
      customLecture.startMin, customLecture.endHour, customLecture.endMin, customLecture.lectureRoom, true);
  } 

  const handleTimeChange = (customLecture: CustomSchedule, startHour: number, startMin: number, endHour: number, endMin: number) => {
    handleSaveSchedule(customLecture, customLecture.subjectTitle, customLecture.date, startHour,
      startMin, endHour, endMin, customLecture.lectureRoom, true);
  } 

  return (
    <div className="appTable__container" style={{ whiteSpace: "pre-wrap" }}>
      <p className="large-title">나만의 일정</p>
      <div className={!data.isMobile ?
        "appTable__scrollContainer" : "appTable__scrollContainer-no-title"}>
        {
          data.customLectures.map(
            customLecture =>
            <CustomLecture
              key={customLecture.id}
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
          <button className='button-0' style={{ fontSize: data.isMobile ? "120%" : "100%" }}
            onClick={handleAddSchedule}>나만의 일정 추가하기</button>
        </div>
      </div>
    </div>
  )
}

export default CustomLectures;