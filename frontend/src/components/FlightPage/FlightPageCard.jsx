import axios from "axios";
import React from "react";
import "./FlightPageCard.scss";
import { toast } from "react-toastify";
export const FlightPageCard = ({ item, isAllowed }) => {
  console.log(isAllowed);
  const buyNow = async (e) => {
    if (isAllowed == false) {
      toast.error("Please Login to Buy this ticket");
      return;
    }
    e.preventDefault();

    toast("Initializong Payment...");

    if (item?.seatsLeft == 0) {
      toast.error("NO SEATS AVAILABLE !!");
      return;
    }
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      "/api/v1/create-check-out",
      {
        name: `Flight from ${item?.from} to ${item?.to}`,
        image:
          "https://imageio.forbes.com/specials-images/imageserve/63506e73c20026a55ac9a291/0x0.jpg?format=jpg&width=1200",
        packagePrice: item?.ticketPrice,
      },
      config
    );
    const flightDet = JSON.stringify({ type: "flight", flight: item });
    localStorage.setItem("booking", flightDet);
    window.location.href = data?.url;
  };
  return (
    <div>
      <div class="blog-card">
        <div class="description">
          <div className="side-by-side">
            <div class="fromto">
              <span>
                <b>Company: </b>
                {item?.company}
              </span>
            </div>
            <div class="fromto">
              <span>
                <b>Tickets Left: </b>
                {item?.seatsLeft}
              </span>
            </div>
          </div>
          <div className="side-by-side">
            <div class="fromto">
              <span>
                <b>Departure Date: </b>
                {item?.departure}
              </span>
            </div>
            <div class="fromto">
              <span>
                <b>Landing Date: </b>
                {item?.landing}
              </span>
            </div>
          </div>
          <div class="rows">
            <div class="fromto bordorpl">
              <span>From: {item?.from}</span>
            </div>
            <div class="fromto bordorpl">
              <span>To: {item?.to}</span>
            </div>
          </div>

          <div id="timeline-divider">
            <span>
              <i
                className="bx bxs-plane icon"
                style={{ transform: "rotate(90deg)" }}
              ></i>
            </span>
            <hr class="new2" />
            <span>
              <i
                className="bx bxs-plane icon"
                style={{ transform: "rotate(90deg)" }}
              />
            </span>
          </div>

          <div class="rows">
            <div class="fromto bordorpl">
              <span>Time: {item?.departureTime}</span>
            </div>
            <div class="fromto bordorpl">
              <span>Time: {item?.landingTime}</span>
            </div>
          </div>
        </div>
        <div class="btns">
          <div class="price">
            <span>Price: ₹{item.ticketPrice}</span>
          </div>
          <button class="custom-btn-2 btn-3">
            <span onClick={buyNow}>Buy Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};
