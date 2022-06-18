import React from "react";
import { useEffect } from "react";
import { Grid, Button } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import ModalComponent from "modal";
import CreateRoomMenu from "features/createRoomMenu";
import JoinRoomMenu from "features/joinRoomMenu";
import { connect } from "react-redux";
import { logOut, logIn, logInGuest } from "actions";
import LogInForm from "features/LogInForm";
import { useSpring, animated } from "react-spring";
import { socket } from "utils/WebSocket";

function HomePage(props) {
  const centerButtonStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,

    //bgcolor: 'background.paper',
    //border: '2px solid #000',
    //boxShadow: 24,
    p: 4,
  };

  const testStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const fadeFromDown = useSpring({
    from: { opacity: 0, transform: "translateY(40px)" },
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

  useEffect(() => {
    let user = localStorage.getItem("chat-app-user");

    if (user) {
      props.logIn(JSON.parse(user));
    } else {
      socket.emit("get-guest-id");
    }
    document.body.style.backgroundColor = "#EDE0D4";
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("chat-app-user");
    socket.emit("sign-out");
    socket.emit("get-guest-id");
  };

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
        <AppBar position="static" color="secondary">
          <Toolbar variant="dense">
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item xs style={{ textAlign: "left" }}>
                <animated.div style={fadeFromLeft}>PianoJam</animated.div>
              </Grid>
              <Grid item xs={2} style={{ textAlign: "center" }}>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="stretch"
                ></Grid>
              </Grid>
              {props.userInfo.isLogged ? (
                <>
                  <ModalComponent
                    text={`Welcome, ${props.userInfo.username}`}
                    component={<></>}
                    style={testStyle}
                  ></ModalComponent>
                  <Button onClick={handleLogOut}>Sign out</Button>
                </>
              ) : (
                <>
                  <Grid item xs style={{ textAlign: "right" }}>
                    <animated.div style={fadeFromRight}>
                      <ModalComponent
                        text="Sign in"
                        component={<LogInForm />}
                      ></ModalComponent>
                    </animated.div>
                  </Grid>
                </>
              )}
            </Grid>
          </Toolbar>
        </AppBar>
      </Grid>
      <Grid item xs>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          height="80%"
        >
          <animated.div style={fadeFromDown}>
            <Grid item xs style={{ textAlign: "center", padding: "10px" }}>
              <ModalComponent
                text="Join Room"
                component={<JoinRoomMenu />}
                style={centerButtonStyle}
                buttonStyle={{
                  color: "#EDE0D4",
                  height: "75px",
                  width: "200px",
                  backgroundColor: "#06070E",
                  opacity: "0.75",
                }}
              ></ModalComponent>
            </Grid>
          </animated.div>
          <animated.div style={fadeFromDown}>
            <Grid item xs style={{ textAlign: "center", padding: "10px" }}>
              <ModalComponent
                text="Create Room"
                component={<CreateRoomMenu />}
                style={centerButtonStyle}
                buttonStyle={{
                  color: "#EDE0D4",
                  height: "75px",
                  width: "200px",
                  backgroundColor: "#06070E",
                  opacity: "0.75",
                }}
              ></ModalComponent>
            </Grid>
          </animated.div>
        </Grid>
      </Grid>
      <Grid item></Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(logOut()),
    logIn: (data) => dispatch(logIn(data)),
    logInGuest: (data) => dispatch(logInGuest(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
