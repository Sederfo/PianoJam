import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import Piano from "features/piano";
import TrailingNotes from "features/trailingNotes";
import { withRouter } from "utils/withRouter";
import TopMenu from "features/TopMenu";

function PlayingPage(props) {
  const [state, setState] = useState({
    roomId: props.params.roomId.replace(":", ""),
    roomExists: true,
    chatEnabled: undefined,
    maxPlayers: undefined,
    onlineUsers: [],
    soundPack: "piano",
    isRecording: false,
  });

  
  const setSoundPack = (name) => {
    setState((prevState) => ({
      ...prevState,
      soundPack: name,
    }));
  };

  useEffect(()=>{
    // 
    // socket.emit("join-room", state.roomId);
  },[])

  return (
    <Grid
      container
      direction="column"
      justifyContent="space-around"
      alignItems="stretch"
      spacing={0}
      sx={{ height: "100vh" }}
    >
      <Grid item xs={1}>
        <TopMenu state={state} setSoundPack={setSoundPack}/>
      </Grid>
      <Grid item xs>
        <TrailingNotes />
      </Grid>
      <Grid item>
        <Piano roomId={state.roomId} soundPack={state.soundPack}  />
      </Grid>
    </Grid>
  );
}

export default withRouter(PlayingPage)