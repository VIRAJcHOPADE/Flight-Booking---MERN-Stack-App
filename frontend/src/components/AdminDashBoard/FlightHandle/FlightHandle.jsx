import React, { useEffect, useState } from "react";
import AdminNavBar from "../NavBar/AdminNavBar";
import axios from "axios";
import Loading from "../../Loading/Loading";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const FlightHandle = () => {
  const [allFlights, setAllFlights] = useState(null);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");
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
          <div className="content"></div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default FlightHandle;
