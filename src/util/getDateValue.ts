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