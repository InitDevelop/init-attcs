import { Lecture } from "../types/Lecture";
import { LectureGroup } from "../types/LectureGroup";

type addedLecturesState = {
  subjectSearchText: string;
  selectedSubjectID: string;
  addedLectureGroups: LectureGroup[];
}

const INITIAL_AUTO_GENERATE_SETTINGS: addedLecturesState = {
  subjectSearchText: "",
  selectedSubjectID: "",
  addedLectureGroups: [],
};

type autoGeneratorAction = {
  type: string,
  payload: {
    subjectSearchText: string,
    selectedSubjectID: string,
    lecture: Lecture,
  };
};

const autoGeneratorReducer = (state = INITIAL_AUTO_GENERATE_SETTINGS, action: autoGeneratorAction) => {
  if (action.type === "SET_SUBJECT_SEARCH_TEXT") {
    return { ...state, subjectSearchText: action.payload.subjectSearchText };
  } else if (action.type === "SET_SELECTED_SUBJECT_ID") {
    return { ...state, selectedSubjectID: action.payload.selectedSubjectID }; 
  } else if (action.type === "ADD_LECTURE_TO_LECTURE_GROUPS") {
    const IDs = state.addedLectureGroups.map((lg: LectureGroup) => lg.subjectID);
    let copy = state.addedLectureGroups;

    if (IDs.includes(action.payload.lecture.subjectID)) {
      const index = state.addedLectureGroups.findIndex((lg: LectureGroup) => lg.subjectID === action.payload.lecture.subjectID);
      copy[index].lectures.push(action.payload.lecture);
    } else {
      copy.push({
        subjectID: action.payload.lecture.subjectID,
        lectures: [action.payload.lecture],
        timeShareLectures: [],
      });
    }

    return { ...state, addedLectureGroups: copy };
  } else if (action.type === "REMOVE_LECTURE_FROM_LECTURE_GROUPS") {
    const index = state.addedLectureGroups.findIndex((lg: LectureGroup) => lg.subjectID === action.payload.lecture.subjectID);
    let copy = state.addedLectureGroups;

    copy[index].lectures = state.addedLectureGroups[index].lectures.filter(l => l !== action.payload.lecture);

    if (copy[index].lectures.length === 0) {
      copy = copy.filter(lg => lg.subjectID !== action.payload.lecture.subjectID);
    }

    return { ...state, addedLectureGroups: copy };
  } else {
    return state;
  }
}

export default autoGeneratorReducer;