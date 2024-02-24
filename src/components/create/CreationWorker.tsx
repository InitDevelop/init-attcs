import { LectureGroup } from "../../types/LectureGroup";
import { Scenario, isValidCombination, timeSlotsToScenario } from "../../types/Scenario";
import { PseudoTimeSlot, toPseudoTimeSlots } from "../../types/TimeSlot";
import { Dictionary } from "../../util/Util";
import { getWarnings } from "./CreateScenarios";

let totalProcessCount = 0;
let currentProcessNum = 0;
let validCount = 0;

type getType = {
  originalLectureGroups: LectureGroup[],
  priorityValues: Dictionary<number>,
}

onmessage = function(message) {
  const params: getType = message.data;
  CreationWorker(params.originalLectureGroups, params.priorityValues);
}

const CreationWorker = (lectureGroups: LectureGroup[], priorityValues: Dictionary<number>) => {
  
  // Pre-process lectureGroups so that
  // lectures which share the same time slots be categorized to the same scenario
  const scenarioResults: Scenario[] = [];

  // This timeSlotMap is a data structure that groups timeslots
  // 1st dimension: arranged by subject
  // 2nd dimension: arranged by time
  // 3rd dimension: arranged by lecture
  // 4th dimension: arranged by time slot order
  const timeSlotArr: PseudoTimeSlot[][][][] = [];

  const priorities: number[] = [];

  for (let i = 0; i < lectureGroups.length; i++) {
    timeSlotArr.push([]);
  }
  
  const byPass: number[][] = [];

  for (let i = 0; i < lectureGroups.length; i++) {
    for (let j = 0; j < lectureGroups[i].lectures.length; j++) {
      if (lectureGroups[i].lectures[j].time === "") {
        byPass.push([i, j]);
        continue;
      }
      const timeMatchIndex = timeSlotArr[i].findIndex(
        (slot2dArray) => {
          if (slot2dArray.length > 0) {
            return slot2dArray[0][0].time === lectureGroups[i].lectures[j].time;
          } else {
            return false;
          }
        }
      );
      if (timeMatchIndex === -1) {
        timeSlotArr[i].push([toPseudoTimeSlots(lectureGroups[i].lectures[j])]);
      } else {
        timeSlotArr[i][timeMatchIndex].push(toPseudoTimeSlots(lectureGroups[i].lectures[j]));
      }
    }
  }

  const indexes: number[][] = [];
  const lengths: number[] = timeSlotArr.map(tsarr => tsarr.length);
  const totalCombinations: number = lengths.reduce((a, b) => a * b, 1);

  totalProcessCount = totalCombinations;
  for (let i = 0; i < totalCombinations; i++) {
    const combination = [];
    let divisor = 1;
    for (let j = 0; j < lectureGroups.length; j++) {
      const index = Math.floor(i / divisor) % lengths[j];
      combination.push(index);
      divisor *= lengths[j];
    }
    indexes.push(combination);
  }

  outerLoop:
  for (const index of indexes) {
    for (const t of byPass) {
      if (index[t[0]] === t[1]) {
        continue outerLoop;
      }
    }
    currentProcessNum++;
    const timeValues: number[][] = [];
    for (let i = 0; i < timeSlotArr.length; i++) {
      for (let j = 0; j < timeSlotArr[i][index[i]][0].length; j++) {
        timeValues.push([timeSlotArr[i][index[i]][0][j].date,
          timeSlotArr[i][index[i]][0][j].startTime, timeSlotArr[i][index[i]][0][j].endTime]);
      }
    }
    if (!isValidCombination(timeValues)) {
      continue;
    }

    // If there are no intersection found (valid combination)

    const timeSlotsToPass: PseudoTimeSlot[][][] = [];
    for (let i = 0; i < timeSlotArr.length; i++) {
      timeSlotsToPass.push(timeSlotArr[i][index[i]]);
    }
    let tempScenario: Scenario = timeSlotsToScenario(timeSlotsToPass);
    tempScenario.warnings = getWarnings(tempScenario);

    if (tempScenario.warnings.filter(w => w.warningType === "empty").length === 0) {
      if (priorityValues["empty"] < 0.5 && priorityValues["empty"] > 0) {
        continue;
      }
    }

    for (const warn of tempScenario.warnings) {
      let weight: number = Math.pow(10, Object.keys(priorityValues).length - Math.abs(priorityValues[warn.warningType]) - 1);
      let sign: number = priorityValues[warn.warningType] > 0 ? 1 : -1;

      if (warn.warningType === "empty") {
        if (priorityValues["empty"] < 0 && priorityValues["empty"] > -0.5) {
          continue outerLoop;
        }
      } else {
        if (Math.abs(priorityValues[warn.warningType]) < 0.5 && (sign > 0 ? warn.isCritical : !warn.isCritical)) {
          continue outerLoop;
        }
      }
      
      if (warn.warningType === "empty") {
        tempScenario.priority += sign * weight * (1 + 0.1 ^ Object.keys(priorityValues).length * warn.weight);
      } else {
        tempScenario.priority -= sign * weight * (1 + 0.1 ^ Object.keys(priorityValues).length * warn.weight);
      }
    }

    scenarioResults.push(tempScenario);
    if (!priorities.includes(tempScenario.priority)) {
      priorities.push(tempScenario.priority);
    }

    validCount++;
    postMessage({scenarios: [],
      finished: false,
      current: currentProcessNum,
      total: totalProcessCount,
      valid: validCount
    });

  }

  let sorted = priorities.sort((a, b) => (b - a));
  
  for (let i = 0; i < scenarioResults.length; i++) {
    scenarioResults[i].priority = sorted.indexOf(scenarioResults[i].priority) + 1;
  }

  postMessage({scenarios: scenarioResults.sort((a, b) => (a.priority - b.priority)),
    finished: true,
    current: currentProcessNum,
    total: totalProcessCount,
    valid: validCount
  });
}