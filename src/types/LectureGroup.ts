import { Lecture } from "./Lecture";

export interface LectureGroup {
  subjectID: string;
  lectures: Lecture[];
  timeShareLectures: Lecture[][];
  //mustInclude: boolean;
}