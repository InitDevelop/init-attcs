export type Lecture = {
  id: string;
  classification: string;
  college: string;
  department: string;
  program: string;
  year: string;
  subjectID: string;
  lectureNumber: string;
  subjectTitle: string;
  subjectSubtitle: string;
  credit: string;
  creditLecture: string;
  creditLab: string;
  time: string;
  lectureForm: string;
  lectureRoom: string;
  lecturer: string;
  quota: string;
  extraInfo: string;
  language: string;
}

export const blankLecture: Lecture = {
  id: "",
  classification: "",
  college: "",
  department: "",
  program: "",
  year: "",
  subjectID: "",
  lectureNumber: "",
  subjectTitle: "",
  subjectSubtitle: "",
  credit: "",
  creditLecture: "",
  creditLab: "",
  time: "",
  lectureForm: "",
  lectureRoom: "",
  lecturer: "",
  quota: "",
  extraInfo: "",
  language: ""
}