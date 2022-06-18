import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import ModalComponent from "modal";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import TrailingNotes from "features/trailingNotes";
import Metronome from "features/metronome";
import { Button } from "@mui/material";
import { withRouter } from "utils/withRouter";
import ChatContainer from "features/ChatContainer";
import { socket } from "utils/WebSocket";
import PlayerList from "features/PlayerList";
import SoundPackMenu from "features/SoundPackMenu";
import ColorPickerMenu from "features/ThemeMenu";
import { useSpring, animated } from "react-spring";
import { startRecording } from "actions";
import { connect } from "react-redux";
import SaveAudioMenu from "features/SaveAudioMenu";
import { recorder } from "utils/Recorder";
const metronomeModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const chatModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxHeight: "60%",
  overflowY: "auto",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const soundPackMenuStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  height: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
const themeMenuStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 275,
  height: "30%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
const saveMenuStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 250,
  height: "25%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
function TopMenu(props) {
  const [state, setState] = useState({ ...props.state, isRecording:false });

  useEffect(() => {
    // Anything in here is fired on component mount.
    socket.emit("join-room", state.roomId, props.userInfo.username);

    //check if room exists
    socket.emit("get-room-info", state.roomId);
    socket.on("receive-room-info", (data) => {
      console.log(data)
      if (data == false) {
        props.navigate("/error");
      } else {
        // check if player limit has been reached
        if (data.onlineUsers.length > data.maxPlayers) {
          props.navigate("/errorToOmanyPlayers");
        }
        setState((prevState) => ({
          ...prevState,
          ...data,
        }));
      }
    });

    socket.on("receive-online-users", (onlineUsers) => {
      setState((prevState) => ({
        ...prevState,
        onlineUsers: onlineUsers,
      }));
    });
    socket.emit("get-online-usernames", state.roomId);
    return () => {
      // Anything in here is fired on component unmount.
    };
  }, []);

  const fadeFromUp = useSpring({
    from: { opacity: 0, transform: "translateY(-40px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
  });

  const fadeFromRight = useSpring({
    from: { opacity: 0, transform: "translateX(40px)" },
    to: { opacity: 1, transform: "translateX(0px)" },
  });

  const fadeFromLeft = useSpring({
    from: { opacity: 0, transform: "translateX(-40px)" },
    to: { opacity: 1, transform: "translateX(0px)" },
  });

  const startRecording = () => {
    //props.startRecording();
    setState((prevState) => ({
      ...prevState,
      isRecording: true,
    }));
    recorder.start();
  };

  const stopRecording = () => {
    //props.startRecording();
    setState((prevState) => ({
      ...prevState,
      isRecording: false,
    }));
    console.log("stopRecording")
  };

  
  return (
    <AppBar position="static" color="secondary">
      <Toolbar variant="dense">
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={4} style={{ textAlign: "left" }}>
            <animated.div style={fadeFromLeft}>
              <Button
                onClick={() => {
                  props.navigate("/");
                }}
              >
                Leave Room
              </Button>

              <ModalComponent
                text={
                  state.onlineUsers.length > 1
                    ? `${state.onlineUsers.length} players`
                    : "1 player"
                }
                component={<PlayerList onlineUsers={state.onlineUsers} />}
                style={metronomeModalStyle}
              ></ModalComponent>
            </animated.div>
          </Grid>

          <Grid item xs={4} style={{ textAlign: "center" }}>
            <animated.div style={fadeFromUp}>
              <ModalComponent
                keepMounted
                text="Metronome"
                component={<Metronome />}
                style={metronomeModalStyle}
              />
            </animated.div>
          </Grid>
          <Grid item xs={4} style={{ textAlign: "right" }}>
            <animated.div style={fadeFromRight}>
              {!state.isRecording ? (
                <Button onClick={startRecording}>Start Audio Recording</Button>
              ) : (
                <ModalComponent
                  keepMounted
                  text="Stop Audio Recording"
                  component={<SaveAudioMenu stopRecording={stopRecording} />}
                  style={saveMenuStyle}
                />
              )}
              {state.chatEnabled ? (
                <ModalComponent
                  keepMounted
                  text="Chat"
                  component={<ChatContainer roomId={state.roomId} />}
                  style={chatModalStyle}
                />
              ) : (
                <></>
              )}

              <ModalComponent
                keepMounted
                text="Sound Pack"
                component={<SoundPackMenu setSoundPack={props.setSoundPack} />}
                style={soundPackMenuStyle}
              />
              <ModalComponent
                keepMounted
                text="Colors"
                component={<ColorPickerMenu />}
                style={themeMenuStyle}
              />
            </animated.div>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

const mapStateToProps = (state) => {
  return {
    recorder: state.recorder,
    userInfo:state.userInfo
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startRecording: () => dispatch(startRecording()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TopMenu));
