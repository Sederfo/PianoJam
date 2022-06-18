import React from "react";
import "../../assets/styles/pedalDisplay.css";
import { connect } from "react-redux";
import { Midi } from "@tonaljs/tonal";
import { Paper } from "@mui/material";

function NoteDisplay(props) {
  return (
    <Paper
      variant="outlined"
      square
      sx={{ minWidth: "3%", display: "inline-block" }}
    >
      Pedal:{props.pedalLevel}
    </Paper>
  );
}

const mapStateToProps = (state) => {
  return {
    pedalLevel: state.pedalLevel,
  };
};

export default connect(mapStateToProps, null)(NoteDisplay);
