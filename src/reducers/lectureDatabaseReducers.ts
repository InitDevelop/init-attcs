import { Lecture } from "../types/Lecture";
import lectureDatabase from "../db/data241.json";

type databaseState = {
  lectures: Lecture[];
}

const INITIAL_DATABASE: databaseState = {
  lectures: (lectureDatabase as { subjects: Lecture[] }).subjects,
};

type databaseAction = {
  type: string,
  payload: {
    lecture: Lecture,
    customLectures: Lecture[]
  };
};

const lectureDatabaseReducer = (state = INITIAL_DATABASE, action: databaseAction) => {
  switch (action.type) {
    case "ADD_LECTURE_TO_DATABASE":
      return { ...state, lectures: state.lectures.concat(action.payload.lecture) };
    case "UPDATE_CUSTOM_LECTURES_TO_DATABASE":
      return { ...state, lectures: (lectureDatabase as { subjects: Lecture[] }).subjects.concat(action.payload.customLectures) };
    default:
      return state;
  }
}

export default lectureDatabaseReducer;