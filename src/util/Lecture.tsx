import { getDateValue } from "./Util";

export interface Lecture {
  id: string;
  classification: string;
  college: string;
  department: string;
  program: string;
  year: string;
  subjectID: string;
  lectureNumber: string;
  subjectTitle: string;
  subjectSubtitle: string;
  credit: string;
  creditLecture: string;
  creditLab: string;
  time: string;
  lectureForm: string;
  lectureRoom: string;
  lecturer: string;
  quota: string;
  extraInfo: string;
  language: string;
}

export interface PseudoTimeSlot extends Lecture {
  slotOrder: number;
  date: number;
  slotRoom: string;

  startHour: number;
  startMin: number;

  endHour: number;
  endMin: number;

  startTime: number;
  endTime: number;
}

export interface CustomSchedule extends PseudoTimeSlot {
  indicator: number;
  editable: boolean;
}

export interface TimeSlot extends PseudoTimeSlot {
  displayOrder: number;
  leftPosition: string;
  topPosition: string;
  height: string;
}

export interface LectureGroup {
  subjectID: string;
  lectures: Lecture[];
  timeShareLectures: Lecture[][];
  //mustInclude: boolean;
}

export const blankLecture: Lecture = {
  id: "",
  classification: "",
  college: "",
  department: "",
  program: "",
  year: "",
  subjectID: "",
  lectureNumber: "",
  subjectTitle: "",
  subjectSubtitle: "",
  credit: "",
  creditLecture: "",
  creditLab: "",
  time: "",
  lectureForm: "",
  lectureRoom: "",
  lecturer: "",
  quota: "",
  extraInfo: "",
  language: ""
}

export const blankPseudoTimeSlot: PseudoTimeSlot = {
  ...blankLecture,
  slotOrder: 0,
  date: 0,
  slotRoom: "",
  startHour: 0,
  startMin: 0,
  endHour: 0,
  endMin: 0,
  startTime: 0,
  endTime: 0
}

export const toPseudoTimeSlots = (lecture: Lecture) => {
  let returningSlots: PseudoTimeSlot[] = [];

  let times = Array.from(new Set(lecture.time.split("/")));
  let count = times.length;
  let rooms = lecture.lectureRoom.split("/");

  if (lecture.time.length > 0) {
    for (let i = 0; i < count; i++) {
      let date = 0;
      let startHour = parseInt(times[i].substring(2, 4));
      let startMin = parseInt(times[i].substring(5, 7));
      let endHour = parseInt(times[i].substring(8, 10));
      let endMin = parseInt(times[i].substring(11, 13));
  
      date = getDateValue(times[i].substring(0, 1));
  
      returningSlots.push({
        ...lecture,
        slotOrder: i,
        startHour: startHour,
        startMin: startMin,
        endHour: endHour,
        endMin: endMin,
        date: date,
        slotRoom: rooms[i],
        startTime: startHour * 100 + startMin,
        endTime: endHour * 100 + endMin
      });
    }
  }

  return returningSlots;
}

export const toTimeSlots = (lecture: Lecture, displayOrder: number, containsSaturday: boolean) => {
  let returningSlots: TimeSlot[] = [];

  let times = Array.from(new Set(lecture.time.split("/")));
  let count = times.length;
  let rooms = lecture.lectureRoom.split("/");

  if (lecture.time.length > 0) {
    for (let i = 0; i < count; i++) {
      let date = 0;
      let startHour = parseInt(times[i].substring(2, 4));
      let startMin = parseInt(times[i].substring(5, 7));
      let endHour = parseInt(times[i].substring(8, 10));
      let endMin = parseInt(times[i].substring(11, 13));
  
      date = getDateValue(times[i].substring(0, 1));

      let topPositon = `calc((100%)*${((startHour - 9) + startMin / 60)}/13)`;
      let height = `calc((100%)*${((endHour - startHour) + (endMin - startMin) / 60)}/13)`;

      let leftPosition = ``;
      if (containsSaturday) {
        leftPosition = `${4 + date * 16}%`;
      } else {
        leftPosition = `${7.5 + date * 18.5}%`;
      }
  
      returningSlots.push({
        ...lecture,

        slotOrder: i,
        slotRoom: rooms[i],
        startHour: startHour,
        startMin: startMin,
        endHour: endHour,
        endMin: endMin,
        startTime: startHour * 100 + startMin,
        endTime: endHour * 100 + endMin,
        date: date,
        
        displayOrder: displayOrder,
        topPosition: topPositon,
        leftPosition: leftPosition,
        height: height
      });
    }
  }

  return returningSlots;
}

export const getAllTimeSlots = (lectures: Lecture[],
    containsSaturday = lectures.filter(lect => lect.time.includes("토")).length > 0): TimeSlot[] => {
  let returningSlots: TimeSlot[] = [];
  for (let i = 0; i < lectures.length; i++) {
    returningSlots.push(...toTimeSlots(lectures[i], i, containsSaturday));
  }
  return returningSlots;
}

export const getAllPseudoTimeSlots = (lectures: Lecture[]): PseudoTimeSlot[] => {
  let returningSlots: PseudoTimeSlot[] = [];
  for (let i = 0; i < lectures.length; i++) {
    returningSlots.push(...toPseudoTimeSlots(lectures[i]));
  }
  return returningSlots;
}