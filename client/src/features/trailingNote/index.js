import React, { useState, useEffect } from "react";
import "assets/styles/trailingNote.css";
import { connect } from "react-redux";
import { css } from "@emotion/css";

const TrailingNote = (props) => {
  const [height, setHeight] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [activeInterval, setActiveInterval] = useState(null);

  //this fires at component mount
  useEffect(() => {
    //start increasing height continously
    if (activeInterval) return;
    setActiveInterval(
      () => {return setInterval(() => setHeight((prevHeight) => prevHeight + 10), 100)}
    );
    
  }, []);

  //here, check if the note is no longer active
  useEffect(() => {
    
    // check if the note still exists in activeKeys
    if (props.activeKeys.findIndex((x) => x.ansi === props.note.ansi) === -1) {
      // it's no longer active, so start moving up
      clearInterval(activeInterval);
      setActiveInterval(null);
      setIsDone(true);

      // set timeout to remove note after 5 seconds
      setTimeout(()=>{
        props.removeNote(props.id)
      }, 5000)
    }
  }, [props.activeKeys]);

  return (
    <div
      className={css`
        position: absolute;
        background-color: ${props.color};
        width: ${props.width}%;
        height: ${height}px;
        transition: height 0.1s linear, transform 5s linear;
        left: ${props.note.left}%;
        bottom: 0px;
        z-index: -1;

        ${isDone ? "transform: translateY(-1000px)" : ""}
      `}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    theme: state.theme,
    activeKeys: state.activeKeys,
  };
};

export default connect(mapStateToProps, null)(TrailingNote);
