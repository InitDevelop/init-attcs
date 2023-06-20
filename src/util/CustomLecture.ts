import { Lecture } from "./Lecture";

export default interface CustomLecture {
  id: number;
  lecture: Lecture;
  editable: boolean;
}