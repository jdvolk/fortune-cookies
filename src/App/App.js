import React, { Component } from 'react'; 
import './App.css';
import './MediaQueries.css';
import { render } from '@testing-library/react';
import {getOneCookie} from '../ApiCalls';
import { CookiePaper } from '../CookiePaper/CookiePaper';
import { Cookie } from '../Cookie/Cookie';
import { NavBar } from '../NavBar/NavBar';

export class App extends Component {
	constructor() {
		super();
		this.state = {
			cookies: [],
			isClicked: false,
			isOpen: false,
			isCookieHidden: true
		}
	}
	
	fetchOneCookie = async  () => {
		const cookie = await getOneCookie();
		this.setState({ cookies: [...cookie, ...this.state.cookies]})
		this.setState({isClicked: false})
		this.setState({isOpen: false})
		this.setState({isCookieHidden: false})
	}

	handlePaperClick = () => {
		this.setState({isClicked: !this.state.isClicked})
	}

	handleCookieOpen = () => {
		this.setState({isOpen: !this.state.isOpen});
	}
	
	handleCookieUnmount = () => {
		this.setState({isCookieHidden: !this.state.isCookieHidden});
	}

	render() {
		return (
			<div className="App">
				<section className="App-header">
				 {/* <NavBar 
					 isOpen={this.state.isOpen}
				 /> */}
					<section className='Main-page'>
						<section className='Cookie-container'>
						{!this.state.isCookieHidden &&
							<Cookie
								isOpen={this.state.isOpen}
								classNames={this.state.classNames}
								isCookieHidden={this.state.isCookieHidden}
								handleCookieOpen={this.handleCookieOpen}
								handleCookieUnmount={this.handleCookieUnmount}
								// onAnimationEnd={this.onAnimationEnd}
							/>
						}
							<CookiePaper
								cookies={this.state.cookies}
								handlePaperClick={this.handlePaperClick}
								isClicked={this.state.isClicked}
								isOpen={this.state.isOpen}
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
