import React from "react";
import "./Slider.scss";
import leftArrow from "./left-arrow.svg";
import rightArrow from "./right-arrow.svg";

export default function BtnSlider({ direction, moveSlide }) {
  return (
    <button
      onClick={moveSlide}
      className={direction === "next" ? "next btn-slide" : "btn-slide prev"}
    >
      <img src={direction === "next" ? rightArrow : leftArrow} />
    
    </button>
  );
}
