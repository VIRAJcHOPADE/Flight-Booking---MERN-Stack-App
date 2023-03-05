import React, { useEffect, useState } from "react";
import "./tours.scss";
import { Card } from "./Card";
import axios from "axios";
import Loading from "../Loading/Loading";
export const Tours = () => {
  const [keyword, setKeyWord] = useState("");
  const [tours, setTours] = useState(null);
  const fetchTours = async () => {
    setTours(null);
    if (keyword == "") {
      const { data } = await axios.get("/api/v1/get/all/tours");
      setTours(data);
    } else {
      const { data } = await axios.get(`/api/v1/get/tours/${keyword}`);
      setTours(data);
    }
  };
  useEffect(() => {
    fetchTours();
  }, [keyword]);
  return (
    <div className="content">
      <div className="searchBar">
        <input
          type="text"
          placeholder="Type in your destination"
          value={keyword}
          onChange={(e) => {
            setKeyWord(e.target.value);
          }}
        />
      </div>
      {tours == null ? (
        <Loading />
      ) : (
        <ul class="cards">
          {tours?.tours?.map((tour) => (
            <>
              <li>
                <Card item={tour} />
              </li>
            </>
          ))}
        </ul>
      )}
    </div>
  );
};
