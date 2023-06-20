import { TimeSlot } from "./TimeSlot";

export interface Lecture {
  id: string;
  classification: string;
  college: string;
  department: string;
  graduate: string;
  year: number;
  subjectID: string;
  lectureID: string;
  subjectTitle: string;
  subjectSubtitle: string;
  credit: number;
  creditLecture: number;
  creditLab: number;
  time: string;
  lecturer: string;
  quota: number;
  freshmanQuota: number;
  extraInfo: string;
  language: string;

  timeSlots: TimeSlot[];
  lectureForms: string[];
  lectureRooms: string[];
}

export const blankLecture: Lecture = {
  id: "",
  classification: "",
  college: "",
  department: "",
  graduate: "",
  year: 0,
  subjectID: "",
  lectureID: "",
  subjectTitle: "",
  subjectSubtitle: "",
  credit: 0,
  creditLecture: 0,
  creditLab: 0,
  time: "",
  lecturer: "",
  quota: 0,
  freshmanQuota: 0,
  extraInfo: "",
  language: "",
  timeSlots: [],
  lectureForms: [],
  lectureRooms: []
}