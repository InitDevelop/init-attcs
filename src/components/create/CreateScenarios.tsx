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

  for (const r of result) {
    let sc: scenario = getScenario(lectureGroups, r);
  }

  return ({});
}

export function CreateScenarios(setScenarios: (param: scenario[]) => void, lectureGroups: lectureGroup[]) {
  setScenarios([]);
  const result: number[][] = [];
  const scenarioResults: scenario[] = [];
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