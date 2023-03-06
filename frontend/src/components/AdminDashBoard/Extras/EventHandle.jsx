import React, { useState } from "react";
import AdminNavBar from "../NavBar/AdminNavBar";
import { toast } from "react-toastify";
import "./extras.scss";
import axios from "axios";
const EventHandle = () => {
  const [eventDetail, setEventDetail] = useState({
    name: "",
    destination: "",
    eventPrice: 0,
  });

  const createEventHandler = async () => {
    if (eventDetail.name == "" || eventDetail.destination == "") {
      toast.error("Please fill in all the details !!");
      return;
    }

    if (eventDetail.eventPrice <= 0) {
      toast.error("Please enter a valid price !!");
      return;
    }
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      "/api/v1/admin/create/event",
      eventDetail,
      config
    );

    if (data?.success == true) {
      toast.success("Event Created Successfuly");
    } else {
      toast.error(data?.message);
    }
  };

  return (
    <>
      <AdminNavBar />

      <div className="content create-div-cont color-change">
        <div className="create-div">
          <h1>Add Event</h1>

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
              <label htmlFor="destination">Price</label>
              <input
                type="number"
                value={eventDetail.eventPrice}
                onChange={(e) => {
                  setEventDetail({
                    ...eventDetail,
                    eventPrice: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          <button onClick={createEventHandler}>Create</button>
        </div>
      </div>
    </>
  );
};

export default EventHandle;
