import { Lecture } from "./Lecture";
import { TimeSlot } from "./TimeSlot";

export interface NumberedTimeSlot {
  index: number;
  order: number;
  timeSlot: TimeSlot;
  lecture: Lecture;
}

export const getNumberedTimeSlots = (lectures: Lecture[]): NumberedTimeSlot[] => {
  let returningGroup: NumberedTimeSlot[] = [];
  let count = 0;
  for (const l of lectures) {
    let smallCount = 0;
    for (const s of l.timeSlots) {
      returningGroup.push({
        index: count,
        order: smallCount,
        timeSlot: s,
        lecture: l
      });
      smallCount++;
    }
    count++;
  }
  return returningGroup;
}