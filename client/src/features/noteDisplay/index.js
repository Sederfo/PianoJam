import React from "react";
import "../../assets/styles/noteDisplay.css";
import { connect } from "react-redux";
import { Midi } from "@tonaljs/tonal";
import { Paper } from "@mui/material";
import Box from "@mui/material/Box";

function NoteDisplay(props) {
  //extract note names from activeKeys
  let notes = props.activeKeys.map((note) => note.midi);

  //remove duplicate note names from uniq
  let uniq = [...new Set(notes)];

  let noteName = null;
  //check if single note is pressed
  if (uniq.length === 1) {
    let note = uniq[0];
    //compute chord from notes
    noteName = Midi.midiToNoteName(note, { pitchClass: true, sharps: true });
  }

  return (
    <Box pb={2} pl={2} pr={2}>
      <Paper
        variant="elevation"
        elevation={6}
        sx={{ minWidth: "10%", display: "inline-block", padding: 2 }}
      >
        Note: {noteName}
      </Paper>
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    activeKeys: state.activeKeys,
  };
};

export default connect(mapStateToProps, null)(NoteDisplay);
