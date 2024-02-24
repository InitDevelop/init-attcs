import { Lecture } from "../types/Lecture";
import { Scenario } from "../types/Scenario";

type scenarioState = {
  scenarios: Scenario[];
  scenarioNumber: number;
  relatedLectures: Lecture[];
}

const INITIAL_SCENARIO_SETTINGS: scenarioState = {
  scenarios: [],
  scenarioNumber: 0,
  relatedLectures: [],
};

type scenarioAction = {
  type: string,
  payload: {
    scenarios: Scenario[],
    scenarioNumber: number,
    relatedLectures: Lecture[],
  };
};

const scenarioReducer = (state = INITIAL_SCENARIO_SETTINGS, action: scenarioAction) => {
  switch (action.type) {
    case "SET_SCENARIOS":
      return { ...state, scenarios: action.payload.scenarios };
    case "SET_SCENARIO_NUMBER":
      return { ...state, scenarioNumber: action.payload.scenarioNumber };
    case "SET_RELATED_LECTURES":
      return { ...state, relatedLectures: action.payload.relatedLectures };
    default:
      return state;
  }
}

export default scenarioReducer;