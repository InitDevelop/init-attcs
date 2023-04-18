export type lecture = {
  lect_type: string;
  lect_col: string;
  lect_dept: string;
  grad: string;
  grade: string;
  subj_id: string;
  lect_no: string;
  subj_name: string;
  subj_subname: string;
  credit: string;
  cred_lect: string;
  cred_lab: string;
  time: string;
  lect_form: string;
  lect_room: string;
  prof: string;
  student_count: string;
  extra_info: string;
  lang: string;
}

export const blankLecture: lecture = {
  lect_type: "",
  lect_col: "",
  lect_dept: "",
  grad: "",
  grade: "",
  subj_id: "",
  lect_no: "",
  subj_name: "",
  subj_subname: "",
  credit: "",
  cred_lect: "",
  cred_lab: "",
  time: "",
  lect_form: "",
  lect_room: "",
  prof: "",
  student_count: "",
  extra_info: "",
  lang: ""
}

export type timeSlot = {
  startTime: number;
  endTime: number;
  date: number;
  id: number;
  subjName: string;
  leftPos: string;
  topPos: string;
  height: string;
  room: string;
  lectures: lecture[];
}

export type pseudoTimeSlot = {
  startTime: number;
  endTime: number;
  date: number;
  lecture: lecture;
  room: string;
}

export type lectureGroup = {
  subj_id: string;
  lectures: lecture[];
  timeShareLectures: lecture[][];
  mustInclude: boolean;
}