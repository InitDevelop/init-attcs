import { lecture, lectureGroup } from "../../interfaces/Lecture";
import { getScenario, scenario } from "../../interfaces/Scenario";
import { Dictionary } from "../../interfaces/Util";
import { getWarnings } from "./CreateScenarios";

let totalProcessCount = 0;
let currentProcessNum = 0;
let validCount = 0;

function CreationWorker(originalLectureGroups: lectureGroup[], priorityValues: Dictionary<number>) {

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

  const priorities: number[] = [];
  const result: number[][] = [];
  const lengths: number[] = lectureGroups.map(lg => lg.timeShareLectures.length);
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
    result.push(combination);
  }

  outerLoop:
  for (const r of result) {
    currentProcessNum++;
    
    let scResult = getScenario(lectureGroups, r);

    if (currentProcessNum % 123 === 0) {
      postMessage({scenarios: [],
        finished: false,
        current: currentProcessNum,
        total: totalProcessCount,
        valid: validCount
      });
    }
    
    if (scResult.exitCode === 1) {
      continue outerLoop;
    }

    scResult.scenario.warnings = getWarnings(scResult.scenario);

    if (scResult.scenario.warnings.filter(w => w.warningType === "empty").length === 0) {
      if (priorityValues["empty"] < 0.5 && priorityValues["empty"] > 0) {
        continue outerLoop;
      }
    }

    for (const warn of scResult.scenario.warnings) {
      let weight: number = Math.pow(10, Object.keys(priorityValues).length - Math.abs(priorityValues[warn.warningType]) - 1);
      let sign: number = priorityValues[warn.warningType] > 0 ? 1 : -1;

      if (warn.warningType === "empty") {
        if (priorityValues["empty"] < 0 && priorityValues["empty"] > -0.5) {
          continue outerLoop;
        }
      } else {
        if (Math.abs(priorityValues[warn.warningType]) < 0.5) {
          continue outerLoop;
        }
      }
      
      if (warn.warningType === "empty") {
        scResult.scenario.priority += sign * weight * (1 + 0.01 * warn.extraInfo.length);
      } else {
        scResult.scenario.priority -= sign * weight * (1 + 0.01 * warn.extraInfo.length);
      }
    }

    scenarioResults.push(scResult.scenario);
    if (!priorities.includes(scResult.scenario.priority)) {
      priorities.push(scResult.scenario.priority);
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

type getType = {
  originalLectureGroups: lectureGroup[],
  priorityValues: Dictionary<number>,
}

// self.addEventListener('message', (event) => {
//   // You can access the message data using `event.data`
//   const params: getType = event.data;

//   // Perform any necessary actions based on the received message
  
//   // Call the worker function
//   CreationWorker(params.originalLectureGroups, params.priorityValues);
// });

onmessage = function(message) {
  // You can access the message data using `event.data`
  const params: getType = message.data;

  // Perform any necessary actions based on the received message
  
  // Call the worker function
  CreationWorker(params.originalLectureGroups, params.priorityValues);
}