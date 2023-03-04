import React from "react";
import "./FlightCard.scss";
const FlightCard = ({ item }) => {
  return (
    <div className="flight-card color-change">
      <p>
        <b>AirLines :</b> {item?.company}
      </p>
      <p>
        <b>From :</b> {item?.from}
      </p>
      <p>
        <b>To :</b> {item?.to}
      </p>
      <p>
        <b>Departure Date :</b> {item?.departure}
      </p>
      <p>
        <b>Landing Date :</b> {item?.landing}
      </p>
      <p>
        <b>Departure Time :</b> {item?.departureTime}
      </p>
      <p>
        <b>Landing Time :</b> {item?.landingTime}
      </p>
      <p>
        <b>Ticket Price :</b> {item?.ticketPrice}
      </p>
    </div>
  );
};

export default FlightCard;
