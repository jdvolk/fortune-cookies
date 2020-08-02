import React from 'react';
import LeftCookie from '../Assets/cookie-left.png'
import RightCookie from '../Assets/cookie-right.png'
import './CookiePaper.css';


export const CookiePaper = (props) => {
  if(props.cookies.length === 0) {
    return (
      <p>Press button for cookie</p>
    )
  } else if (!props.isClicked) {
    const fortuneCookie = props.cookies[0]
    console.log(fortuneCookie.fortune.message)
    return ( 
      <button 
        className={props.isOpen ? "cookie-paper" : "hidden"}
        onClick={props.handlePaperClick}
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
    const fortuneCookie = props.cookies[0]
    return (
    <button
      className="cookie-paper"
      onClick={props.handlePaperClick}
    >
      <section>
          <section className="Lesson"> 
            <h3>Learn Chinese:</h3>
            <p> {fortuneCookie.lesson.english} </p>
            <p> {fortuneCookie.lesson.chinese} </p>
            <p> {fortuneCookie.lesson.pronunciation} </p>
          </section> 
        </section>
      </button>
    )
  }
}