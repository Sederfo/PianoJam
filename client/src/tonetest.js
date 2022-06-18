import React from "react";
import * as Tone from "tone";

class Component extends React.Component {
    constructor(){
        super()
        this.state={showDiv3:true, showDiv4:true}
    }

    render() {
        
      return (
        <>
            <button onClick={()=>{
                this.setState({showDiv3:!this.state.showDiv3})
            }}>play div3</button>
            <button onClick={()=>{
                this.setState({showDiv4:!this.state.showDiv4})
            }}>play div4</button>
          <div className="div1">1</div>
          <div className="div2">2</div>
          {this.state.showDiv3 ? <div className="div3">3</div> : null}
          {this.state.showDiv4 ? <div className="div3">4</div> : null}
        </>
      );
    }
  }

  
export default Component