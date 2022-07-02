import React, { useEffect, useState } from "react";
import classNames from "classnames";
import "../../assets/styles/keyboard.css";
import { notes, CalcNotePositions } from "../../config/notes";
import {
  activateKey,
  deactivateKey,
  setPedalLevel,
  setNotePositions,
  addTrailingNote,
  deleteTrailingNote,
  resetStore,
  stopMetronome,
  setRoomId,
} from "../../actions";
import { connect } from "react-redux";
import nextId from "react-id-generator";
import { socket } from "utils/WebSocket";
import { withRouter } from "utils/withRouter";

import { useSpring, animated } from "react-spring";

const noteLetters = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

function Keyboard(props) {
  const notePositions = CalcNotePositions();
  const whiteKeys = notes.filter((note) => note.type === "white");
  const blackKeys = notes.filter((note) => note.type === "black");

  const fadeFromDown = useSpring({
    from: { opacity: 0, transform: "translateY(40px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
  });

  useEffect(() => {
    // Anything in here is fired on component mount.
    props.setNotePositions(notePositions);

    try{
    navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);}
    catch (error){
      console.error(error)
    }

    props.setRoomId(props.roomId);

    // listen for receive-note messages from clients connected to the same room
    socket.on("receive-note-activated", (data) => {
      pressKey(data.note, false);
    });

    socket.on("receive-note-deactivated", (data) => {
      releaseKey(data.note, false);
    });
    return () => {
      // Anything in here is fired on component unmount.
      socket.emit("leave-room", props.roomId);
      props.resetStore();

      if (props.metronome.isPlaying) {
        clearInterval(props.metronome.timerHandle);
        props.stopMetronome();
      }
    };
  }, []);

  const onMIDISuccess = (midiAccess) => {
    //assign midi listeners
    for (var input of midiAccess.inputs.values()) {
      input.onmidimessage = getMIDIMessage;
    }
  };

  const onMIDIFailure = (msg) => {
    console.error(msg);
  };

  const getMIDIMessage = (message) => {
    console.log(message)
    let noteCommand = message.data[0];
    let noteMidi = message.data[1];

    //144 command - NOTE ON
    if (noteCommand === 144) {
      let noteObject = notes.find((obj) => {
        return obj.midi === noteMidi;
      });
      pressKey(noteObject, true);
    }

    //128 command - NOTE OFF
    if (noteCommand === 128) {
      let noteObject = notes.find((obj) => {
        return obj.midi === noteMidi;
      });
      releaseKey(noteObject, true);
    }
  };

  const whiteKeyStyle = () => {
    return {
      width: `${notePositions.whiteWidth}%`,
    };
  };

  const blackKeyStyle = (note) => {
    let pos = notePositions.leftPositions.find((lp) => lp.ansi === note.ansi);
    return {
      width: `${notePositions.blackWidth}%`,
      left: `${pos.left}%`,
    };
  };

  const pressKey = (note, socketEmit) => {
    props.playKey(note.ansi, props.pedalLevel);
    props.activateKey(note);

    if (socketEmit) {
      socket.emit("send-note-activated", {
        note: note,
        room: props.roomId,
      });
    }

    let trailingNote = { ...note };
    trailingNote.id = nextId();

    props.addTrailingNote(trailingNote);
  };

  const releaseKey = (note, socketEmit) => {
    props.stopKey(note.ansi, props.pedalLevel);
    props.deactivateKey(note);

    if (socketEmit) {
      socket.emit("send-note-deactivated", {
        note: note,
        room: props.roomId,
      });
    }
  };

  return (
    <animated.div style={fadeFromDown}>
      <div className="keyboard-container">
        <div className="key-wrap">
          {whiteKeys.map((key) => {
            const className = classNames({
              "key-white": true,
              "key-white-active":
                props.activeKeys.findIndex((k) => k.midi === key.midi) >= 0,
            });

            return (
              <div
                key={key.midi}
                className={className}
                style={whiteKeyStyle()}
                onPointerDown={(e) => pressKey(key, true)}
                onPointerUp={(e) => releaseKey(key, true)}
              ></div>
            );
          })}
          {blackKeys.map((key, index) => {
            const className = classNames({
              "key-black": true,
              "key-black-active":
                props.activeKeys.findIndex((k) => k.midi === key.midi) >= 0,
            });
            return (
              <div
                key={key.midi}
                className={className}
                style={blackKeyStyle(key, index)}
                onPointerDown={(e) => {
                  pressKey(key, true);
                }}
                onPointerUp={(e) => {
                  releaseKey(key, true);
                }}
              ></div>
            );
          })}
        </div>
      </div>
    </animated.div>
  );
}
const mapStateToProps = (state) => {
  return {
    activeKeys: state.activeKeys,
    pedalLevel: state.pedalLevel,
    trailingNotes: state.trailingNotes,
    metronome: state.metronome,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    activateKey: (key) => dispatch(activateKey(key)),
    deactivateKey: (key) => dispatch(deactivateKey(key)),
    setPedalLevel: (level) => dispatch(setPedalLevel(level)),
    setNotePositions: (notePositions) =>
      dispatch(setNotePositions(notePositions)),
    addTrailingNote: (note) => dispatch(addTrailingNote(note)),
    deleteTrailingNote: (note) => dispatch(deleteTrailingNote(note)),
    resetStore: () => dispatch(resetStore()),
    stopMetronome: () => dispatch(stopMetronome()),
    setRoomId: (roomId) => dispatch(setRoomId(roomId)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Keyboard));
