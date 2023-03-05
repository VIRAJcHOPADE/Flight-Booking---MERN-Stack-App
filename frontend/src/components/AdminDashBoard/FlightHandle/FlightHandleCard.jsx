import React from "react";

const FlightHandleCard = ({ item, updateFunc, appearCard }) => {
  return (
    <div className="flight-card-admin color-change">
      <div className="flight-card-info">
        <p>
          <b>Company : </b>
          {item?.company}
        </p>
        <p>
          <b>From : </b>
          {item?.from}
        </p>
        <p>
          <b>To : </b>
          {item?.to}
        </p>
        <p>
          <b>To : </b>
          {item?.to}
        </p>
        <p>
          <b>Departure Date : </b>
          {item?.departure}
        </p>
        <p>
          <b>Landing Date : </b>
          {item?.landing}
        </p>
        <p>
          <b>Departure Time : </b>
          {item?.departureTime}
        </p>
        <p>
          <b>Landing Time : </b>
          {item?.landingTime}
        </p>
        <p>
          <b>Seat Price : </b>₹ {item?.ticketPrice}
        </p>
        <p>
          <b>Seat Left : </b>
          {item?.seatsLeft}
        </p>
      </div>
      <div
        className="update-button"
        onClick={() => {
          appearCard();
          updateFunc(item);
        }}
      >
        Update
      </div>
    </div>
  );
};

export default FlightHandleCard;
