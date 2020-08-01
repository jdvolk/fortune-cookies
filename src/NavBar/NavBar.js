import React from 'react';
import "./NavBar.css";

export const NavBar = () => {
  if(this.props.isOpen) {
    return (
      <section className="Nav-bar">
      <button
        className="button Nav-button"
      ></button>
    </section>
    )
  } else {
    return (
      <section className="Nav-bar">
        
      </section>
    )
  }
}