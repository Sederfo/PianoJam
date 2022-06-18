const initialState = {
  backgroundColor: "#EDE0D4",
  whiteNoteTrailColor: "#000000",
  blackNoteTrailColor: "#000000",
};

const themeReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case "SET_BACKGROUND_COLOR":
      newState.backgroundColor = action.payload;
      return newState;
    case "SET_WHITE_NOTE_TRAIL_COLOR":
      newState.whiteNoteTrailColor = action.payload;
      return newState;
    case "SET_BLACK_NOTE_TRAIL_COLOR":
      newState.blackNoteTrailColor = action.payload;
      return newState;
    case "RESET_THEME":
      return initialState;
    default:
      return state;
  }
};

export default themeReducer;
