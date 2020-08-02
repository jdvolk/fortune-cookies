import React, { Component } from 'react';
// import ReactDOM from "react-dom";
import './Cookie.css'
import LeftCookie from '../Assets/cookie-left.png'
import RightCookie from '../Assets/cookie-right.png'

export class Cookie extends Component {
  constructor(props) {
    super(props)
    this.state = {
      animationFinished: false,
      classNames: "",
      isClicked: false
    }
  }
  
  handleClick = () => {
    this.setState({isClicked: !this.state.isClicked});
    this.props.handleCookieOpen();
  }

  startStopAnimation = () => {
    const { classNames } = this.state;
    this.setState({ classNames: classNames ? "" : "Animation" });

    this.props.handleCookieOpen();
  };
  
  // onAnimationStart = () => {
  //   this.setState({
  //     animationFinished: false,
  //   });
  // };

  // onAnimationEnd = () => {
  //   console.log("bruh")
  //   this.setState({
  //     animationFinished: true,
  //   });
  // };


  // const [breakLeft, setBreakLeft, breakRight, setBreakRight] = React.useSate(0)

  render() {

    // const { animationFinished } = this.state;
    return (
      <section 
        className={this.props.isCookieHidden? "WholeCookieHidden" : "WholeCookieAnimation"}
        // onAnimationEnd={() => this.onAnimationEnd}
        onClick={this.handleClick}
      >
        <img 
          className={this.state.isClicked? 'LeftCookieAnimation' : 'LeftCookie'}
          src={LeftCookie}  
          // onAnimationStart={() => this.onAnimationStart}
          // onAnimationEnd={() => this.onAnimationEnd}
        />
        <img 
          className={this.state.isClicked? 'RightCookieAnimation' : 'RightCookie'} 
          src={RightCookie}  
          // onAnimationStart={() => this.onAnimationStart}
          onAnimationEnd={this.props.handleCookieUnmount}
        />
      </section>
    )
  }
}

export default Cookie;