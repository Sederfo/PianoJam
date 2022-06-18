import React, { Component } from "react";
import {
  startMetronome,
  stopMetronome,
  setBPM,
  setBeatsPerMeasure,
  setCount,
  setTimerHandle,
} from "../../actions";
import { connect } from "react-redux";
import "../../assets/styles/metronome.css";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";

const click1 = require("./Perc_Clackhead_lo.wav");
const click2 = require("./Perc_Clackhead_hi.wav");

class Metronome extends Component {
  constructor(props) {
    super(props);

    this.click1 = new Audio(click1);
    this.click2 = new Audio(click2);
  }

  componentWillUnmount() {
    clearInterval(this.props.metronome.timerHandle);
  }

  handleInputChange = (event) => {
    const bpm = event.target.value;

    if (this.props.metronome.isPlaying) {
      // stop old timer and start a new one
      clearInterval(this.props.metronome.timerHandle);
      let handle = setInterval(this.playClick, (60 / bpm) * 1000);
      this.props.setTimerHandle(handle);
      // set the new bpm
      this.props.setCount(0);
      this.props.setBPM(bpm);
    } else {
      // otherwise, just update the bpm
      this.props.setBPM(bpm);
    }
  };

  playClick = () => {
    const count = this.props.metronome.count;
    const beatsPerMeasure = this.props.metronome.beatsPerMeasure;
    // alternate click sounds
    if (count % beatsPerMeasure === 0) {
      this.click2.play();
    } else {
      this.click1.play();
    }

    // keep track of which beat we're on
    this.props.setCount((count + 1) % beatsPerMeasure);
  };

  startStop = () => {
    if (this.props.metronome.isPlaying) {
      // stop the timer
      clearInterval(this.props.metronome.timerHandle);

      this.props.stopMetronome();
    } else {
      // start a timer with current bpm
      let handle = setInterval(
        this.playClick,
        (60 / this.props.metronome.bpm) * 1000
      );
      this.props.setTimerHandle(handle);

      this.props.startMetronome();
      this.props.setCount(0);
    }
  };

  render() {
    const isPlaying = this.props.metronome.isPlaying;
    const bpm = this.props.metronome.bpm;

    return (
      <div className="metronome">
        <div className="bpm-slider">
          <p>{bpm} BPM</p>
          <Slider
            color="secondary"
            min={40}
            max={208}
            value={bpm}
            onChange={this.handleInputChange}
          />
        </div>
        <Button color="secondary" onClick={this.startStop}>
          {isPlaying ? "Stop" : "Start"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    metronome: state.metronome,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startMetronome: () => dispatch(startMetronome()),
    stopMetronome: () => dispatch(stopMetronome()),
    setBPM: (bpm) => dispatch(setBPM(bpm)),
    setBeatsPerMeasure: (beats) => dispatch(setBeatsPerMeasure(beats)),
    setCount: (count) => dispatch(setCount(count)),
    setTimerHandle: (handle) => dispatch(setTimerHandle(handle)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Metronome);
