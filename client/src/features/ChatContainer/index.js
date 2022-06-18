import React from "react";
import ChatMessage from "features/ChatMessage";
import { Paper } from "@mui/material";
import TextField from "@mui/material/TextField";
import { socket } from "utils/WebSocket";
import { connect } from "react-redux";

class ChatContainer extends React.Component {
  constructor(props) {
    super(props);
    this.initialMessage = `Welcome to ${this.props.roomId} room!`;
    this.username = this.props.userInfo.username;
    this.state = {
      messages: [],
      currentMessage: "",
    };
  }

  componentDidMount = () => {
    socket.on("receive-chat-message", (data) => {
      this.registerNewMessage(data.message, data.username);
    });
  };

  keyPress = (e) => {
    if (e.keyCode == 13) {
      this.registerNewMessage(e.target.value, this.username);
      this.clearCurrentMessage();
      socket.emit("send-chat-message", {
        message: this.state.currentMessage,
        room: this.props.roomId,
        username: this.username,
      });
    }
  };

  handleOnChange = (e) => {
    this.setState({ currentMessage: e.target.value });
  };

  clearCurrentMessage = () => {
    this.setState({ currentMessage: "" });
  };

  registerNewMessage(message, username) {
    this.setState({
      messages: [...this.state.messages, { message, username }],
    });
  }

  render() {
    return (
      <div
        style={{ border: "1px solid black", maxHeight: "60%", overflowY: "auto", position: "relative" }} >
        <div>{this.initialMessage}</div>
        {this.state.messages.map((message) => {
          return ( 
          <ChatMessage message={message.message} username={message.username} /> ); })}
        <Paper>
          <TextField size="small" style={{ width: "100%" }} onKeyDown={this.keyPress} value={this.state.currentMessage} onChange={this.handleOnChange}>
            Chat Input
          </TextField>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
  };
};

export default connect(mapStateToProps, null)(ChatContainer);
