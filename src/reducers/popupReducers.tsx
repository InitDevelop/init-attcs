import { Lecture } from "../types/Lecture";

type popupState = {
  displayPopup: boolean;
  popupType: string;
  popupTitle: string;
  popupContent: React.ReactNode;
  popupLectures: Lecture[];
  useCloseButton: boolean;
}

const INITIAL_POPOP_SETTINGS: popupState = {
  displayPopup: false,
  popupType: "",
  popupTitle: "",
  popupContent: <></>,
  popupLectures: [],
  useCloseButton: true,
};

type popupAction = {
  type: string,
  payload: {
    displayPopup: boolean,
    popupType: string,
    popupTitle: string,
    popupContent: React.ReactNode,
    popupLectures: Lecture[],
    useCloseButton: boolean,
  };
};

const popupReducer = (state = INITIAL_POPOP_SETTINGS, action: popupAction) => {
  switch (action.type) {
    case "SET_DISPLAY_POPUP":
      return { ...state, displayPopup: action.payload.displayPopup };
    case "SET_POPUP_TITLE":
      return { ...state, popupTitle: action.payload.popupTitle };
    case "SET_POPUP_CONTENT":
      return { ...state, popupContent: action.payload.popupContent };
    case "SET_USE_CLOSE_BUTTON":
      return { ...state, useCloseButton: action.payload.useCloseButton };
    case "SHOW_POPUP":
      return { ...state, displayPopup: true, popupTitle: action.payload.popupTitle, popupType: action.payload.popupType,
                popupContent: action.payload.popupContent, useCloseButton: action.payload.useCloseButton };
    case "SHOW_POPUP_LECTURES":
      return { ...state, displayPopup: true, popupTitle: action.payload.popupTitle, popupType: action.payload.popupType,
        popupContent: <></>, useCloseButton: action.payload.useCloseButton, popupLectures: action.payload.popupLectures };
    default:
      return state;
  }
}

export default popupReducer;