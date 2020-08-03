import React from 'react';
import "./NavBar.css";
import arrowSVG from '../Assets/arrow.svg';

export const NavBar = () => {
    return (
      <section className="Nav-bar">
      <img src={arrowSVG} alt="back arrow" />
      {/* <button
        className="button forward-button"
      ></button> */}
    </section>
    )
}