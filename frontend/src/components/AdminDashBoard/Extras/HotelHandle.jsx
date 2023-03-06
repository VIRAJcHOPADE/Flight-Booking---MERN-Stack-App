import React, { useEffect, useState } from "react";
import AdminNavBar from "../NavBar/AdminNavBar";
import { toast } from "react-toastify";
import "./extras.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../../Loading/Loading";
const HotelHandle = () => {
  const [eventDetail, setEventDetail] = useState({
    name: "",
    destination: "",
    roomPrice: 0,
    roomsLeft: 0,
  });
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");

  const createHotelHandler = async () => {
    if (eventDetail.name == "" || eventDetail.destination == "") {
      toast.error("Please fill in all the details !!");
      return;
    }

    if (eventDetail.eventPrice <= 0) {
      toast.error("Please enter a valid price !!");
      return;
    }

    if (eventDetail.roomsLeft <= 0) {
      toast.error("Please enter valid number of rooms !!");
      return;
    }
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      "/api/v1/admin/create/hotel",
      eventDetail,
      config
    );

    if (data?.success == true) {
      toast.success("Hotel Added Successfuly");
    } else {
      toast.error(data?.message);
    }
  };

  const navigate = useNavigate();

  const getUserDetails = async () => {
    const { data } = await axios.get("/api/v1/me");
    setUser(data);
    setRole(data?.user?.role);
  };

  useEffect(() => {
    getUserDetails();
  });

  useEffect(() => {
    if (role == "user") {
      toast.error("You are not Authorized !!");
      navigate("/");
    }
    getUserDetails();
  }, [role]);

  useEffect(() => {
    if (user?.success == false) {
      toast.error("Unauthorized Access !!");
      navigate("/");
    }
  }, [user]);
  return (
    <>
      <AdminNavBar />

      {user != null && user?.success == true && role == "admin" ? (
        <>
          <div className="content create-div-cont color-change">
            <div className="create-div">
              <h1>Add Hotel</h1>

              <div className="create-form">
                <div>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    value={eventDetail.name}
                    onChange={(e) => {
                      setEventDetail({ ...eventDetail, name: e.target.value });
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="destination">Destination</label>
                  <input
                    type="text"
                    value={eventDetail.destination}
                    onChange={(e) => {
                      setEventDetail({
                        ...eventDetail,
                        destination: e.target.value,
                      });
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="destination">Room Price</label>
                  <input
                    type="number"
                    value={eventDetail.roomPrice}
                    onChange={(e) => {
                      setEventDetail({
                        ...eventDetail,
                        roomPrice: e.target.value,
                      });
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="destination">Rooms Left</label>
                  <input
                    type="number"
                    value={eventDetail.roomsLeft}
                    onChange={(e) => {
                      setEventDetail({
                        ...eventDetail,
                        roomsLeft: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <button onClick={createHotelHandler}>Create</button>
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

export default HotelHandle;
