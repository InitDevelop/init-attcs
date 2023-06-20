import { LectureDate } from "./LectureDate";
import { LectureTime } from "./LectureTime";

export class TimeSlot {
  startTime: LectureTime;
  endTime: LectureTime;

  constructor(startTime: LectureTime, endTime: LectureTime) {
    this.startTime = startTime;
    this.endTime = endTime;
  }

  getStartTime() {
    return this.startTime;
  }

  getEndTime() {
    return this.endTime;
  }

  getTimeInterval() {
    return LectureTime.getMinuteDifference(this.startTime, this.endTime);
  }

  getDate() {
    return this.startTime.date;
  }

  static toTimeSlots(timeString: string): TimeSlot[] {
    let returningSlots: TimeSlot[] = [];
    
    let timeStrings: string[] = timeString.split("/");
    for (const ts of timeStrings) {
      let date: number = LectureDate.stringToNumber(ts.substring(0, 1));
      let startHour: number = parseInt(ts.substring(2, 4));
      let startMin: number = parseInt(ts.substring(5, 7));
      let endHour: number = parseInt(ts.substring(8, 10));
      let endMin: number = parseInt(ts.substring(11, 13));
      returningSlots.push(new TimeSlot(
        new LectureTime(startHour, startMin, date),
        new LectureTime(endHour, endMin, date)
      ));
    }
    return returningSlots;
  }

  intersectsWith(other: TimeSlot) {
    return this.startTime.isBefore(other.endTime) && this.endTime.isAfter(other.startTime);
  }

  static intersects(first: TimeSlot, second: TimeSlot) {
    return first.startTime.isBefore(second.endTime) && first.endTime.isAfter(second.startTime);
  }

}