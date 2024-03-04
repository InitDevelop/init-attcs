import { Lecture } from "../types/Lecture";
import { toTimeText } from "../util/Util";

type addedLecturesState = {
  customLectures: Lecture[];
  isEditingLecture: boolean;
  editingLectureID: string;
  editingLectureTitle: string;
  editingLectureStartHour: number;
  editingLectureStartMinute: number;
  editingLectureEndHour: number;
  editingLectureEndMinute: number;
  editingLectureDate: string;
  editingLectureRoom: string;
}

const INITIAL_CUSTOM_LECTURE_SETTINGS: addedLecturesState = {
  customLectures: [],
  isEditingLecture: false,
  editingLectureID: "",
  editingLectureTitle: "나만의 일정",
  editingLectureStartHour: 9,
  editingLectureStartMinute: 0,
  editingLectureEndHour: 10,
  editingLectureEndMinute: 0,
  editingLectureDate: "월",
  editingLectureRoom: "1-101",
};

type customLectureAction = {
  type: string,
  payload: {
    customLectures: [],
    isEditingLecture: boolean,
    lectureID: string,
    editingLectureID: string,
    editingLectureTitle: string,
    editingLectureStartHour: number,
    editingLectureStartMinute: number,
    editingLectureEndHour: number,
    editingLectureEndMinute: number,
    editingLectureDate: string,
    editingLectureRoom: string,
  };
};

const customLectureReducer = (state = INITIAL_CUSTOM_LECTURE_SETTINGS, action: customLectureAction) => {
  if (action.type === "SET_THIS_LECTURE_TO_EDIT_MODE") {
    for (let i = 0; i < state.customLectures.length; i++) {
      if (state.customLectures[i].id === action.payload.editingLectureID) {
        // 월(09:00~10:00)
        return {
          ...state,
          isEditingLecture: true,
          editingLectureID: action.payload.editingLectureID,
          editingLectureTitle: state.customLectures[i].subjectTitle,
          editingLectureStartHour: parseInt(state.customLectures[i].time.substring(2, 4)),
          editingLectureStartMinute: parseInt(state.customLectures[i].time.substring(5, 7)),
          editingLectureEndHour: parseInt(state.customLectures[i].time.substring(8, 10)),
          editingLectureEndMinute: parseInt(state.customLectures[i].time.substring(11, 13)),
          editingLectureDate: state.customLectures[i].time.substring(0, 1),
          editingLectureRoom: state.customLectures[i].lectureRoom,
        };
      }
    }

    return {
      ...state,
      isEditingLecture: true,
      editingLectureID: action.payload.editingLectureID,
      editingLectureTitle: "나만의 일정",
      editingLectureStartHour: 9,
      editingLectureStartMinute: 0,
      editingLectureEndHour: 10,
      editingLectureEndMinute: 0,
      editingLectureDate: "월",
      editingLectureRoom: "1-101",
    };
  } else if (action.type === "FINISH_EDIT_MODE") {
    const copy = state.customLectures;
    for (let i = 0; i < copy.length; i++) {
      if (copy[i].id === action.payload.editingLectureID) {
        const timeText = toTimeText(
          state.editingLectureStartHour, state.editingLectureStartMinute,
          state.editingLectureEndHour, state.editingLectureEndMinute
        );
        console.log(timeText)
        copy[i].subjectTitle = state.editingLectureTitle;
        copy[i].time = `${state.editingLectureDate}(${timeText})`;
        copy[i].lectureRoom = state.editingLectureRoom;
        break;
      }
    }
    return {
      ...state,
      isEditingLecture: false,
      customLectures: copy,
      editingLectureID: "",
      editingLectureTitle: "나만의 일정",
      editingLectureStartHour: 9,
      editingLectureStartMinute: 0,
      editingLectureEndHour: 10,
      editingLectureEndMinute: 0,
      editingLectureDate: "월",
      editingLectureRoom: "1-101",
    };
  } else if (action.type === "REMOVE_CUSTOM_LECTURE") {
    return {
      ...state,
      isEditingLecture: false,
      customLectures: state.customLectures.filter(lecture => lecture.id !== action.payload.lectureID),
      editingLectureID: "",
      editingLectureTitle: "나만의 일정",
      editingLectureStartHour: 9,
      editingLectureStartMinute: 0,
      editingLectureEndHour: 10,
      editingLectureEndMinute: 0,
      editingLectureDate: "월",
      editingLectureRoom: "1-101",
    };
  } else if (action.type === "CREATE_NEW_LECTURE") {
    const id = "CUSTOM." + Math.floor(Math.random() * 100000).toString();
    const customLecture: Lecture = {
      id: id,
      classification: "나만의 일정",
      college: "자체",
      department: "",
      program: "개인",
      year: "",
      subjectID: "",
      lectureNumber: "000",
      subjectTitle: "나만의 일정",
      subjectSubtitle: "",
      credit: "0",
      creditLecture: "0",
      creditLab: "0",
      time: "월(09:00~10:00)",
      lectureForm: "",
      lectureRoom: "1-101",
      lecturer: "나만의 일정",
      quota: "",
      extraInfo: "",
      language: "한국어"
    };

    return {
      ...state,
      isEditingLecture: true,
      customLectures: state.customLectures.concat(customLecture),
      editingLectureID: id,
      editingLectureTitle: "나만의 일정",
      editingLectureStartHour: 9,
      editingLectureStartMinute: 0,
      editingLectureEndHour: 10,
      editingLectureEndMinute: 0,
      editingLectureDate: "월",
      editingLectureRoom: "1-101",
    };
  } else if (action.type === "CHANGE_CUSTOM_LECTURE_DATA") {
    return {
      ...state,
      editingLectureTitle: action.payload.editingLectureTitle,
      editingLectureStartHour: action.payload.editingLectureStartHour,
      editingLectureStartMinute: action.payload.editingLectureStartMinute,
      editingLectureEndHour: action.payload.editingLectureEndHour,
      editingLectureEndMinute: action.payload.editingLectureEndMinute,
      editingLectureDate: action.payload.editingLectureDate,
      editingLectureRoom: action.payload.editingLectureRoom,
    };
  } else {
    return state;
  }
}

export default customLectureReducer;