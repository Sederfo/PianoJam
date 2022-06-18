const initialState = {
  isPlaying: false,
  count: 0,
  bpm: 100,
  beatsPerMeasure: 4,
  timerHandle:0
};

const metronomeReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case "RESET_STORE":
      return initialState
    case "START_METRONOME":
      newState.isPlaying = true;
      return newState;
    case "STOP_METRONOME":
      newState.isPlaying = false;
      return newState;
    case "SET_BPM":
      newState.bpm = action.payload;
      return newState;
    case "SET_COUNT":
      newState.count = action.payload;
      return newState;
    case "SET_BEATS_PER_MEASURE":
      newState.beatsPerMeasure = action.payload;
      return newState;
      case "SET_TIMER_HANDLE":
        newState.timerHandle = action.payload;
        return newState;
    default:
      return state;
  }
};

export default metronomeReducer;
