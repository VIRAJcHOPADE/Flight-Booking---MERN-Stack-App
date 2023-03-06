import axios from "axios";
import React from "react";
import { toast } from "react-toastify";

const FlightHandleCard = ({ item, updateFunc, appearCard }) => {
  const deleteCardHandler = async () => {
    const { data } = await axios.delete(
      `/api/v1/admin/delete/flight/${item?._id}`
    );

    if (data?.success) {
      toast.success(data?.message);
      setTimeout(() => {
        window.location.reload();
      }, 4000);
    } else {
      toast.error(data?.message);
    }
  };
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

      <div className="card-btns">
        <div
          className="update-button"
          onClick={() => {
            appearCard();
            updateFunc(item);
          }}
        >
          Update
        </div>
        <div
          className="delete-button"
          onClick={() => {
            deleteCardHandler();
          }}
        >
          Delete
        </div>
      </div>
    </div>
  );
};

export default FlightHandleCard;
