import React, { useEffect, useState } from "react";
import AdminNavBar from "../NavBar/AdminNavBar";
import axios from "axios";
import Loading from "../../Loading/Loading";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FlightHandleCard from "./FlightHandleCard";
import "./FlightHandle.scss";
const FlightHandle = () => {
  const [allFlights, setAllFlights] = useState(null);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");
  const [updateCardDetails, setUpdateCardDetails] = useState();
  const navigate = useNavigate();

  const getAllFlights = async () => {
    const { data } = await axios.get("/api/v1/all/flights");
    setAllFlights(data);
  };

  const getUserDetails = async () => {
    const { data } = await axios.get("/api/v1/me");
    setUser(data);
    setRole(data?.user?.role);
  };

  const [display, setDisplay] = useState("none");
  const appearCard = () => {
    if (display == "none") {
      setDisplay("flex");
    } else {
      setDisplay("none");
    }
  };
  useEffect(() => {
    if (role == "user") {
      toast.error("You are not Authorized !!");
      navigate("/");
    }
    getUserDetails();
    getAllFlights();
  }, [role]);
  return (
    <>
      {user != null && user?.success == true && role == "admin" ? (
        <>
          <AdminNavBar />
          <div className="content color-change admin-flight">
            <div className="update-card" style={{ display: display }}>
              <i className="bx bx-x-circle icon cross" onClick={appearCard}></i>
              <div className="update-card-cont">
                <div className="update-input">
                  <label htmlFor="company">Company</label>
                  <input
                    type="text"
                    value={updateCardDetails?.company}
                    onChange={(e) => {
                      setUpdateCardDetails({
                        ...updateCardDetails,
                        company: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="update-input">
                  <label htmlFor="company">From</label>
                  <input
                    type="text"
                    value={updateCardDetails?.from}
                    onChange={(e) => {
                      setUpdateCardDetails({
                        ...updateCardDetails,
                        from: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="update-input">
                  <label htmlFor="company">To</label>
                  <input
                    type="text"
                    value={updateCardDetails?.to}
                    onChange={(e) => {
                      setUpdateCardDetails({
                        ...updateCardDetails,
                        to: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="update-input">
                  <label htmlFor="company">Departure Date</label>
                  <input
                    type="text"
                    value={updateCardDetails?.departure}
                    onChange={(e) => {
                      setUpdateCardDetails({
                        ...updateCardDetails,
                        departure: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="update-input">
                  <label htmlFor="company">Landing Date</label>
                  <input
                    type="text"
                    value={updateCardDetails?.landing}
                    onChange={(e) => {
                      setUpdateCardDetails({
                        ...updateCardDetails,
                        landing: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="update-input">
                  <label htmlFor="company">Departure Time</label>
                  <input
                    type="text"
                    value={updateCardDetails?.departureTime}
                    onChange={(e) => {
                      setUpdateCardDetails({
                        ...updateCardDetails,
                        departureTime: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="update-input">
                  <label htmlFor="company">Landing Time</label>
                  <input
                    type="text"
                    value={updateCardDetails?.landingTime}
                    onChange={(e) => {
                      setUpdateCardDetails({
                        ...updateCardDetails,
                        landingTime: e.target.value,
                      });
                    }}
                  />
                </div>
                <button>Update</button>
              </div>
            </div>
            <h1>All Flights</h1>

            <div className="all-flight-admin">
              {allFlights?.flights?.map((flight, key) => (
                <>
                  <FlightHandleCard
                    item={flight}
                    key={key}
                    updateFunc={setUpdateCardDetails}
                    appearCard={appearCard}
                  />
                </>
              ))}
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default FlightHandle;
