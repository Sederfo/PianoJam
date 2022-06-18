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
import { generateRoomIdRoute } from "utils/APIRoutes";

class createRoomMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      roomId: faker.word
        .adjective()
        .concat(faker.music.genre())
        .replace(/\s/g, ""),
      maxPlayers: 5,
      onlyOwnerCanPlay: false,
      chatEnabled: true,
    };
  }

  componentDidMount = async () => {
    this.generateRoomId()
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    socket.emit("create-room", this.state);
    this.props.navigate(`/room:${this.state.roomId}`);
  };

  handleChatEnabled = () => {
    this.setState((prevState) => ({
      chatEnabled: !prevState.chatEnabled,
    }));
  };

  handleMaxPlayers = (event) => {
    if (event.target.value != "") {
      this.setState({ maxPlayers: event.target.value });
    }
  };

  handleOnlyOwnerCanPlay = () => {
    this.setState((prevState) => ({
      onlyOwnerCanPlay: !prevState.onlyOwnerCanPlay,
    }));
  };

  generateRoomId = async () =>{
    let response = await axios.get(generateRoomIdRoute)
    this.setState({ roomId: response.data.roomId });
  }

  handleGenerateRoomId = () => {
    this.generateRoomId()
  };

  render() {
    
    return (
      <>
        <FormContainer>
          <form onSubmit={(event) => this.handleSubmit(event)}>
            <div className="brand">
              {/* <img src={Logo} alt="Logo" /> */}
              <h1>Room settings</h1>
            </div>
            <div
              className="formRow"
              style={{ justifyContent: "space-between" }}
            >
              <button type="button" onClick={this.handleGenerateRoomId}>
                Generate new ID
              </button>
              <input
                id="roomId"
                disabled
                type="text"
                placeholder={this.state.roomId}
                name="roomId"
                style={{ textAlign: "center" }}
              />
            </div>
            <div
              className="formRow"
              style={{ justifyContent: "space-between" }}
            >
              <label htmlFor="maxPlayers">Maximum nr of players:</label>
              <Select
                sx={{ bgcolor: "#EDE0D4" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={this.state.maxPlayers}
                label="Age"
                onChange={this.handleMaxPlayers}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: "#EDE0D4",
                      "& .MuiMenuItem-root": {
                        padding: 2,
                      },
                    },
                  },
                }}
              >
                {Array.from(Array(10).keys()).map((nr) => {
                  if (nr !== 0) {
                    return <MenuItem value={nr} key={nr}>{nr}</MenuItem>;
                  }
                })}
              </Select>
            </div>
            {/* <div
              className="formRow"
              style={{ justifyContent: "space-between" }}
            >
              <label htmlFor="onlyOwnerCanPlay">Only owner can play</label>
              <Checkbox
                id="onlyOwnerCanPlay"
                onChange={this.handleOnlyOwnerCanPlay}
              />
            </div> */}
            <div
              className="formRow"
              style={{ justifyContent: "space-between" }}
            >
              <label htmlFor="chatEnabled">Enable Chat</label>
              <Checkbox
                defaultChecked
                id="chatEnabled"
                onChange={this.handleChatEnabled}
              />
            </div>
            <button type="submit" onClick={this.handleSubmit}>
              Create Room
            </button>
          </form>
        </FormContainer>
      </>
    );
  }
}

export default withRouter(createRoomMenu);
