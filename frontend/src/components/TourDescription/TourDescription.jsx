import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "../Tour/Card";
import "./TourDescription.scss";
const TourDescription = () => {
  const [tour, setTour] = useState();
  const [suggestedTours, setSuggestedTours] = useState();
  const params = useParams();
  const navigate = useNavigate();
  const fetchDetails = async () => {
    const { data } = await axios.get(`/api/v1/get/tour/${params?.id}`);

    setTour(data);
  };

  const fetchSuggestedTours = async () => {
    const { data } = await axios.get("/api/v1/get/all/tours");
    setSuggestedTours(data?.tours);
    var arr = [];
    var length = data?.tours?.length;

    for (var i = 0; i < Math.min(3, length); i++) {
      arr.push(data?.tours[i]);
    }
    setSuggestedTours(arr);
  };

  useEffect(() => {
    fetchDetails();
    fetchSuggestedTours();
  }, []);
  return (
    <div className="content">
      <div className="tour-info-cont">
        <img src={tour?.tour?.image?.url} alt="" />
        <div className="tour-info">
          <div className="tour-info-child">
            <b>Destination : </b>
            <p>{tour?.tour?.destination}</p>
          </div>
          <div className="tour-info-child">
            <b>Flight Details : </b>
            <div>
              <li>Airlines : {tour?.tour?.flights?.company}</li>

              <li>From : {tour?.tour?.flights?.from}</li>

              <li>To : {tour?.tour?.flights?.to}</li>

              <li>Departure Date : {tour?.tour?.flights?.departure}</li>

              <li>Departure Time : {tour?.tour?.flights?.departureTime}</li>

              <li>Landing Date : {tour?.tour?.flights?.landing}</li>

              <li>Landing Time : {tour?.tour?.flights?.landingTime}</li>
            </div>
          </div>
          <div className="tour-info-child">
            <b>Hotel Details : </b>

            <li>Hotel Name : {tour?.tour?.hotelDetails?.name}</li>
          </div>
          <div className="tour-info-child">
            <b>Events Included : </b>
            {tour?.tour?.eventDetails?.map((item, key) => (
              <li>{item.name}</li>
            ))}
          </div>
          <div className="tour-info-child">
            <button>Book Tour</button>
            <button
              onClick={() => {
                navigate("/contact");
              }}
            >
              Have Questions
            </button>
          </div>
        </div>
      </div>

      <div className="suggestions">
        {suggestedTours?.map((suggTour, key) => (
          <Card item={suggTour} key={key} />
        ))}
      </div>
    </div>
  );
};

export default TourDescription;
