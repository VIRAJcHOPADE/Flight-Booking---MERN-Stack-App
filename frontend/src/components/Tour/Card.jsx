import React from "react";
import "./tours.scss";
import { useNavigate } from "react-router-dom";
export const Card = ({ item }) => {
  const navigate = useNavigate();
  const redirectPage = async () => {
    navigate(`/tours/${item?._id}`);
  };
  return (
    <div>
      <div class="card">
        <img src={item?.image?.url} class="card__image" alt="" />
        <div class="card__overlay">
          <div class="card__header">
            <div class="card__header-text">
              <h3 class="card__title">{item?.name}</h3>
            </div>
          </div>
          <div class="disc">
            <div class="card__description">
              <div>
                <i class="bx bxs-plane icon"></i>
              </div>
            </div>
            <div class="card__description">
              <div>
                <i class="bx bx-building icon"></i>
              </div>
            </div>
            <div class="card__description">
              <div>
                <i class="bx bx-walk icon"></i>
              </div>
            </div>
            <div class="card__description">
              <div>
                <button class="custom-btn btn-10" onClick={redirectPage}>
                  Read More
                </button>
              </div>
            </div>
          </div>
          <div class="card__description bottomdis">
            <span class="pricet">Price: ₹{item?.packagePrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
