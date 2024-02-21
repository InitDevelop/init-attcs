import { combineReducers } from "redux";
import searchReducer from "./searchReducers";
import lectureDatabaseReducer from "./lectureDatabaseReducers";
import addedLecturesReducer from "./addedLecturesReducers";
import popupReducer from "./popupReducers";
import autoGeneratorReducer from "./autoGeneratorReducers";

export type combinedStateType = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  searchReducer: searchReducer,
  lectureDatabaseReducer: lectureDatabaseReducer,
  addedLecturesReducer: addedLecturesReducer,
  popupReducer: popupReducer,
  autoGeneratorReducers: autoGeneratorReducer,
});

export default rootReducer;
