import React, { Component } from 'react'; 
import './App.css';
import './MediaQueries.css';
import { render } from '@testing-library/react';
import {getOneCookie} from '../ApiCalls';
import { CookiePaper } from '../CookiePaper/CookiePaper';
import { Cookie } from '../Cookie/Cookie';
import { NavBar } from '../NavBar/NavBar'

export class App extends Component {
  constructor() {
    super();
    this.state = {
      cookies: [],
      isClicked: false,
      isOpen: false,
    }
  }
  
  // componentDidMount = () => {
  //   this.fetchOneCookie()
  // }

  fetchOneCookie = async  () => {
    const cookie = await getOneCookie();
    this.setState({ cookies: [...cookie, ...this.state.cookies]})
    this.setState({isClicked: false})
    this.setState({isOpen: false})
  }
  handleFortuneClick = () => {
    this.setState({isClicked: !this.state.isClicked})
  }
  handleNavOpen = () => {

  }
  render() {
    return (
      <div className="App">
        <section className="App-header">
         {/* <NavBar 
           isOpen={this.state.isOpen}
         /> */}
          <section className="Main-page">
            <section className="Cookie-container">
              <Cookie
                isOpen={this.state.isOpen}
              />
              <CookiePaper 
                cookies={this.state.cookies}
                handleFortuneClick={this.handleFortuneClick}
                isClicked={this.state.isClicked}
              />
            </section>
            <button 
              className="button"
              onClick={this.fetchOneCookie}
            >
            </button>
          </section>
        </section>
      </div>
    );
  }
}

export default App;
