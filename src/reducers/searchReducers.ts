type searchState = {
  searchText: string,
  restrictions: string,
}

const INITIAL_SEARCH_SETTINGS: searchState = {
  searchText: "",
  restrictions: "",
};

type searchAction = {
  type: string,
  payload: {
    content: string,
  };
};

const searchReducer = (state = INITIAL_SEARCH_SETTINGS, action: searchAction) => {
  switch (action.type) {
    case "SET_SEARCH_TEXT":
      return { ...state, searchText: action.payload.content };
    case "SET_RESTRICTIONS":
      return { ...state, restriction: action.payload.content }
    default:
      return state;
  }
}

export default searchReducer;