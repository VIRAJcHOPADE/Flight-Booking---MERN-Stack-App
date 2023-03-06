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
  const [allUsers, setAllUsers] = useState();
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

  const getAllUsers = async () => {
    const { data } = await axios.get("/api/v1/admin/users");
    setAllUsers(data);
  };

  useEffect(() => {
    if (role == "user") {
      toast.error("You are not Authorized !!");
      navigate("/");
    }
    getUserDetails();
    getAllUsers();
  }, [role]);
  return (
    <>
      <AdminNavBar />
      {user != null && user?.success == true && role == "admin" ? (
        <>
          <div className="content color-change admin-user">
            <div className="admin-users-heading">
              <h1>All Users</h1>
            </div>

            <div className="all-users-admin">
              {allUsers?.users?.map((user, key) => (
                <>
                  <UserHandleCard
                    item={user}
                    key={key}
                    // updateFunc={setUpdateCardDetails}
                    appearCard={appearCard}
                  />
                </>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <Loading />
        </>
      )}
    </>
  );
};
