import { pseudoTimeSlot } from "./Lecture";
import { lecture, lectureGroup } from "./Lecture";
import { warning } from "./Util";

export type scenario = {
  lectures: lecture[];
  shareTimeLectures: lecture[][];
  warnings: warning[];
  priority: number;
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
  let rooms = lect.lect_room.split("/")

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
      lecture: lect,
      room: rooms[i]
    });
  }

  return timeSlots;
}

export const isTimeIntersect = (thisStart: number, thisEnd: number, thatStart: number, thatEnd: number) => {
  return thisStart <= thatEnd && thisEnd >= thatStart;
}

export const intersects = (sc: scenario, lect: lecture) => {
  let scenarioSlots: pseudoTimeSlot[] = sc.lectures.flatMap(lect => getTimeSlots(lect));
  let newTimeSlots: pseudoTimeSlot[] = getTimeSlots(lect);
  let timeSlotsThat: pseudoTimeSlot[][] = [[], [], [], [], []];
  
  for (const slot of scenarioSlots) {
    if (slot.date > 5) continue;
    timeSlotsThat[slot.date].push(slot);
  }

  for (const newSlot of newTimeSlots) {
    if (timeSlotsThat[newSlot.date].some(slot =>
      isTimeIntersect(newSlot.startTime, newSlot.endTime, slot.startTime, slot.endTime))) {
        return true;
    }
  }
  return false;
}

export function getScenario(lectureGroups: lectureGroup[], indexes: number[]) {
  let allowLeftover: boolean[] = lectureGroups.map(lg => !lg.mustInclude);
  let returnScenario: scenario = { lectures: [], shareTimeLectures: [], warnings: [], priority: 0 };
  let leftOverIDs: string[] = [];
  
  // Meaning of exitCode
  // 0 : success
  // 1 : fail (includes intersecting timeslot)

  let exitCode = 0;

  for (let i = 0; i < lectureGroups.length; i++) {
    if (!intersects(returnScenario, lectureGroups[i].timeShareLectures[indexes[i]][0])) {
      returnScenario.lectures.push(lectureGroups[i].timeShareLectures[indexes[i]][0]);
      returnScenario.shareTimeLectures.push(lectureGroups[i].timeShareLectures[indexes[i]]);
    } else {
      if (allowLeftover[i]) {
        leftOverIDs.push(lectureGroups[i].subj_id);
      } else {
        return { scenario: returnScenario, leftovers: [], exitCode: 1 };
      }
    }
  }
  return { scenario: returnScenario, leftovers: leftOverIDs, exitCode: exitCode };

}

/*

BACKUP

export function getScenario(lectureGroups: lectureGroup[], indexes: number[]) {
  let returnScenario: scenario = { lectures: [], shareTimeLectures: [], warnings: [], priority: 0 };
  let leftOverIDs: string[] = [];
  for (let i = 0; i < lectureGroups.length; i++) {
    if (!intersects(returnScenario, lectureGroups[i].lectures[indexes[i]])) {
      returnScenario.lectures.push(lectureGroups[i].lectures[indexes[i]]);
      returnScenario.shareTimeLectures.push(lectureGroups[i].timeShareLectures[indexes[i]]);
    } else {
      leftOverIDs.push(lectureGroups[i].subj_id);
    }
  }

  return {scenario: returnScenario, leftovers: leftOverIDs};
}


export function getScenario(lectureGroups: lectureGroup[], indexes: number[]) {
  let returnScenario: scenario = { lectures: [], shareTimeLectures: [], warnings: [], priority: 0 };
  let leftOverIDs: string[] = [];
  for (let i = 0; i < lectureGroups.length; i++) {
    if (!intersects(returnScenario, lectureGroups[i].timeShareLectures[indexes[i]][0])) {
      returnScenario.lectures.push(lectureGroups[i].timeShareLectures[indexes[i]][0]);
      returnScenario.shareTimeLectures.push(lectureGroups[i].timeShareLectures[indexes[i]]);
    } else {
      leftOverIDs.push(lectureGroups[i].subj_id);
    }
  }

  return { scenario: returnScenario, leftovers: leftOverIDs };
}

*/
