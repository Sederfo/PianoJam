import React from 'react'
import ChordDisplay from "../chordDisplay";
import NoteDisplay from "../noteDisplay";
import "assets/styles/trailingNote.css";
import { Grid } from "@mui/material";
import TrailingNote from 'features/trailingNote';

export default function MiddleScreen() {
    //figure out which notes are currently pressed - activeKeys
    //figure out which notes are trailing - trailingNotes
    //when a note is in activeKeys, its height should increase
    //always render notes in trailingKeys, and inside the note, check if it still is in activeKeys
    //
    
  return (
    <div
        className="trailingNotesContainer"
        style={{ width: "100%", position: "relative", height: "100%" }}
      >
        
        <TrailingNote></TrailingNote>
          
        <Grid item xs>
          <ChordDisplay style={{ position: "relative" }} />
        </Grid>
        <Grid item xs>
          <NoteDisplay />
        </Grid>
        
      </div>
  )
}
