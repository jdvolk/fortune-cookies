import React, { Component } from 'react';
import './CookiePaper.css';

export default class CookiePaper extends Component {
	constructor(props) {
		super(props)
		this.state = {
			play: false
		}
	}

	// audio = this.props.cookies[this.props.currentIndex];

	togglePlay = () => {
		const audio = new Audio(this.props.cookies[this.props.currentIndex].audioUrl)
		this.setState({play: !this.state.play}, () => {
			 audio.play() ;
		})
		
	}

	render = () => {
		if(this.props.error) {
			const fortuneCookie = {fortune: {message: this.props.error}, lotto: {numbers: "There was an error retrieving your cookie"}}
			return (
				<>
					<button 
						className={this.props.isOpen ? "cookie-paper" : "hidden"}
						data-testid="cookie-paper"
						onClick={this.props.resetError}
					>
						<section className="Cookie">
							<section className="Fortune"> 
								<p>Sorry! <br /> {fortuneCookie.fortune.message} <br /> Please try again Later</p>
							</section>
						</section>
					</button>
				</>
			)
		}
		if(this.props.cookies.length === 0) {
			return (
				<p>Press button for cookie</p>
			)
		} else if (!this.props.isClicked && !this.state.play) {
			const fortuneCookie = this.props.cookies[this.props.currentIndex]
			return ( 
				<button 
					className={this.props.isOpen ? "cookie-paper" : "hidden"}
					data-testid="cookie-paper"
					onClick={this.props.handlePaperClick}
				>
					<section className="Cookie">
						<section className="Fortune"> 
							<h3>Fortune:</h3>
							<p>{fortuneCookie.fortune.message}</p>
						</section>
						<section className="Lucky-nums"> 
							<h3>Lucky Numbers!</h3>
							<p>{fortuneCookie.lotto.numbers.toString()}</p>
						</section> 
					</section>
				</button>
			)
		} else {
			const fortuneCookie = this.props.cookies[this.props.currentIndex];
			// console.log(fortuneCookie.lesson.chinese);
			// const audioUrl = await this.props.handleTextToSpeech(fortuneCookie.lesson.chinese);
			return (
				<>
					<button
						className="cookie-paper"
						data-testid="cookie-paper"
						onClick={this.props.handlePaperClick}
					>
						<section>
								<section className="Lesson"> 
									<h3>Learn Chinese:</h3>
									<p> {fortuneCookie.lesson.english} </p>
									<p> {fortuneCookie.lesson.chinese} </p>
									<p> {fortuneCookie.lesson.pronunciation} </p>
									
								</section> 
							</section>
							<section 
								onClick={this.togglePlay}
								className="audio-pronunciation"
							> {this.state.play ? 'Play': 'Play'}
								<audio src={fortuneCookie.audioUrl}></audio>
						</section>
					</button>
				</>
			)
		}
	}
}