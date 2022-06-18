import React from "react";
import { faker } from "@faker-js/faker";
import { FormContainer } from "features/styledComponents/FormContainer";
import Checkbox from "@mui/material/Checkbox";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { socket } from "utils/WebSocket";
import { useNavigate } from "react-router-dom";
import { withRouter } from "utils/withRouter";
import axios from "axios";
import { getRoomsRoute } from "utils/APIRoutes";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import RoomListItem from "features/roomListItem";

class JoinRoomsMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: {},
    };
  }

  componentDidMount = () => {
    socket.on("send-rooms", (data) => {
      
      this.setState({ rooms: data });
    });

    socket.emit("get-rooms");
  };

  navigateToRoom = (roomId) => {
    this.props.navigate(`/room:${roomId}`);
  };

  render() {
    
    return (
      <>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            backgroundColor: "#2a2b2a",
            borderRadius: "2rem",
            padding: "3rem 5rem",
          }}
        >
          <Paper
            style={{
              maxHeight: "60vh",
              minHeight: "30vh",
              overflow: "auto",
              backgroundColor: "#EDE0D4",
              borderRadius: "10px",
            }}
          >
            <List style={{ minHeight: "30vh" }}>
              {this.state.rooms.length > 0 ? (
                this.state.rooms.map((object) => {
                  return (
                    <ListItem key={object.roomId}>
                      <RoomListItem room={object} navigateToRoom={this.navigateToRoom} />
                    </ListItem>
                  );
                })
              ) : (
                <div
                  style={{ display: "flex", minHeight: "30vh",
                           justifyContent: "center", alignItems: "center", textAlign: "center"}} >
                  Looks like there are no rooms yet. Create a room using the "Create Room" button!
                </div>
              )}
            </List>
          </Paper>
        </div>
      </>
    );
  }
}

export default withRouter(JoinRoomsMenu);
