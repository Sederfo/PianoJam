import React, { useState } from "react";
import { SketchPicker } from "react-color";
import ModalComponent from "modal";
import { Button, Grid } from "@mui/material";
import { connect } from "react-redux";
import {
  setBackgroundColor,
  setWhiteNoteTrailColor,
  setBlackNoteTrailColor,
  resetTheme,
} from "actions";

function ColorPickerMenu(props) {
  const [backgroundColor, setBackgroundColor] = useState("#EDE0D4");
  const [whiteNoteTrailColor, setWhiteNoteTrailColor] = useState("#000000");
  const [blackNoteTrailColor, setBlackNoteTrailColor] = useState("#000000");

  const colorPickerStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100rm",
    height: "100rm",
    p: 4,
  };

  const handleBackgroundColorChange = (color) => {
    document.body.style.backgroundColor = color.hex;
    setBackgroundColor(color.hex);
  };

  const handleKeyWhiteColorChange = (color) => {
    props.setWhiteNoteTrailColor(color.hex);
    setWhiteNoteTrailColor(color.hex);
  };

  const handleKeyBlackColorChange = (color) => {
    props.setBlackNoteTrailColor(color.hex);
    setBlackNoteTrailColor(color.hex);
  };

  const handleResetTheme = () => {
    document.body.style.backgroundColor = "#EDE0D4";
    props.resetTheme();
    setBackgroundColor("#EDE0D4");
    setWhiteNoteTrailColor("#000000");
    setBlackNoteTrailColor("#000000");
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item>
        <ModalComponent
          text="Background Color"
          component={
            <SketchPicker
              onChange={handleBackgroundColorChange}
              color={backgroundColor}
            />
          }
          style={colorPickerStyle}
          buttonStyle={{ color: "#06070E" }}
        />
      </Grid>
      <Grid item>
        <ModalComponent
          text="White Keys Trails Color"
          component={
            <SketchPicker
              onChange={handleKeyWhiteColorChange}
              color={whiteNoteTrailColor}
            />
          }
          style={colorPickerStyle}
          buttonStyle={{ color: "#06070E" }}
        />
      </Grid>

      <Grid item>
        <ModalComponent
          text="Black Keys Trails Color"
          component={
            <SketchPicker
              onChange={handleKeyBlackColorChange}
              color={blackNoteTrailColor}
            />
          }
          style={colorPickerStyle}
          buttonStyle={{ color: "#06070E" }}
        />
      </Grid>

      <Grid item>
        <Button onClick={handleResetTheme} style={{ color: "#06070E" }}>
          Reset Theme
        </Button>
      </Grid>
    </Grid>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setBackgroundColor: (color) => dispatch(setBackgroundColor(color)),
    setWhiteNoteTrailColor: (color) => dispatch(setWhiteNoteTrailColor(color)),
    setBlackNoteTrailColor: (color) => dispatch(setBlackNoteTrailColor(color)),
    resetTheme: () => dispatch(resetTheme()),
  };
};
export default connect(null, mapDispatchToProps)(ColorPickerMenu);
