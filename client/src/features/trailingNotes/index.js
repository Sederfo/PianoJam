import React from "react";
import { connect } from "react-redux";
import TrailingNote from "../trailingNote";
import ChordDisplay from "../chordDisplay";
import NoteDisplay from "../noteDisplay";
import "assets/styles/trailingNote.css";
import { Grid } from "@mui/material";
import { deleteTrailingNote } from "actions";

const TrailingNotes = (props) => {
  const removeNote = (id) =>{
    props.deleteTrailingNote(id)
  } 
  return (
    <div
      className="trailingNotesContainer"
      style={{ width: "100%", position: "relative", height: "100%" }}
    >
      {props.trailingNotes.map((note) => {
        /* find its position in the notePositions redux variable */
        const x = props.notePositions.leftPositions.find(
          (x) => x.ansi === note.ansi
        );
        let width, color;
  
        if (note.type === "white") {
          width = props.notePositions.whiteWidth;
          color = props.theme.whiteNoteTrailColor;
        } else {
          width = props.notePositions.blackWidth;
          color = props.theme.blackNoteTrailColor
        }

        return <TrailingNote note={x} width={90/100 * parseFloat(width)} id={note.id} key={note.id}  
                             removeNote={removeNote} color={color}/>;
      })}
      <Grid item xs>
        <ChordDisplay  />
      </Grid>
      <Grid item xs>
        <NoteDisplay />
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    notePositions: state.notePositions,
    activeKeys: state.activeKeys,
    trailingNotes: state.trailingNotes,
    theme: state.theme
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

    deleteTrailingNote: (id) => dispatch(deleteTrailingNote(id)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrailingNotes);
