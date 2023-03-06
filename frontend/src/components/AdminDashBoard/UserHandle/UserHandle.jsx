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
  const [updateCardDetails, setUpdateCardDetails] = useState(null);

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

  const updateUserHandler = async () => {
    appearCard();

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      "/api/v1/admin/update/user",
      {
        id: updateCardDetails._id,
        name: updateCardDetails.name,
        email: updateCardDetails.email,
        username: updateCardDetails.username,
      },
      config
    );

    if (data?.success == true) {
      toast.success(data?.message);
    } else {
      toast.error(data?.message);
    }

    setTimeout(() => {
      window.location.reload();
    }, 4000);
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
            <div className="update-card" style={{ display: display }}>
              <i className="bx bx-x-circle icon cross" onClick={appearCard}></i>
              <div className="update-card-cont">
                <div className="update-input">
                  <label htmlFor="company">Name</label>
                  <input
                    type="text"
                    value={updateCardDetails?.name}
                    onChange={(e) => {
                      setUpdateCardDetails({
                        ...updateCardDetails,
                        name: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="update-input">
                  <label htmlFor="company">Username</label>
                  <input
                    type="text"
                    value={updateCardDetails?.username}
                    onChange={(e) => {
                      setUpdateCardDetails({
                        ...updateCardDetails,
                        username: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="update-input">
                  <label htmlFor="company">Email</label>
                  <input
                    type="text"
                    value={updateCardDetails?.email}
                    onChange={(e) => {
                      setUpdateCardDetails({
                        ...updateCardDetails,
                        email: e.target.value,
                      });
                    }}
                  />
                </div>

                <button onClick={updateUserHandler}>Update</button>
              </div>
            </div>
            <div className="admin-users-heading">
              <h1>All Users</h1>
            </div>

            <div className="all-users-admin">
              {allUsers?.users?.map((user, key) => (
                <>
                  <UserHandleCard
                    item={user}
                    key={key}
                    updateFunc={setUpdateCardDetails}
                    appearCard={appearCard}
                    data={updateCardDetails}
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
