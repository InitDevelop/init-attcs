import { lecture, lectureGroup, pseudoTimeSlot } from "../../interfaces/Lecture";
import { getScenario, getTimeSlots, scenario } from "../../interfaces/Scenario";
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

export function CreateScenarios(setScenarios: (param: scenario[]) => void, originalLectureGroups: lectureGroup[]) {
  setScenarios([]);

  // Pre-process lectureGroups so that
  // lectures which share the same time slots be categorized to the same scenario

  const lectureGroups: lectureGroup[] = [];
  const scenarioResults: scenario[] = [];
  
  for (let i = 0; i < originalLectureGroups.length; i++) {
    const timeShareLects: lecture[][] = Object.values(originalLectureGroups[i].lectures.reduce<{[key: string]: lecture[]}>(
      (result, currentValue) => {
        const propertyValue: string = currentValue.time;
        if (!result[propertyValue]) {
          result[propertyValue] = [];
        }
        result[propertyValue].push(currentValue);
        return result;
      }, {}));

    const representiveLect: lecture[] = timeShareLects.map(larr => larr[0]);
    lectureGroups.push({
      subj_id: originalLectureGroups[i].subj_id,
      lectures: representiveLect,
      timeShareLectures: timeShareLects,
      mustInclude: originalLectureGroups[i].mustInclude
    });
  }

  // Creation of the scenarios

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

  const priorities: number[] = [];

  for (const r of result) {
    let scResult = getScenario(lectureGroups, r);
    scResult.scenario.warnings = getWarnings(scResult.scenario);

    for (const warn of scResult.scenario.warnings) {
      switch (warn.warningType) {
        case "time":
          scResult.scenario.priority -= warn.extraInfo.length;
          break;
        case "lunch":
          break;
        case "empty":
          scResult.scenario.priority += 3;
          break;
      }
    }

    if (scResult.scenario.lectures.length === lectureGroups.length) {
      scenarioResults.push(scResult.scenario);
      if (!priorities.includes(scResult.scenario.priority)) {
        priorities.push(scResult.scenario.priority);
      }
    } else {
      if (scResult.leftovers.filter(id => {
        return (lectureGroups[lectureGroups.findIndex(lg => lg.subj_id === id)].mustInclude)
      }).length === 0) {
        scenarioResults.push(scResult.scenario);
        if (!priorities.includes(scResult.scenario.priority)) {
          priorities.push(scResult.scenario.priority);
        }
      }
    }
  }

  let sorted = priorities.sort((a, b) => (b - a));
  
  for (let i = 0; i < scenarioResults.length; i++) {
    scenarioResults[i].priority = sorted.indexOf(scenarioResults[i].priority) + 1;
  }

  setScenarios(scenarioResults.sort((a, b) => (a.priority - b.priority)));
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
    }
  }

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < daysTimeSlots[i].length - 1; j++) {
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
  }

  return [emptyDateWarning, distanceWarning].filter(warning => warning.extraInfo.length > 0);
}