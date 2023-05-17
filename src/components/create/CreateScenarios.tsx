import { lecture, lectureGroup, pseudoTimeSlot } from "../../interfaces/Lecture";
import { getScenario, getTimeSlots, scenario } from "../../interfaces/Scenario";
import { Dictionary, getDistance, warning } from "../../interfaces/Util";

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

// Algorithm Optimization
// v1 : 34.81s
// v2 : 26.95s

// export function CreateScenarios(setScenarios: (param: scenario[]) => void, originalLectureGroups: lectureGroup[], priorityValues: Dictionary<number>) {
//   setScenarios([]);

//   // Pre-process lectureGroups so that
//   // lectures which share the same time slots be categorized to the same scenario
  
//   const lectureGroups: lectureGroup[] = [];
//   const scenarioResults: scenario[] = [];
  
//   for (let i = 0; i < originalLectureGroups.length; i++) {
//     const timeShareLects: lecture[][] = Object.values(originalLectureGroups[i].lectures.reduce<{[key: string]: lecture[]}>(
//       (result, currentValue) => {
//         const propertyValue: string = currentValue.time;
//         if (!result[propertyValue]) {
//           result[propertyValue] = [];
//         }
//         result[propertyValue].push(currentValue);
//         return result;
//       }, {}));

//     const representiveLect: lecture[] = timeShareLects.map(larr => larr[0]);
//     lectureGroups.push({
//       subj_id: originalLectureGroups[i].subj_id,
//       lectures: representiveLect,
//       timeShareLectures: timeShareLects,
//       mustInclude: originalLectureGroups[i].mustInclude
//     });
//   }

//   // Creation of the scenarios

//   const priorities: number[] = [];
//   const result: number[][] = [];
//   const lengths: number[] = lectureGroups.map(lg => lg.timeShareLectures.length);
//   const totalCombinations: number = lengths.reduce((a, b) => a * b, 1);

//   for (let i = 0; i < totalCombinations; i++) {
//     const combination = [];
//     let divisor = 1;
//     for (let j = 0; j < lectureGroups.length; j++) {
//       const index = Math.floor(i / divisor) % lengths[j];
//       combination.push(index);
//       divisor *= lengths[j];
//     }
//     result.push(combination);
//   }

//   outerLoop:
//   for (const r of result) {
//     let scResult = getScenario(lectureGroups, r);

//     if (scResult.exitCode === 1) {
//       continue outerLoop;
//     }

//     scResult.scenario.warnings = getWarnings(scResult.scenario);

//     if (scResult.scenario.warnings.filter(w => w.warningType === "empty").length === 0) {
//       if (priorityValues["empty"] < 0.5 && priorityValues["empty"] > 0) {
//         continue outerLoop;
//       }
//     }

//     for (const warn of scResult.scenario.warnings) {
//       let weight: number = Math.pow(10, Object.keys(priorityValues).length - Math.abs(priorityValues[warn.warningType]) - 1);
//       let sign: number = priorityValues[warn.warningType] > 0 ? 1 : -1;

//       if (warn.warningType === "empty") {
//         if (priorityValues["empty"] < 0 && priorityValues["empty"] > -0.5) {
//           continue outerLoop;
//         }
//       } else {
//         if (Math.abs(priorityValues[warn.warningType]) < 0.5) {
//           continue outerLoop;
//         }
//       }
      
//       if (warn.warningType === "empty") {
//         scResult.scenario.priority += sign * (weight + 0.01 * warn.extraInfo.length);
//       } else {
//         scResult.scenario.priority -= sign * (weight + 0.01 * warn.extraInfo.length);
//       }
//     }

//     scenarioResults.push(scResult.scenario);
//     if (!priorities.includes(scResult.scenario.priority)) {
//       priorities.push(scResult.scenario.priority);
//     }
  
//   }

//   let sorted = priorities.sort((a, b) => (b - a));
  
//   for (let i = 0; i < scenarioResults.length; i++) {
//     scenarioResults[i].priority = sorted.indexOf(scenarioResults[i].priority) + 1;
//   }

//   setScenarios(scenarioResults.sort((a, b) => (a.priority - b.priority)));
// }

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