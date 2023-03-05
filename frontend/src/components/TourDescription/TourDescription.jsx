import axios from "axios";
import React, { useEffect, useState } from "react";
import { redirect, useNavigate, useParams } from "react-router-dom";
import { Card } from "../Tour/Card";
import "./TourDescription.scss";
import Loading from "../Loading/Loading";
import { toast } from "react-toastify";
const TourDescription = () => {
  const [tour, setTour] = useState(null);
  const [suggestedTours, setSuggestedTours] = useState(null);
  const params = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const fetchDetails = async () => {
    const { data } = await axios.get(`/api/v1/get/tour/${params?.id}`);

    setTour(data);
  };
  const getUserDetails = async () => {
    const { data } = await axios.get("/api/v1/me");
    setUser(data);
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

  const bookTour = async () => {
    if (user !== null && user?.user?.name) {
      toast("Initializing Payment !!");
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        "/api/v1/create-check-out",
        tour.tour,
        config
      );
      const tourDet = JSON.stringify({ type: "tour", tour: tour?.tour });
      localStorage.setItem("booking", tourDet);
      window.location.href = data?.url;
      // }
    } else {
      toast.error("Please Login to buy tour");
    }
  };

  useEffect(() => {
    getUserDetails();
    fetchDetails();
    fetchSuggestedTours();
  }, []);
  return (
    <>
      {suggestedTours == null || tour == null ? (
        <Loading />
      ) : (
        <div className="content color-change">
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
                <button onClick={bookTour}>Book Tour</button>
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
      )}
    </>
  );
};

export default TourDescription;
