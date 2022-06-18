import React from "react";
import SampleLibrary from "../libs/Tonejs-Instruments";
import Keyboard from "./keyboard";
import { connect } from "react-redux";
import { recorder } from "utils/Recorder";

class Piano extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.recorder = recorder;
    this.piano = SampleLibrary.load({
      instruments: this.props.soundPack,
      onload: () => {},
    })
      .toDestination()
      .connect(this.recorder);
  }

  componentDidUpdate() {
    this.piano = SampleLibrary.load({
      instruments: this.props.soundPack,
      onload: () => {},
    })
      .toDestination()
      .connect(this.recorder);
  }

  componentWillUnmount() {
    this.piano.dispose();
  }

  playNote = (note) => {
    try {
      this.piano.triggerAttack(note);
    } catch (error) {
      console.error(error)
    }
  };

  stopNote = (note) => {
    try {
      this.piano.triggerRelease(note);
    } catch (error) {
      console.error(error)
    }
  };

  render() {
    return (
      <Keyboard
        playKey={this.playNote}
        stopKey={this.stopNote}
        roomId={this.props.roomId}
      />
    );
  }
}


export default Piano
