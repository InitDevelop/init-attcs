import { Lecture, blankLecture } from "../types/Lecture";

type addedLecturesState = {
  hovered: boolean;
  hoveredLecture: Lecture;
  addedLectures: Lecture[];
}

const INITIAL_ADDED_LECTURES: addedLecturesState = {
  hovered: false,
  hoveredLecture: blankLecture,
  addedLectures: [],
};

type databaseAction = {
  type: string,
  payload: {
    hovered: false,
    lecture: Lecture,
    lectures: Lecture[],
  };
};

const addedLecturesReducer = (state = INITIAL_ADDED_LECTURES, action: databaseAction) => {
  switch (action.type) {
    case "SET_HOVERED":
      return { ...state, hovered: action.payload.hovered };
    case "SET_HOVERED_LECTURE":
      return { ...state, hoveredLecture: action.payload.lecture };
    case "SET_ADDED_LECTURES":
      return { ...state, addedLectures: action.payload.lectures };
    case "ADD_LECTURE":
      if (state.addedLectures.filter((lecture) => lecture.id === action.payload.lecture.id).length === 0)
        return { ...state, addedLectures: state.addedLectures.concat(action.payload.lecture) };
      else
        return state;
    case "REMOVE_LECTURE":
      return { ...state, addedLectures: state.addedLectures.filter((lecture) => lecture.id !== action.payload.lecture.id) };
    default:
      return state;
  }
}

export default addedLecturesReducer;