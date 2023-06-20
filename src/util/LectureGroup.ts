import { Lecture } from "./Lecture";
import { getSubjectFromLecture } from "./LectureUtil";
import { Subject } from "./Subject";

export class LectureGroup {
  subject: Subject;
  lectures: Lecture[];
  timeSharingLectures: Map<string, Lecture[]>;
  mustInclude: boolean;

  constructor(lectures: Lecture[], mustInclude: boolean) {
    this.lectures = lectures;
    this.timeSharingLectures = new Map<string, Lecture[]>;
    this.mustInclude = mustInclude;

    if (lectures.length > 0) {
      this.subject = getSubjectFromLecture(lectures[0]);
    } else {
      this.subject = {
        subjectID: "NULL",
        subjectTitle: "NULL"
      };
    }


    this.updateTimeSharingLectures();
  }

  updateTimeSharingLectures() {
    this.timeSharingLectures = new Map<string, Lecture[]>;
    for (const lect of this.lectures) {
      if (!this.timeSharingLectures.has(lect.time)) {
        this.timeSharingLectures.set(lect.time, []);
      }
      this.timeSharingLectures.get(lect.time)?.push(lect);
    }
  }

}