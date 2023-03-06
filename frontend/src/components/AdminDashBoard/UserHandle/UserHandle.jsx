import React, { useEffect, useState } from "react";
import "./UserHandle.scss";
import UserHandleCard from "./UserHandleCard";

import AdminNavBar from "../NavBar/AdminNavBar";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../../Loading/Loading";
export const UserHandle = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");

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
  }, [role]);
  return (
    <>
      <AdminNavBar />
      {user != null && user?.success == true && role == "admin" ? (
        <>
          <div className="content color-change"></div>
        </>
      ) : (
        <>
          <Loading />
        </>
      )}
    </>
  );
};
