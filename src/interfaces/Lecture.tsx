import { getDateValue } from "./Scenario";

export type time = {
  hour: number;
  minute: number;
}

export type timeToTime = {
  start: time;
  end: time;
}

export type lecture = {
  lect_type: string;
  lect_col: string;
  lect_dept: string;
  grad: string;
  grade: string;
  subj_id: string;
  lect_no: string;
  subj_name: string;
  subj_subname: string;
  credit: string;
  cred_lect: string;
  cred_lab: string;
  time: string;
  lect_form: string;
  lect_room: string;
  prof: string;
  student_count: string;
  extra_info: string;
  lang: string;
}

export const blankLecture: lecture = {
  lect_type: "",
  lect_col: "",
  lect_dept: "",
  grad: "",
  grade: "",
  subj_id: "",
  lect_no: "",
  subj_name: "",
  subj_subname: "",
  credit: "",
  cred_lect: "",
  cred_lab: "",
  time: "",
  lect_form: "",
  lect_room: "",
  prof: "",
  student_count: "",
  extra_info: "",
  lang: ""
}

export type timeSlot = {
  startTime: number;
  endTime: number;
  date: number;
  id: number;
  subjName: string;
  leftPos: string;
  topPos: string;
  height: string;
  room: string;
  lectures: lecture[];
}

export type pseudoTimeSlot = {
  startTime: number;
  endTime: number;
  date: number;
  lecture: lecture;
  room: string;
}

export type lectureGroup = {
  subj_id: string;
  lectures: lecture[];
  timeShareLectures: lecture[][];
  mustInclude: boolean;
}

export const getTimeTableSlots = (lectures: lecture[]) => {
  let timeSlots: timeSlot[] = [];

  for (let j = 0; j < lectures.length; j++) {
    let times = lectures[j].time.split("/");
    let count = times.length;
    let rooms = lectures[j].lect_room.split("/")

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
        subjName: lectures[j].subj_name,
        leftPos: leftPos,
        topPos: topPos,
        height: height,
        room: rooms[i],
        lectures: [lectures[j]]
      });
    }
  }

  return timeSlots;
}

export const getHoveredTimeTableSlots = (subjHover: boolean, hoveredSubj: lecture) => {
  let hoveredTimeSlots: timeSlot[] = [];
  if (subjHover) {
    let hoverTimes = hoveredSubj.time.split("/");
    let hoverCount = hoverTimes.length;
    let rooms = hoveredSubj.lect_room.split("/")

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
        subjName: hoveredSubj.subj_name,
        leftPos: leftPos,
        topPos: topPos,
        height: height,
        id: 0,
        room: rooms[k],
        lectures: [hoveredSubj]
      });
    }
  }
  return hoveredTimeSlots;
}

export type customSchedule = {
  id: number;
  schedule: lecture;
  editable: boolean;
  interval: timeToTime;
  date: number;
}