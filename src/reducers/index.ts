import { combineReducers } from "redux";
import searchReducer from "./searchReducers";
import lectureDatabaseReducer from "./lectureDatabaseReducers";

export type combinedStateType = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  searchReducer: searchReducer,
  lectureDatabaseReducer: lectureDatabaseReducer,
});

export default rootReducer;
