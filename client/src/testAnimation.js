import React from "react";
import { Box } from "@mui/system";
import classNames from "classnames";

class testAnimation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        moveUp:false,
        className:"trailingNote"
    }
   
  }

  applyClassName = () => {
      

    let className = classNames({
      trailingNote: true,
      "trailingNote-moveUp": this.state.moveUp,
    });
    
    this.setState({
        moveUp: !this.state.moveUp,
        className:className
    })
    
  };

  render() {
      
    return (
      <>
        <div
      
          className={this.state.className}
          style={{
            width: `2%`,
            left: `30%`,
            bottom: `200px`,
            height: `$20px`,
            position: "absolute",
          }}
        >
          testAnimation
        </div>
        <button onClick={this.applyClassName}>Press me</button>
      </>
    );
  }
}

export default testAnimation;
