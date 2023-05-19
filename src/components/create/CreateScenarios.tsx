import { lectureGroup, pseudoTimeSlot } from "../../interfaces/Lecture";
import { getTimeSlots, scenario } from "../../interfaces/Scenario";
import { getDistance, warning } from "../../interfaces/Util";

const DISTANCE_LIMIT: number = 1.53;

export function printScenarios(lectureGroups: lectureGroup[]) {
  const result: number[][] = [];
  const lengths: number[] = lectureGroups.map(lg => lg.lectures.length);
  const totalCombinations: number = lengths.reduce((a, b) => a * b, 1);

  for (let i = 0; i < totalCombinations; i++) {
    const combination = [];
    let divisor = 1;
    for (let j = 0; j < lectureGroups.length; j++) {
      const index = Math.floor(i / divisor) % lengths[j];
      combination.push(index);
      divisor *= lengths[j];
    }
    result.push(combination);
  }

  return ({});
}

function getMinuteDifference(from: number, to: number) {
  let startMin: number = Math.floor(from / 100) * 60 + from % 100;
  let endMin: number   = Math.floor(to / 100) * 60 + to % 100;

  return (endMin - startMin);
}


export function getWarnings(sc: scenario): warning[] {
  let distanceWarning: warning = {
    warningType: "time",
    extraInfo: []
  };
  let emptyDateWarning: warning = {
    warningType: "empty",
    extraInfo: []
  };
  let lectureCountWarning: warning = {
    warningType: "count",
    extraInfo: []
  };
  let morningWarning: warning = {
    warningType: "morning",
    extraInfo: []
  };
  let lunchWarning: warning = {
    warningType: "lunch",
    extraInfo: []
  };
  let spaceWarning: warning = {
    warningType: "space",
    extraInfo: []
  };

  let timeSlots: pseudoTimeSlot[] = [];
  let daysTimeSlots: pseudoTimeSlot[][] = [[], [], [], [], []];

  for (const lect of sc.lectures) {
    timeSlots.push(...getTimeSlots(lect));
  }
  
  for (const ts of timeSlots) {
    daysTimeSlots[ts.date].push(ts);
  }

  for (let i = 0; i < 5; i++) {
    daysTimeSlots[i].sort((a, b) => a.startTime - b.startTime);
    if (daysTimeSlots[i].length === 0) {
      emptyDateWarning.extraInfo.push(i.toString());
    } else {
      if (getMinuteDifference(900, daysTimeSlots[i][0].startTime) <= 40) {
        morningWarning.extraInfo.push(i.toString());
      }
    }
  }

  for (let i = 0; i < 5; i++) {
    let existsLunchTime = false;
    if (daysTimeSlots[i].length === 0) {
      existsLunchTime = true;
    } else if (daysTimeSlots[i].length === 1) {
      if (daysTimeSlots[i][0].endTime <= 1400 || daysTimeSlots[i][0].startTime >= 1200) {
        existsLunchTime = true;
      }
    } else {
      if (daysTimeSlots[i][0].startTime >= 1200 || daysTimeSlots[i][daysTimeSlots[i].length - 1].endTime <= 1400) {
        existsLunchTime = true;
      }
    }

    for (let j = 0; j < daysTimeSlots[i].length - 1; j++) {


      if (j === daysTimeSlots[i].length - 2) {
        if (daysTimeSlots[i][j].endTime <= 1400) {
          existsLunchTime = true;
        }
      }

      if (daysTimeSlots[i][j].endTime >= 1100 && daysTimeSlots[i][j].endTime <= 1400) {
        if (getMinuteDifference(daysTimeSlots[i][j].endTime, daysTimeSlots[i][j + 1].startTime) >= 30) {
          existsLunchTime = true;
        }
      } else if (daysTimeSlots[i][j].endTime > 1400) {

      
      } else if (daysTimeSlots[i][j].endTime < 1100) {
        if (daysTimeSlots[i][j + 1].startTime >= 1130) {
          existsLunchTime = true;
        }
      } else {

      }

      if (getMinuteDifference(daysTimeSlots[i][j].endTime, daysTimeSlots[i][j + 1].startTime) >= 180) {
        spaceWarning.extraInfo.push(i.toString());
      }

      if (getMinuteDifference(daysTimeSlots[i][j].endTime, daysTimeSlots[i][j + 1].startTime) <= 20) {
        let bdngFrom: number = parseInt(daysTimeSlots[i][j].room.split("-")[0]);
        let bdngTo: number = parseInt(daysTimeSlots[i][j + 1].room.split("-")[0]);

        if (getDistance(bdngFrom, bdngTo) / getMinuteDifference(daysTimeSlots[i][j].endTime, daysTimeSlots[i][j + 1].startTime) > DISTANCE_LIMIT) {
          if (!distanceWarning.extraInfo.includes(daysTimeSlots[i][j].lecture.subj_name)) {
            distanceWarning.extraInfo.push(daysTimeSlots[i][j].lecture.subj_name);
          }
          if (!distanceWarning.extraInfo.includes(daysTimeSlots[i][j + 1].lecture.subj_name)) {
            distanceWarning.extraInfo.push(daysTimeSlots[i][j + 1].lecture.subj_name);
          }
        } 
      }
    }

    if (daysTimeSlots[i].length > 3) {
      lectureCountWarning.extraInfo.push(i.toString());
    }

    if (!existsLunchTime) {
      lunchWarning.extraInfo.push(i.toString());
    }
  }

  return [distanceWarning, lectureCountWarning, lunchWarning, spaceWarning, emptyDateWarning, morningWarning].filter(warning => warning.extraInfo.length > 0);
}