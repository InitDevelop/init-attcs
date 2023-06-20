import { Lecture } from "../../util/Lecture";
import { LectureGroup } from "../../util/LectureGroup";
import { Scenario } from "../../util/Scenario";
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

const CreationWorker = (originalLectureGroups: LectureGroup[], priorityValues: Dictionary<number>) => {
  
  // Pre-process lectureGroups so that
  // lectures which share the same time slots be categorized to the same scenario
  
  const lectureGroups: LectureGroup[] = [];
  const scenarioResults: Scenario[] = [];

  for (let i = 0; i < originalLectureGroups.length; i++) {
    originalLectureGroups[i].updateTimeSharingLectures();
    lectureGroups.push(originalLectureGroups[i]);
  }

  const priorities: number[] = [];
  const result: number[][] = [];
  const lengths: number[] = lectureGroups.map(lg => lg.timeSharingLectures.size);
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

    let scenario: Scenario = new Scenario();
    let pushResult: boolean = scenario.pushLectures()
      = getScenario(lectureGroups, r);

    if (currentProcessNum % 123 === 0) {
      postMessage({scenarios: [],
        finished: false,
        current: currentProcessNum,
        total: totalProcessCount,
        valid: validCount
      });
    }
    
    if (scResult.exitCode === 1) {
      continue;
    }

    scResult.scenario.warnings = getWarnings(scResult.scenario);

    if (scResult.scenario.warnings.filter(w => w.warningType === "empty").length === 0) {
      if (priorityValues["empty"] < 0.5 && priorityValues["empty"] > 0) {
        continue;
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
        if (Math.abs(priorityValues[warn.warningType]) < 0.5 && (sign > 0 ? warn.isCritical : !warn.isCritical)) {
          continue outerLoop;
        }
      }
      
      if (warn.warningType === "empty") {
        scResult.scenario.priority += sign * weight * (1 + 0.1 ^ Object.keys(priorityValues).length * warn.weight);
      } else {
        scResult.scenario.priority -= sign * weight * (1 + 0.1 ^ Object.keys(priorityValues).length * warn.weight);
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