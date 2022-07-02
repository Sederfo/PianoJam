import React, { useEffect } from "react";
import SampleLibrary from "libs/Tonejs-Instruments";
import { recorder } from "utils/Recorder";
import { Note } from "@tonaljs/tonal";
import * as Tone from 'tone'

export default class MidiTest extends React.Component {
  componentDidMount() {
    navigator.requestMIDIAccess().then(this.onMIDISuccess, this.onMIDIFailure);

    this.recorder = recorder;
    // passing an array of instrument names will load all the instruments listed returning a new object, 
// each property a tone.js object
this.instruments = SampleLibrary.load({
  instruments: ["piano","harmonium","violin"]
  });

// waits for instrument sound files to load from /samples/
console.log(Tone)
console.log(Tone.Buffer)
Tone.Buffer.on('load', function() {
     // play instrument sound
     this.instruments['piano'].toMaster();
     this.instruments['piano'].triggerAttack("A3");
     });
  }


  onMIDISuccess = (midiAccess) => {
    console.log("midi ready")
    //assign midi listeners
    for (var input of midiAccess.inputs.values()) {
      input.onmidimessage = this.getMIDIMessage;
    }
  };
  playNote = (note) => {
    try {
      this.piano.triggerAttack(Note.fromMidiSharps(note));
    } catch (error) {
      console.error(error)
    }
  };

  stopNote = (note) => {
    try {
      this.piano.triggerRelease(Note.fromMidiSharps(note));
    } catch (error) {
      console.error(error)
    }
  };
  onMIDIFailure = (msg) => {};

  getMIDIMessage = (message) => {
    if (message.data[0] === 144) {
      console.log("note on", message.data[1])
      this.playNote(message.data[1])
    }
    if (message.data[0] === 128) {
      console.log("note off", message.data[1])
      this.stopNote(message.data[1])
    }
  };
  render() {
    return <><button onClick={()=>{this.piano["piano"].triggerAttack("C4")}}>play piano</button></>;
  }
}
