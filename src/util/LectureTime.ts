import { LectureDate } from "./LectureDate";

export class LectureTime {
  date: LectureDate;
  hour: number;
  minutes: number;

  constructor(hour: number, minutes: number, date: number) {
    this.hour = hour;
    this.minutes = minutes;
    this.date = new LectureDate(date);
  }

  getHour() {
    return this.hour;
  }

  getDateNumber() {
    return this.date.getValue();
  }

  getDateString() {
    return this.date.toString();
  }

  getMinutes() {
    return this.minutes;
  }

  toString() {
    let strHour = (100 + this.hour).toString().substring(1);
    let strMin = (100 + this.minutes).toString().substring(1);
    return strHour + ":" + strMin;
  }

  toNumber() {
    return this.hour * 100 + this.minutes;
  }

  static getMinuteDifference(from: LectureTime, to: LectureTime) {
    return to.toNumber() - from.toNumber();
  }

  isAfter(other: LectureTime) {
    return (
      this.toNumber() > other.toNumber()
      && this.getDateNumber() > other.getDateNumber());
  }

  isBefore(other: LectureTime) {
    return (
      this.toNumber() < other.toNumber()
      && this.getDateNumber() < other.getDateNumber());
  }

  equals(other: LectureTime) {
    return (this.toNumber() === other.toNumber()
      && this.date.getValue() === other.date.getValue());
  }

}