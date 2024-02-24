
import { Scenario } from "../../types/Scenario";
import { blankPseudoTimeSlot, PseudoTimeSlot, toPseudoTimeSlots } from "../../types/TimeSlot";
import { getDistance, Warning } from "../../util/Util";

const DISTANCE_LIMIT: number = 1.53;

const getStandardDeviation = (list: number[]): number => {
  let mean = 0;
  let variance = 0;
  for (const num of list) {
    mean += num;
  }
  mean /= list.length;

  for (const num of list) {
    variance += Math.pow(num - mean, 2) / list.length;
  }

  return Math.sqrt(variance);
}

const getMinuteDifference = (from: number, to: number): number => {
  let startMin: number = Math.floor(from / 100) * 60 + from % 100;
  let endMin: number   = Math.floor(to / 100) * 60 + to % 100;

  return (endMin - startMin);
}

const getLunchWarnings = (timeSlots: PseudoTimeSlot[][]): Warning => {
  let lunchWarning: Warning = { warningType: "lunch", weight: 0, extraInfo: [], isCritical: false };
  for (let date = 0; date <= 5; date++) {

    let existsLunchTime = false;
    if (timeSlots[date].length === 0) {
      existsLunchTime = true;
    } else if (timeSlots[date].length === 1) {
      if (timeSlots[date][0].endTime <= 1330 || 
          timeSlots[date][0].startTime >= 1130) {
        existsLunchTime = true;
      }
    } else {
      if (timeSlots[date][0].startTime >= 1130 || 
          timeSlots[date][timeSlots[date].length - 1].endTime <= 1330) {
        existsLunchTime = true;
      }
    }

    for (let slot = 0; slot < timeSlots[date].length - 1; slot++) {
      if (timeSlots[date][slot].endTime >= 1100 &&
          timeSlots[date][slot].endTime <= 1330) {
        if (getMinuteDifference(timeSlots[date][slot].endTime, timeSlots[date][slot + 1].startTime) >= 30) {
          existsLunchTime = true;
        }
      } else if (timeSlots[date][slot].endTime < 1100) {
        if (timeSlots[date][slot + 1].startTime >= 1130) {
          existsLunchTime = true;
        }
      }
    }

    if (!existsLunchTime) {
      lunchWarning.weight++;
      lunchWarning.extraInfo.push([blankPseudoTimeSlot]);
      lunchWarning.isCritical = true;
    } else {
      lunchWarning.extraInfo.push([]);
    }
  }

  return lunchWarning;
}

const getDistanceWarning = (timeSlots: PseudoTimeSlot[][]): Warning => {
  let distanceWarning: Warning = { warningType: "time", weight: 0, extraInfo: [], isCritical: false };
  for (let date = 0; date <= 5; date++) {

    for (let slot = 0; slot < timeSlots[date].length - 1; slot++) {
      if (getMinuteDifference(
          timeSlots[date][slot].endTime, timeSlots[date][slot + 1].startTime) <= 20) {
        let bdngFrom: number = parseInt(timeSlots[date][slot].lectureRoom.split("-")[0]);
        let bdngTo: number = parseInt(timeSlots[date][slot + 1].lectureRoom.split("-")[0]);

        if (getDistance(bdngFrom, bdngTo) / getMinuteDifference(
          timeSlots[date][slot].endTime, timeSlots[date][slot + 1].startTime) > DISTANCE_LIMIT) {
          if (!distanceWarning.extraInfo.includes([timeSlots[date][slot], timeSlots[date][slot + 1]])) {
            distanceWarning.extraInfo.push([timeSlots[date][slot], timeSlots[date][slot + 1]]);
            distanceWarning.weight += 2;
          }
          // if (!distanceWarning.extraInfo.includes(timeSlots[date][slot + 1])) {
          //   distanceWarning.extraInfo.push(timeSlots[date][slot + 1]);
          //   distanceWarning.weight++;
          // }
        } 
      }
    }
  }
  if (distanceWarning.weight > 0) {
    distanceWarning.isCritical = true;
  }
  return distanceWarning;
}

const getLectureCountWarning = (timeSlots: PseudoTimeSlot[][]): Warning => {
  let lectureCountWarning: Warning = { warningType: "count", weight: 0, extraInfo: [], isCritical: false };
  const lectureMinutes: number[] = [];
  for (let date = 0; date <= 5; date++) {
    let minutes = 0;
    for (const ts of timeSlots[date]) {
      minutes += getMinuteDifference(ts.startTime, ts.endTime);
    }

    if (minutes > 0) {
      lectureMinutes.push(minutes);
    }
  }
  lectureCountWarning.weight = getStandardDeviation(lectureMinutes);

  if (lectureCountWarning.weight > 90) {
    lectureCountWarning.isCritical = true;
  }

  return lectureCountWarning;
}

const getEmptyDateWarning = (timeSlots: PseudoTimeSlot[][]): Warning => {
  let emptyDateWarning: Warning = { warningType: "empty", weight: 0, extraInfo: [], isCritical: false };
  for (let date = 0; date < 5; date++) {
    if (timeSlots[date].length === 0) {
      emptyDateWarning.weight++;
      emptyDateWarning.extraInfo.push([blankPseudoTimeSlot]);
    } else {
      emptyDateWarning.extraInfo.push([]);
    }
  }
  if (emptyDateWarning.weight > 0) {
    emptyDateWarning.isCritical = true;
  }
  return emptyDateWarning;
}

const getMorningWarning = (timeSlots: PseudoTimeSlot[][]): Warning => {
  let morningWarning: Warning = { warningType: "morning", weight: 0, extraInfo: [], isCritical: false };
  for (let date = 0; date <= 5; date++) {
    if (timeSlots[date].length > 0) {
      if (getMinuteDifference(900, timeSlots[date][0].startTime) <= 180) {
        morningWarning.weight += (180 - getMinuteDifference(900, timeSlots[date][0].startTime)) / 60;
        if (getMinuteDifference(900, timeSlots[date][0].startTime) <= 45) {
          morningWarning.isCritical = true;
          morningWarning.extraInfo.push([blankPseudoTimeSlot]);
        } else {
          morningWarning.extraInfo.push([]);
        }
      } else {
        morningWarning.extraInfo.push([]);
      }
    } else {
      morningWarning.extraInfo.push([]);
    }
  }
  return morningWarning;
}

const getSpaceWarning = (timeSlots: PseudoTimeSlot[][]): Warning => {
  let spaceWarning: Warning = { warningType: "space", weight: 0, extraInfo: [], isCritical: false };
  for (let date = 0; date <= 5; date++) {
    let consecutiveFlag: boolean = false;
    let count = 0;
    for (let slot = 0; slot < timeSlots[date].length - 1; slot++) {
      if (getMinuteDifference(timeSlots[date][slot].endTime, timeSlots[date][slot + 1].startTime) <= 30) {
        spaceWarning.extraInfo.push([timeSlots[date][slot], timeSlots[date][slot + 1]]);
        if (!consecutiveFlag) {
          consecutiveFlag = true;
        }
        count++;
      } else {
        consecutiveFlag = false;
        if (count > 1) {
          spaceWarning.weight += count;
        }
        count = 0;
      }
    }
    if (consecutiveFlag) {
      if (count > 1) {
        spaceWarning.weight += count;
      }
    }
  }
  if (spaceWarning.weight > 0) {
    spaceWarning.isCritical = true;
  }
  return spaceWarning;
}

export const getWarnings = (sc: Scenario): Warning[] => {
  let timeSlots: PseudoTimeSlot[] = [];
  let daysTimeSlots: PseudoTimeSlot[][] = [[], [], [], [], [], []];

  for (const lect of sc.lectures) {
    timeSlots.push(...toPseudoTimeSlots(lect));
  }
  
  for (const ts of timeSlots) {
    daysTimeSlots[ts.date].push(ts);
  }

  for (let date = 0; date <= 5; date++) {
    daysTimeSlots[date].sort((a, b) => a.startTime - b.startTime);
  }

  return [
    getDistanceWarning(daysTimeSlots),
    getLectureCountWarning(daysTimeSlots),
    getLunchWarnings(daysTimeSlots),
    getSpaceWarning(daysTimeSlots),
    getEmptyDateWarning(daysTimeSlots),
    getMorningWarning(daysTimeSlots),
  ].filter(warning => warning.extraInfo.length > 0 || warning.weight > 0);
}
