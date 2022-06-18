import React from 'react'

 function NoteWhite(props) {
  return (
    <div
                key={props.keyObj.midi}
                className={"key-white"}
                style={props.style}
                onPointerDown={(e) => props.pressKey(props.keyObj, true)}
                onPointerUp={(e) => props.releaseKey(props.keyObj, true)}
        
              ></div>
  )
}
export default NoteWhite