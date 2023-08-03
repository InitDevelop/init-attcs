import buildingData from "../db/building_data.json"
import { Lecture, PseudoTimeSlot } from "./Lecture";

export interface xyTuple {
  x: number,
  y: number
}

export type Dictionary<T> = { [key: string]: T };

export interface StringNumberPair {
  key: string,
  value: number
}

export interface Warning {
  warningType: 'time' | 'lunch' | 'empty' | 'count' | 'morning' | 'space';
  weight: number;
  extraInfo: PseudoTimeSlot[][];
  isCritical: boolean;
}

export const dateValueToDate = (value: number): string => {
  switch (value) {
    case 0:
      return "월요일";
    case 1:
      return "화요일";
    case 2:
      return "수요일";
    case 3:
      return "목요일";
    case 4:
      return "금요일";
    case 5:
      return "토요일";
    default:
      return "";
  }
}

export const getDateValue = (dateChar: string): number => {
  let date = 5;
  switch (dateChar) {
    case "월":
      date = 0;
      break;
    case "화":
      date = 1;
      break;
    case "수":
      date = 2;
      break;
    case "목":
      date = 3;
      break;
    case "금":
      date = 4;
      break;
  }
  return date;
}

export const getTimeNumber = (hour: number, min: number) => {
  return 100 * hour + min;
}

export const getHourFromNumber = (time: number) => {
  return Math.floor(time / 100);
}

export const getMinFromNumber = (time: number) => {
  return time % 100;
}

export const isSameSubject = (lecture1: Lecture, lecture2: Lecture) => {
  return lecture1.subjectID === lecture2.subjectID;
}

export const isSameLecture = (lecture1: Lecture, lecture2: Lecture) => {
  return lecture1.subjectID === lecture2.subjectID && lecture1.lectureNumber === lecture2.lectureNumber;
}

export const getRange = (start: number, end: number, step: number = 1): number[] => {
  return Array.from({ length: Math.ceil((end - start) / step) }, (_, i) => start + i * step);
}

export const getDistance = (from: number, to: number) => {
  let fromRow: number = 0;
  let fromCol: number = 0;
  let toRow: number = 0;
  let toCol: number = 0;

  for (const obj of buildingData.buildings) {
    if (obj.building_num === from) {
      fromRow = obj.row;
      fromCol = obj.column;
    }
    if (obj.building_num === to) {
      toRow = obj.row;
      toCol = obj.column;
    }
  }
  return (Math.sqrt(Math.pow(fromRow - toRow, 2) + Math.pow(fromCol - toCol, 2)));
}