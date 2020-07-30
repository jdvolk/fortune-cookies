import React, { Component } from 'react'; 
import './App.css';
import './MediaQueries.css';
import { render } from '@testing-library/react';
import {getOneCookie} from '../ApiCalls';
import { Cookie } from '../Cookie/Cookie';


class App extends Component {
  constructor() {
    super();
    this.state = {
      cookies: [],
      isClicked: false
    }
  }
  
  // componentDidMount = () => {
  //   this.fetchOneCookie()
  // }

  fetchOneCookie = async  () => {
    const cookie = await getOneCookie();
    this.setState({ cookies: [...cookie, ...this.state.cookies]})
    // this.setState({isClicked: true})
  }
  // handleClick = (props) => {
    
  // }
  render() {
    return (
      <div className="App">
        <section className="App-header">
          {/* <NavBar /> */}
          <section className="Main-page">
          
            <section className="Cookie-container">

              <Cookie cookies={this.state.cookies} />
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
