import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Success.scss";

const Success = () => {
  const navigate = useNavigate();
  const bookingFunc = async () => {
    try {
      if (!localStorage.getItem("booking")) {
        navigate("/");
      }
      const config = { headers: { "Content-Type": "application/json" } };
      var booking = JSON.parse(localStorage.getItem("booking"));
      console.log("booking", booking);
      console.log("Tour", booking.tour);
      if (booking.type == "tour") {
        const { data } = await axios.post(
          "/api/v1/me/book/tour",
          {
            tour: booking.tour._id,
          },
          config
        );
        toast.success(data.message);
        console.log(data);
      } else {
        const { data } = await axios.post(
          "/api/v1/me/book/flight",
          booking.flight,
          config
        );
        console.log(data);
        toast.success(data.message);
      }
    } catch (err) {}
  };
  useEffect(() => {
    bookingFunc();
  }, []);
  return (
    <div className="content content-check green" style={{ color: "green" }}>
      <i className="bx bx-check-circle icon"></i>
      Booking SuccessFull !!
      <div className="color-change">(You will soon receive an Email)</div>
    </div>
  );
};

export default Success;
