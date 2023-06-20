import { Lecture } from "./Lecture";
import LectureRaw from "./LectureRaw";
import { Subject } from "./Subject";
import { TimeSlot } from "./TimeSlot";

export const convertToLecture = (rawLecture: LectureRaw): Lecture => {
  let quotas = rawLecture.quota.replace("(", "").replace(")", "").split(" ");

  let returningLecture: Lecture = {
    id: rawLecture.id,
    classification: rawLecture.classification,
    college: rawLecture.college,
    department: rawLecture.department,
    graduate: rawLecture.graduate,
    year: parseInt(rawLecture.year),
    subjectID: rawLecture.subjectID,
    lectureID: rawLecture.lectureID,
    subjectTitle: rawLecture.subjectTitle,
    subjectSubtitle: rawLecture.subjectSubtitle,
    credit: parseInt(rawLecture.credit),
    creditLecture: parseInt(rawLecture.creditLecture),
    creditLab: parseInt(rawLecture.creditLab),
    time: rawLecture.time,
    lecturer: rawLecture.lecturer,
    quota: parseInt(quotas[0]),
    freshmanQuota: parseInt(quotas[1]),
    extraInfo: rawLecture.extraInfo,
    language: rawLecture.language,
  
    timeSlots: TimeSlot.toTimeSlots(rawLecture.time),
    lectureForms: rawLecture.lectureForm.split("/"),
    lectureRooms: rawLecture.lectureRoom.split("/"),
  };

  return returningLecture;
}

export const isSameLecture = (lecture1: Lecture, lecture2: Lecture): boolean => {
  return (lecture1.subjectID === lecture2.subjectID) && (lecture1.lectureID === lecture2.lectureID);
}

export const isSameSubject = (lecture1: Lecture, lecture2: Lecture): boolean => {
  return (lecture1.subjectID === lecture2.subjectID);
}

export const isLectureOfSubject = (lecture: Lecture, subject: Subject): boolean => {
  return (lecture.subjectID === subject.subjectID);
}

export const getSubjectFromLecture = (lecture: Lecture): Subject => {
  return {
    subjectID: lecture.subjectID,
    subjectTitle: lecture.subjectTitle
  };
}

export const getTopPosition = (timeSlot: TimeSlot) => {
  return `calc((100%)*${((timeSlot.startTime.getHour() - 9) + timeSlot.startTime.getMinutes() / 60)}/13)`;
}

export const getLeftPosition = (timeSlot: TimeSlot) => {
  return `${7.5 + timeSlot.getDate().getValue() * 18.5}%`;
}

export const getHeight = (timeSlot: TimeSlot) => {
  return `calc((100%)*${((timeSlot.endTime.getHour() - timeSlot.startTime.getHour()) 
    + (timeSlot.endTime.getMinutes() - timeSlot.startTime.getMinutes()) / 60)}/13)`;
}