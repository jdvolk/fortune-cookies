import React from 'react';
import './Cookie.css';

export const Cookie = (props) => {
  if(props.cookies.length === 0) {
    return (
      <p>Press button for cookie</p>
      )
    } else {
      const fortuneCookie = props.cookies[0]
      console.log(fortuneCookie.fortune.message)

    return ( 
      <button className="cookie-paper">
      <section className="Cookie">
        <section className="Fortune"> 
          <h3>Fortune:</h3>
          <p>{fortuneCookie.fortune.message}</p>
        </section> 
        <section className="Lesson"> 
          <h3>Learn Chinese:</h3>
          <p> {fortuneCookie.lesson.english} </p>
          <p> {fortuneCookie.lesson.chinese} </p>
          <p> {fortuneCookie.lesson.pronunciation} </p>
        </section> 
        <section className="Lucky-nums"> 
          <h3>Lucky Numbers!</h3>
          <p>{fortuneCookie.lotto.numbers.toString()}</p>
       </section>
      </section>
      </button>

    )
  }
}