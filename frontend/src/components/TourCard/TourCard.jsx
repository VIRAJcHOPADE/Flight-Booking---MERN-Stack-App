import React from "react";
import { useNavigate } from "react-router-dom";
import "./TourCard.scss";

const TourCard = ({ item }) => {
  const navigate = useNavigate();
  const redirectTour = async () => {
    navigate(`/tours/${item?._id}`);
  };
  return (
    <div className="tour-card color-change" onClick={redirectTour}>
      <img src={item?.image?.url} alt="" />
      <div>
        <p>
          <b>Package Name </b>
          {item?.name}
        </p>
        <p>
          <b>Desitnation </b>
          {item?.destination}
        </p>
        <p>
          <b>Tour Price </b>
          {item?.packagePrice}
        </p>
      </div>
    </div>
  );
};

export default TourCard;
