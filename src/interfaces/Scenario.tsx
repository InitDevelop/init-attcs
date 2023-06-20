/*
export const intersects = (sc: scenario, lect: lecture) => {
  let scenarioSlots: pseudoTimeSlot[] = sc.lectures.flatMap(lect => getTimeSlots(lect));
  let newTimeSlots: pseudoTimeSlot[] = getTimeSlots(lect);
  let timeSlotsThat: pseudoTimeSlot[][] = [[], [], [], [], []];
  
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

export function getScenario(lectureGroups: lectureGroup[], indexes: number[]) {
  let allowLeftover: boolean[] = lectureGroups.map(lg => !lg.mustInclude);
  let returnScenario: scenario = { lectures: [], shareTimeLectures: [], warnings: [], priority: 0 };
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
        leftOverIDs.push(lectureGroups[i].subj_id);
      } else {
        return { scenario: returnScenario, leftovers: [], exitCode: 1 };
      }
    }
  }
  return { scenario: returnScenario, leftovers: leftOverIDs, exitCode: exitCode };

}

/*

BACKUP

export function getScenario(lectureGroups: lectureGroup[], indexes: number[]) {
  let returnScenario: scenario = { lectures: [], shareTimeLectures: [], warnings: [], priority: 0 };
  let leftOverIDs: string[] = [];
  for (let i = 0; i < lectureGroups.length; i++) {
    if (!intersects(returnScenario, lectureGroups[i].lectures[indexes[i]])) {
      returnScenario.lectures.push(lectureGroups[i].lectures[indexes[i]]);
      returnScenario.shareTimeLectures.push(lectureGroups[i].timeShareLectures[indexes[i]]);
    } else {
      leftOverIDs.push(lectureGroups[i].subj_id);
    }
  }

  return {scenario: returnScenario, leftovers: leftOverIDs};
}


export function getScenario(lectureGroups: lectureGroup[], indexes: number[]) {
  let returnScenario: scenario = { lectures: [], shareTimeLectures: [], warnings: [], priority: 0 };
  let leftOverIDs: string[] = [];
  for (let i = 0; i < lectureGroups.length; i++) {
    if (!intersects(returnScenario, lectureGroups[i].timeShareLectures[indexes[i]][0])) {
      returnScenario.lectures.push(lectureGroups[i].timeShareLectures[indexes[i]][0]);
      returnScenario.shareTimeLectures.push(lectureGroups[i].timeShareLectures[indexes[i]]);
    } else {
      leftOverIDs.push(lectureGroups[i].subj_id);
    }
  }

  return { scenario: returnScenario, leftovers: leftOverIDs };
}

*/
