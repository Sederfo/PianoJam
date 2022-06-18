import React, {useEffect} from 'react'

export default function MidiTest() {

    useEffect(()=>{
        navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
    },[])

    const onMIDISuccess = (midiAccess) => {
        //assign midi listeners
        for (var input of midiAccess.inputs.values()) {
          input.onmidimessage = getMIDIMessage;
        }
        
      };
    
      const onMIDIFailure = (msg) => {
        
      };

      const getMIDIMessage = (message) =>{
          if (message.data[0] === 144){
              
          }
          if (message.data[0] === 128){
            
        }
      }
  return (
    <div>MidiTest</div>
  )
}
