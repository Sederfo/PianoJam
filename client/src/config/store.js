import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import activeKeysReducer from "../reducers/activeKeysReducer";
import metronomeReducer from "../reducers/metronomeReducer";
import notePositionsReducer from "../reducers/notePositionsReducer";
import trailingNotesReducer from "../reducers/trailingNotesReducer";
import userInfoReducer from "reducers/userInfoReducer";
import themeReducer from "reducers/themeReducer";

const appReducer = combineReducers({
  activeKeys: activeKeysReducer,
  metronome: metronomeReducer,
  notePositions: notePositionsReducer,
  trailingNotes: trailingNotesReducer,
  userInfo: userInfoReducer,
  theme: themeReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "RESET_STORE") {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
