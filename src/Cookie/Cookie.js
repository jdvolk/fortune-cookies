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
          <p>{fortuneCookie.fortune.message}</p>
        </section> 
        <section className="Lesson"> 
          <p> {fortuneCookie.lesson.chinese} </p>
          <p> {fortuneCookie.lesson.pronunciation} </p>
          <p> {fortuneCookie.lesson.english} </p>
        </section> 
        <section className="Lucky-nums"> 
         <p>{fortuneCookie.lotto.numbers.toString()}</p>
       </section>
      </section>
      </button>

    )
  }
}