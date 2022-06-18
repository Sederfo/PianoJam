import React from "react";
import "../../assets/styles/chordDisplay.css";
import { connect } from "react-redux";
import { Chord } from "@tonaljs/tonal";
import { Paper } from "@mui/material";
import Box from "@mui/material/Box";

function ChordDisplay(props) {
  //extract note names from activeKeys
  let notes = props.activeKeys.map((note) => note.ansi);

  //remove duplicate note names from uniq
  let uniq = [...new Set(notes)];

  //sort array alphabetically
  uniq.sort();

  //compute chord from notes
  let chordName = Chord.detect(uniq);

  return (
    <Box pt={2} pl={2} pr={2}>
      <Paper
        variant="elevation"
        elevation={6}
        sx={{ minWidth: "10%", display: "inline-block", padding: 2 }}
      >
        Chord: {chordName}
      </Paper>
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    activeKeys: state.activeKeys,
  };
};

export default connect(mapStateToProps, null)(ChordDisplay);
