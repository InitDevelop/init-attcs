import { pseudoTimeSlot } from "./Lecture";
import { lecture, lectureGroup } from "./Lecture";

export type scenario = {
  lectures: lecture[];
};

export const getDateValue = (dateChar: string): number => {
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

export function getTimeSlots(lect: lecture) {
  let timeSlots: pseudoTimeSlot[] = [];

  let times = lect.time.split("/");
  let count = times.length;

  for (let i = 0; i < count; i++) {
    let date = 0;
    let startHour = parseInt(times[i].substring(2, 4));
    let startMin = parseInt(times[i].substring(5, 7));
    let endHour = parseInt(times[i].substring(8, 10));
    let endMin = parseInt(times[i].substring(11, 13));

    date = getDateValue(times[i].substring(0, 1));

    timeSlots.push({
      startTime: startHour * 100 + startMin,
      endTime: endHour * 100 + endMin,
      date: date,
      lecture: lect
    });
  }

  return timeSlots;
}

export const isTimeIntersect = (thisStart: number, thisEnd: number, thatStart: number, thatEnd: number) => {
  let ret = true;
  if (thisStart > thatEnd || thisEnd < thatStart) {
    ret = false;
  }
  return ret;
}

export const intersects = (sc: scenario, lect: lecture) => {
  let timeSlotsThis: pseudoTimeSlot[] = getTimeSlots(lect);
  let timeSlotsThat: pseudoTimeSlot[] = [];
  for (const scLect of sc.lectures) {
    timeSlotsThat.push(...getTimeSlots(scLect));
  }

  let isIntersect: boolean = false;

  totalLoop: for (const lectTimeSlot of timeSlotsThis) {
    for (const scTimeSlot of timeSlotsThat) {
      if (isTimeIntersect(lectTimeSlot.startTime, lectTimeSlot.endTime, scTimeSlot.startTime, scTimeSlot.endTime)) {
        if (lectTimeSlot.date === scTimeSlot.date) {
          isIntersect = true;
          break totalLoop;
        }
      }
    }
  }
  return isIntersect;
}

export function getScenario(lectureGroups: lectureGroup[], indexes: number[]) {
  let returnScenario: scenario = { lectures: [] };
  for (let i = 0; i < lectureGroups.length; i++) {
    if (!intersects(returnScenario, lectureGroups[i].lectures[indexes[i]])) {
      returnScenario.lectures.push(lectureGroups[i].lectures[indexes[i]]);
    }
  }
  return (returnScenario);
}