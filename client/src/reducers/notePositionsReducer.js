const initialState = []

const notePositionsReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case "SET_NOTE_WIDTH":
      newState.whiteWidth = action.payload.whiteWidth;
      newState.blackWidth = action.payload.blackWidth;
      return newState;
    case "SET_NOTE_POSITIONS":
      newState = action.payload
      return newState
    case "ADD_NOTE_POSITION":
      newState.leftPositions = [...state.leftPositions]
      newState.leftPositions.push(action.payload);
      return newState;
    case "RESET_STORE":
      return state;
    default:
      return state;
  }
};

export default notePositionsReducer;
