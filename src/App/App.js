import React, { Component } from 'react'; 
import './App.css';
import './MediaQueries.css';
import { render } from '@testing-library/react';
import { getOneCookie } from '../ApiCalls';
import { CookiePaper } from '../CookiePaper/CookiePaper';
import { Cookie } from '../Cookie/Cookie';
import { NavBar } from '../NavBar/NavBar';
import arrowSVG from '../Assets/arrow.svg';

export class App extends Component {
	constructor() {
		super();
		this.state = {
			cookies: [],
			isClicked: false,
			isOpen: false,
			isCookieHidden: true,
			currentIndex: 0
		}
	}
	
	fetchOneCookie = async  () => {
		const cookie = await getOneCookie();
		this.setState({ cookies: [...cookie, ...this.state.cookies]})
		this.setState({isClicked: false})
		this.setState({isOpen: false})
		this.setState({isCookieHidden: false})
		this.setState({currentIndex: 0})
	}

	incrementIndex = () => {
		if(this.state.cookies.length - 1 > this.state.currentIndex)
		this.setState({currentIndex: this.state.currentIndex + 1})
	}
	decrementIndex = () => {
		if(this.state.currentIndex >= 1)
		this.setState({currentIndex: this.state.currentIndex - 1})
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
								currentIndex={this.state.currentIndex}
							/>
						</section>
						<section className="navContainer">
							<section className="back-arrow" onClick={this.incrementIndex}></section>
							<button 
								className="button"
								onClick={this.fetchOneCookie}
							>
							</button>
							<section className="front-arrow" onClick={this.decrementIndex}></section>
						</section>
						{/* <button><section className="front-arrow"></section></button> */}
					</section>
					{/* <NavBar /> */}
				</section>
			</div>
		);
	}
}

export default App;
