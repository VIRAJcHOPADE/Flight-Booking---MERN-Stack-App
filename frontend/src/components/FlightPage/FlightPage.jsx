import axios from "axios";
import React, { useEffect, useState } from "react";
import { FlightPageCard } from "./FlightPageCard";
import "./FlightPage.scss";
const FlightPage = () => {
  const [keyword, setKeyWord] = useState("");
  const [flights, setFlights] = useState();

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [allTos, setAllTos] = useState(null);
  const fetchFlights = async () => {
    const { data } = await axios.get("/api/v1/all/flights");
    setFlights(data);
  };
  const getAllTos = async () => {
    const { data } = await axios.get("/api/v1/all/tos");
    console.log(data);
    setAllTos(data);
  };

  const searchFlights = async () => {
    if (keyword == "") {
      const { data } = await axios.get(
        `/api/v1/search/flight?from=${from}&&to=${to}`
      );
      console.log(data);
    } else {
      const { data } = await axios.get(
        `/api/v1/search/flight?keyword=${keyword}`
      );
      console.log(data);
    }
  };
  useEffect(() => {
    fetchFlights();

    if (to != "") {
      searchFlights();
    }
    if (from != "") {
      getAllTos();
    }
  }, [keyword, from, to]);
  return (
    <div className="content color-change">
      <div className="nav ">
        <div className="searchBar-flight">
          <input
            type="text"
            placeholder="Type in your destination"
            value={keyword}
            onChange={(e) => {
              setKeyWord(e.target.value);
            }}
          />
        </div>
        <div className="select-bars">
          <div class="select navlinks">
            <select
              class="selects"
              name=""
              id=""
              onChange={(e) => {
                setFrom(e.target.value);
              }}
            >
              <option value="" hidden>
                From
              </option>
              {flights?.flights?.map((fli, key) => (
                <option value={fli?.from}>{fli?.from}</option>
              ))}
            </select>
          </div>
          <div class="select navlinks">
            <select
              class="selects"
              name=""
              id=""
              onChange={(e) => {
                setTo(e.target.value);
              }}
              disabled={from == "" ? true : false}
            >
              <option value="" hidden>
                To..
              </option>
              {allTos?.flights?.map((fli, key) => (
                <option value={fli?.to}>{fli?.to}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <FlightPageCard />
    </div>
  );
};

export default FlightPage;
