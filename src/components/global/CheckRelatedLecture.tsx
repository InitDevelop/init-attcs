import { lecture } from "../../interfaces/Lecture";

export const CheckRelatedLecture = (input: string, lecture: lecture) => {
  let splitInput = input.split(" ");
  
  for (const str of splitInput) {
    if (str.includes("학년")) {
      if (lecture.grade !== str) {
        return false;
      }
      input = input.replace(str, "");
    } else if (
        str === "교양" || 
        str === "전필" || 
        str === "전선" ||
        str === "일선") {
      if (lecture.lect_type !== str) {
        return false;
      }
      input = input.replace(str, "");
    } else if (str.includes("요일") ||
        str === "월" || str === "화" || str === "수" || str === "목" || str === "금") {
      if (!lecture.time.includes(str.substring(0, 1))) {
        return false;
      }
      input = input.replace(str, "");
    } else if (str === "한국어" || str === "영어") {
      if (lecture.lang !== str) {
        return false;
      }
      input = input.replace(str, "");
    }
  }

  if (isRelatedName(input, lecture.prof + lecture.subj_name + lecture.prof)) {
    return true;
  } else {
    splitInput = input.split(" ").filter(s => s !== "");
    let str = splitInput[splitInput.length - 1];
    if (lecture.extra_info.replace(" ", "").includes(str) || isRelatedName(str, lecture.lect_col + lecture.lect_dept)) {
      input = input.replace(str, "");
      if (isRelatedName(input, lecture.prof + lecture.subj_name + lecture.prof)) {
        return true;
      }
    }
  }  
  return false;
}

export const isRelatedName = (abbrev: string, full: string) => {
  abbrev = abbrev.replace(/\s+/g, '');
  full = full.replace(/\s+/g, '');
  let ret = true;
  for (let i = 0; i < abbrev.length; i++) {
    let sub = abbrev.substring(i, i + 1);
    if (full.includes(sub)) {
      full = full.substring(full.indexOf(sub));
    } else {
      ret = false;
      break;
    }
  }
  return ret;
}