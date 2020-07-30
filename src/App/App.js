import React, { Component } from 'react'; 
import './App.css';
import './MediaQueries.css';
import { render } from '@testing-library/react';
import {getOneCookie} from '../ApiCalls';


class App extends Component {
  constructor() {
    super();
    this.state = {
      cookies: []
    }
  }
  fetchOneCookie = async  () => {
    const cookie = await getOneCookie();
    await this.setState({ cookies: [...cookie, ...this.state.cookies]})
  }
  render() {
    return (
      <div className="App">
        <section className="App-header">
          {/* <NavBar /> */}
          <section className="Main-page">
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
