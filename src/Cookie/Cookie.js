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

  render() {
    return (
      <section 
        className={this.props.isCookieHidden? "WholeCookieHidden" : "WholeCookieAnimation"}
        // onAnimationEnd={() => this.onAnimationEnd}
        onClick={this.handleClick}
      >
        <img 
          className={this.state.isClicked? 'LeftCookieAnimation' : 'LeftCookie'}
          src={LeftCookie}  
        />
        <img 
          className={this.state.isClicked? 'RightCookieAnimation' : 'RightCookie'} 
          src={RightCookie}  
          onAnimationEnd={this.props.handleCookieUnmount}
        />
      </section>
    )
  }
}

export default Cookie;