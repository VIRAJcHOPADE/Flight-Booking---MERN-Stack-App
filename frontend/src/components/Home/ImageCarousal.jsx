import * as React from "react";
import Carousel from "framer-motion-carousel";
import "./ImageCarousal.scss";

export const ImageCarousal = (props) => (
  <div className="carousal_main">
    <Carousel autoPlay={false}>
      {props?.images?.map((item, i) => (
        <img src={item} key={i} className="image" />
      ))}
    </Carousel>
  </div>
);
