import React, { Component } from 'react';
// import ReactDOM from "react-dom";
import './Cookie.css'
import LeftCookie from '../Assets/cookie-left.png'
import RightCookie from '../Assets/cookie-right.png'

export class Cookie extends Component {
  constructor() {
    super()
    this.state = {
      animationFinished: false,
      classNames: ""
    }
  }


  startStopAnimation = () => {
    const { classNames } = this.state;
    this.setState({ classNames: classNames ? "" : "Animation" });
  };
  
  onAnimationStart = () => {
    this.setState({
      animationFinished: false,
    });
  };

  onAnimationEnd = () => {
    this.setState({
      animationFinished: true,
    });
  };


  // const [breakLeft, setBreakLeft, breakRight, setBreakRight] = React.useSate(0)

  render() {
    // const { animationFinished } = this.state;
    return (
      <section 
        className="WholeCookie"
        onClick={this.startStopAnimation}
      >
        <img 
          className={`LeftCookie${this.state.classNames}`} 
          src={LeftCookie} 
          onAnimationStart={() => this.onAnimationStart}
          onAnimationEnd={() => this.onAnimationEnd}
        />
        <img 
          className={`RightCookie${this.state.classNames}`} 
          src={RightCookie}  
          onAnimationStart={() => this.onAnimationStart}
          onAnimationEnd={() => this.onAnimationEnd}
        />
      </section>
    )
  }
}

export default Cookie;