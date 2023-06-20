export class LectureDate {
  value: number;

  constructor(numberForm: number) {
    this.value = numberForm;
  }

  static stringToNumber(strForm: string) {
    switch (strForm) {
      case "월":  return 0;
      case "화":  return 1;
      case "수":  return 2;
      case "목":  return 3;
      case "금":  return 4;
      case "토":  return 5;
      default:   return -1;
    }
  }

  toString() {
    switch (this.value) {
      case 0: return "월";
      case 1: return "화";
      case 2: return "수";
      case 3: return "목";
      case 4: return "금";
      case 5: return "토";
      default: return "ERR";
    }
  }

  getValue() {
    return this.value;
  }
}