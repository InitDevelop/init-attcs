import { Dictionary } from "../util/Util";

type priorityState = {
  priority: Dictionary<number>;
}

const INITIAL_PRIORITY_SETTINGS: priorityState = {
  priority: {
    "empty": 1, "time": 6, "morning": 3, "count": 4, "lunch": 5, "space": 2
  },
};

type priorityAction = {
  type: string,
  payload: {
    priority: Dictionary<number>;
  };
};

const priorityReducer = (state = INITIAL_PRIORITY_SETTINGS, action: priorityAction) => {
  switch (action.type) {
    case "SET_PRIORITY":
      return { ...state, priority: action.payload.priority };
    default:
      return state;
  }
}

export default priorityReducer;