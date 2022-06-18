import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";
import { connect } from "react-redux";
import { stopRecording } from "actions";
import { recorder } from "utils/Recorder";
import InputAdornment from '@mui/material/InputAdornment';

function SaveAudioMenu(props) {
  const [fileName, setFileName] = useState("recording");

  const saveAudio = (e) => {
    props.stopRecording();
    recorder.stop().then((blob) => {
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.download = fileName + ".webm";
      anchor.href = url;
      anchor.click();
    });
  };
  
  const discardAudio = ()=>{
    props.stopRecording();
    recorder.stop().then((blob) => {
        
      });
  }
  const handleChange = (event) => {
    
    setFileName(event.target.value)
  };
  
  return (
    <FormControl>
      <InputLabel htmlFor="my-input">File Name</InputLabel>
      <Input id="my-input" defaultValue="recording" onChange={handleChange} endAdornment={<InputAdornment position="end">.webm</InputAdornment>}/>
      <Button onClick={saveAudio} variant="contained" disabled={fileName.length>0?false:true}>Save</Button>
      <Button onClick={discardAudio} variant="outlined">Discard</Button>
    </FormControl>
  );
}

export default SaveAudioMenu
