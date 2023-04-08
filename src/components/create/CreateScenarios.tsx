import { lecture, lectureGroup } from "../../interfaces/Lecture";
import { getScenario, scenario } from "../../interfaces/Scenario";

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
      timeShareLectures: timeShareLects
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

  for (const r of result) {
    let scResult: scenario = getScenario(lectureGroups, r);
    if (scResult.lectures.length === lectureGroups.length) {
      scenarioResults.push(scResult);
    }
  }

  setScenarios(scenarioResults);
}