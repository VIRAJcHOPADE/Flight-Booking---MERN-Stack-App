import React from "react";
import Slider from "./Slider";
// import Footer from './footer/Footer'
import "../Tour/tours.scss";
import "./Home.scss";
import { Card } from "../Tour/Card";
import { useNavigate } from "react-router-dom";

const Row = ({ item }) => {
  const navigate = useNavigate();
  const redirectPage = async () => {
    navigate(`/tours/${item?._id}`);
  };
  return (
    <div>
      <div className="row">
        <div>
          <a href="" class="card card-2">
            <img src={item?.image?.url} class="card__image" alt="" />
            <div class="card__overlay">
              <div class="card__header">
                <svg class="card__arc" xmlns="http://www.w3.org/2000/svg">
                  <path />
                </svg>
                <img
                  class="card__thumb"
                  src="https://i.imgur.com/7D7I6dI.png"
                  alt=""
                />
                <div class="card__header-text">
                  <h3 class="card__title">{item.name}</h3>
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
          </a>
        </div>
      </div>
    </div>
  );
};

const item = {
  image: {
    url: "https://images.unsplash.com/photo-1528181304800-259b08848526?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dGhhaWxhbmR8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
  },
  name: "Goa Tour",
  packagePrice: 12200,
};
export const Home = () => {
  return (
    <div className="content home-main">
      <Slider />
      <h2>Trending</h2>
      <div className="genreBox">
        <Row item={item} />
      </div>
      <h2>Latest</h2>
      <div className="genreBox">
        <Row item={item} />
      </div>
    </div>
  );
};
