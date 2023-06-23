import { Lecture } from "../../util/Lecture";

export const accuracy = (abbrev: string, subj_name: string, prof: string) => {
  let prefix: number = 0;
  if (!isRelatedName(abbrev, subj_name)) {
    prefix -= 1000;
  }
  return prefix + (abbrev.replace(" ", "").length / subj_name.replace(" ", "").length);
};

export const CheckRelatedLecture = (input: string, lecture: Lecture) => {
  if (isRelatedName(input, lecture.subjectTitle)) {
    return true;
  } else if (isRelatedName(input, lecture.lecturer + lecture.subjectTitle + lecture.lecturer)) {
    return true;
  } else {
    let splitInput = input.split(" ");
    for (const str of splitInput) {
      if (str.includes("학년")) {
        if (lecture.year !== str) {
          return false;
        } else {
          input = input.replace(str, "");
        }
      } else if (
          str === "교양" || 
          str === "전필" || 
          str === "전선" ||
          str === "일선" ||
          str === "논문" ||
          str === "교직" ||
          str === "공통") {
        if (lecture.classification !== str) {
          return false;
        } else {
          input = input.replace(str, "");
        }
      } else if (str.includes("요일") ||
          str === "월" || str === "화" || str === "수" || str === "목" || str === "금") {
        if (!lecture.time.includes(str.substring(0, 1))) {
          return false;
        } else {
          input = input.replace(str, "");
        }
      } else if (str === "한국어" || str === "영어") {
        if (lecture.language !== str) {
          return false;
        } else {
          input = input.replace(str, "");
        }
      } else if (str.startsWith("/r")) {
        if (!lecture.extraInfo.replaceAll(" ", "").includes(str.substring(2))) {
          return false;
        } else {
          input = input.replace(str, "");
        }
      }
    }

    if (isRelatedName(input, lecture.lecturer + lecture.subjectTitle + lecture.lecturer)) {
      return true;
    } else {
      splitInput = input.split(" ").filter(s => s !== "");
      let str1 = splitInput[splitInput.length - 1];
      let str2 = splitInput[0];
  
      if (lecture.extraInfo.replace(" ", "").includes(str1) || isRelatedDepartment(str1, lecture.college, lecture.department)) {
        input = input.replace(str1, "");
        if (isRelatedName(input, lecture.lecturer + lecture.subjectTitle + lecture.lecturer)) {
          return true;
        }
      }
  
      if (lecture.extraInfo.replace(" ", "").includes(str2) || isRelatedDepartment(str2, lecture.college, lecture.department)) {
        input = input.replace(str2, "");
        if (isRelatedName(input, lecture.lecturer + lecture.subjectTitle + lecture.lecturer)) {
          return true;
        }
      }
    }  
  }
  return false;
}

const isRelatedDepartment = (abbrev: string, college: string, dept: string) => {
  return isRelatedName(abbrev, dept + college);
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