import React from "react";
import "./FlightPageCard.scss";

export const FlightPageCard = () => {
  return (
    <div>
      <div class="blog-card">
        <div class="description">
          <div class="fromto">
            <span>Company: AirPakistan</span>
          </div>
          <div class="rows">
            <div class="fromto bordorpl">
              <span>From: Pune</span>
            </div>
            <div class="fromto bordorpl">
              <span>To: Mumbai</span>
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
              <span>Time: 3:20pm</span>
            </div>
            <div class="fromto bordorpl">
              <span>Time: 3:30pm</span>
            </div>
          </div>
        </div>
        <div class="btns">
          <div class="price">
            <span>Price: $20</span>
          </div>
          <button class="custom-btn btn-3">
            <span>Buy Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};
