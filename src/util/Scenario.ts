import { Lecture } from "./Lecture";
import { LectureGroup } from "./LectureGroup";
import { getSubjectFromLecture } from "./LectureUtil";
import { Subject } from "./Subject";
import { TimeSlot } from "./TimeSlot";
import { Warning } from "./Warning";

export class Scenario {
  lectures: Lecture[];
  timeSharingLectures: Map<Subject, Lecture[]>;
  warnings: Warning[];
  priority: number;

  constructor() {
    this.lectures = [];
    this.timeSharingLectures = new Map<Subject, Lecture[]>;
    this.warnings = [];
    this.priority = 0;
  }
  
  pushLectures(timeSharingLectures: Lecture[]): boolean {
    if (timeSharingLectures.length > 0) {
      if (this.canAddLecture(timeSharingLectures[0])) {
        let subject = getSubjectFromLecture(timeSharingLectures[0]);
        if (!this.timeSharingLectures.has(subject)) {
          this.timeSharingLectures.set(subject, []);
        }
        this.timeSharingLectures.get(subject)?.push(...timeSharingLectures);
        this.lectures.push(timeSharingLectures[0]);
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  canAddTimeSlot(timeSlot: TimeSlot) {
    for (const lect of this.lectures) {
      for (const ts of lect.timeSlots) {
        if (ts.intersectsWith(timeSlot)) {
          return false;
        }
      }
    }
    return true;
  }

  canAddLecture(lecture: Lecture) {
    for (const ts of lecture.timeSlots) {
      if (!this.canAddTimeSlot(ts)) {
        return false;
      }
    }
    return true;
  }
}

