// resets the store to the initial states
export const resetStore = () => {
  return {
    type: "RESET_STORE",
  };
};

//adds a key to the activeKeys for rendering active classes on keyboard keys and displaying chord and note information
export const activateKey = (key) => {
  return {
    type: "ACTIVATE_KEY",
    payload: key,
  };
};

//removes all instances of key from activeKeys
export const deactivateKey = (key) => {
  return {
    type: "DEACTIVATE_KEY",
    payload: key,
  };
};

//sets the pedal level (0-127)
export const setPedalLevel = (level) => {
  return {
    type: "SET_PEDAL_LEVEL",
    payload: level,
  };
};

//starts metronome playback
export const startMetronome = () => {
  return {
    type: "START_METRONOME",
  };
};

//stops metronome playback
export const stopMetronome = () => {
  return {
    type: "STOP_METRONOME",
  };
};

//sets the beats per minute of the metronome
export const setBPM = (bpm) => {
  return {
    type: "SET_BPM",
    payload: bpm,
  };
};

//sets the current count of the beat we're on
export const setCount = (nr) => {
  return {
    type: "SET_COUNT",
    payload: nr,
  };
};

//sets the beats per measure
export const setBeatsPerMeasure = (nr) => {
  return {
    type: "SET_BEATS_PER_MEASURE",
    payload: nr,
  };
};

//sets the handle for the setInterval function to persist it and stop the metronome even after closing and reopening the modal
export const setTimerHandle = (handle) => {
  return {
    type: "SET_TIMER_HANDLE",
    payload: handle,
  };
};

//sets the note positions
export const setNotePositions = (notePositions) => {
  return {
    type: "SET_NOTE_POSITIONS",
    payload: notePositions,
  };
};

//adds a note to the trailingNotes list that is used to display currently trailing notes
export const addTrailingNote = (note) => {
  return {
    type: "ADD_TRAILING_NOTE",
    payload: note,
  };
};

//deletes a note from the trailingNotes list
export const deleteTrailingNote = (id) => {
  return {
    type: "DELETE_TRAILING_NOTE",
    payload: id,
  };
};

export const setRoomId = (roomId) => {
  return {
    type: "SET_ROOM_ID",
    payload: roomId,
  };
};

export const logIn = (data) => {
  
  return {
    type: "LOG_IN",
    payload: data,
  };
};

export const logInGuest = (data) => {
  
  return {
    type: "LOG_IN_GUEST",
    payload: data,
  };
};

export const logOut = () => {
  return {
    type: "LOG_OUT",
  };
};


export const setBackgroundColor = (color) => {
  return {
    type: "SET_BACKGROUND_COLOR",
    payload:color
  };
};

export const setWhiteNoteTrailColor = (color) => {
  return {
    type: "SET_WHITE_NOTE_TRAIL_COLOR",
    payload:color
  };
};

export const setBlackNoteTrailColor = (color) => {
  return {
    type: "SET_BLACK_NOTE_TRAIL_COLOR",
    payload:color
  };
};


export const resetTheme = () => {
  return {
    type: "RESET_THEME"
  };
};

export const startRecording = () => {
  return {
    type: "START_RECORDING"
  };
};

export const stopRecording = () => {
  return {
    type: "STOP_RECORDING"
  };
};

