import { PseudoTimeSlot, toPseudoTimeSlots } from "./Lecture";
import { Lecture, LectureGroup } from "./Lecture";
import { Warning, getTimeNumber } from "./Util";

export interface Scenario {
  lectures: Lecture[];
  shareTimeLectures: Lecture[][];
  warnings: Warning[];
  priority: number;
};

export const isTimeIntersectExpanded = (thisStartHour: number, thisStartMin: number,
  thisEndHour: number, thisEndMin: number,
  thatStartHour: number, thatStartMin: number,
  thatEndHour: number, thatEndMin: number) => {
  return getTimeNumber(thisStartHour, thisStartMin) <= getTimeNumber(thatEndHour, thatEndMin) 
  && getTimeNumber(thisEndHour, thisEndMin) >= getTimeNumber(thatStartHour, thatStartMin);
}

export const isTimeIntersect = (thisStart: number, thisEnd: number, thatStart: number, thatEnd: number) => {
  return thisStart <= thatEnd && thisEnd >= thatStart;
}

export const intersects = (sc: Scenario, lect: Lecture) => {
  let scenarioSlots: PseudoTimeSlot[] = sc.lectures.flatMap(lect => toPseudoTimeSlots(lect));
  let newTimeSlots: PseudoTimeSlot[] = toPseudoTimeSlots(lect);
  let timeSlotsThat: PseudoTimeSlot[][] = [[], [], [], [], []];
  
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

export function getScenario(lectureGroups: LectureGroup[], indexes: number[]) {
  let allowLeftover: boolean[] = lectureGroups.map(lg => !lg.mustInclude);
  let returnScenario: Scenario = { lectures: [], shareTimeLectures: [], warnings: [], priority: 0 };
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
        leftOverIDs.push(lectureGroups[i].subjectID);
      } else {
        return { scenario: returnScenario, leftovers: [], exitCode: 1 };
      }
    }
  }
  return { scenario: returnScenario, leftovers: leftOverIDs, exitCode: exitCode };
}