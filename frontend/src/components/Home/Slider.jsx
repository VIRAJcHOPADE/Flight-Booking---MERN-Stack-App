import React, { useState } from "react";
import "./Slider.scss";
import { useNavigate } from "react-router";
import { ImageCarousal } from "./ImageCarousal";

export default function Slider({ dataSlider }) {
  return (
    <ImageCarousal
      images={[
        "https://www.shutterstock.com/image-vector/travel-sale-banner-yellow-tag-260nw-1750129319.jpg",
        "https://www.shutterstock.com/image-vector/travel-sale-banner-yellow-tag-260nw-1750129319.jpg",
        "https://www.shutterstock.com/image-vector/travel-sale-banner-yellow-tag-260nw-1750129319.jpg",
        "https://www.shutterstock.com/image-vector/travel-sale-banner-yellow-tag-260nw-1750129319.jpg",
      ]}
    />
  );
}
