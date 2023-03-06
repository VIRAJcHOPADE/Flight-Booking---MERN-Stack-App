import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../Loading/Loading";
import AdminNavBar from "../NavBar/AdminNavBar";
import TourHandleCard from "./TourHandleCard";
import "./TourHandle.scss";
const TourHandle = () => {
  const [allTours, setAllTours] = useState(null);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");
  const [allFlights, setAllFlights] = useState([]);
  const [file, setFiles] = useState(null);
  const [newAvatar, setNewAvatar] = useState();

  const [updateCardDetails, setUpdateCardDetails] = useState({
    name: "",
    destination: "",
    packagePrice: 0,
    flights: "",
    hotelDetails: "",
  });
  const [updateCardDetails2, setUpdateCardDetails2] = useState({
    name: "",
    packagePrice: 0,
    destination: "",
    flights: "",
    hotelDetails: "",
    eventDetails: "",
    image: {
      public_id: "",
      url: "",
    },
  });

  const [hotels, setHotels] = useState();
  const [events, setEvents] = useState();
  const [destination, setDestination] = useState("");
  const navigate = useNavigate();

  const getAllTours = async () => {
    const { data } = await axios.get("/api/v1/get/all/tours");
    setAllTours(data);
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

  const [display2, setDisplay2] = useState("none");
  const appearCard2 = () => {
    if (display2 == "none") {
      setDisplay2("flex");
    } else {
      setDisplay2("none");
    }
  };

  const allHotelsFetch = async () => {
    const { data } = await axios.get(`/api/v1/search/hotel/${destination}`);
    setHotels(data?.hotels);
  };
  const allFlightsFetch = async () => {
    const { data } = await axios.get(`/api/v1/search/flight?to=${destination}`);
    setAllFlights(data?.flights);
  };
  const allEventsFetch = async () => {
    const { data } = await axios.get(`/api/v1/search/event/${destination}`);
    setEvents(data?.events);
  };

  const handleFile = (e) => {
    const files = Array.from(e.target.files);

    setFiles([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setFiles((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  // Updating details
  const updateFlightHandler = async () => {
    if (
      updateCardDetails.name == "" ||
      updateCardDetails.destination == "" ||
      updateCardDetails.hotelDetails == "" ||
      updateCardDetails.flights == "" ||
      updateCardDetails.packagePrice <= 0
    ) {
      toast.error("Please fill in valid details");
      return;
    }
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(
      "/api/v1/admin/update/tour",
      updateCardDetails,
      config
    );

    if (data?.success == true) {
      toast.success("Data Updated SuccessFully !!");
      appearCard();

      setTimeout(() => {
        window.location.reload();
      }, 4000);
    } else {
      toast.error(data?.message);
    }
  };

  // Creating new tour
  const updateFlightHandler2 = async () => {
    if (
      updateCardDetails2.name == "" ||
      updateCardDetails2.destination == "" ||
      updateCardDetails2.departure == "" ||
      updateCardDetails2.flights == "" ||
      updateCardDetails2.hotelDetails == "" ||
      updateCardDetails2.eventDetails == ""
    ) {
      toast.error("Please fill in valid details");
      return;
    }

    updateCardDetails2.image = {
      public_id: newAvatar?.public_id,
      url: newAvatar?.url,
    };
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      "/api/v1/admin/create/tour",
      updateCardDetails2,
      config
    );

    if (data?.success == true) {
      toast.success("Flight Created SuccessFully !!");
      appearCard2();

      setTimeout(() => {
        window.location.reload();
      }, 4000);
    } else {
      toast.error(data?.message);
    }
  };
  const createPoster = async () => {
    if (file !== null) {
      toast.warn("Please Wait...");
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "flight-booking");

      toast.warn("Uploading the Profile Picture");
      const { data } = await axios.post(
        "https://api.cloudinary.com/v1_1/kapil4457/image/upload",
        formData
      );
      setTimeout(() => {
        let thisData = {
          public_id: data?.public_id,
          url: data?.url,
        };
        setNewAvatar(thisData);
        toast.success("Profile Picture Uploaded Successfully!!");
        setTimeout(() => {
          updateFlightHandler2();
        }, 2000);
      }, 6000);
    } else {
      toast.error("Please select an image !!");
      return;
    }
  };

  useEffect(() => {
    if (destination != "") {
      allFlightsFetch();
      allHotelsFetch();
      allEventsFetch();
    }
  }, [destination]);

  useEffect(() => {
    if (role == "user") {
      toast.error("You are not Authorized !!");
      navigate("/");
    }
    getUserDetails();
    getAllTours();
  }, [role]);
  return (
    <>
      <AdminNavBar />
      {user != null && user?.success == true && role == "admin" ? (
        <div className="content color-change admin-tours">
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
                <label htmlFor="company">Destination</label>
                <input
                  type="text"
                  value={updateCardDetails?.destination}
                  onChange={(e) => {
                    setDestination(e.target.value);
                    setUpdateCardDetails({
                      ...updateCardDetails,
                      destination: e.target.value,
                    });
                  }}
                />
              </div>

              <div className="update-input">
                <label htmlFor="company">Package Price </label>
                <input
                  type="text"
                  value={updateCardDetails?.packagePrice}
                  onChange={(e) => {
                    setUpdateCardDetails({
                      ...updateCardDetails,
                      packagePrice: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="update-input">
                <label htmlFor="company">Flights from </label>
                <div className="flight-select">
                  <select
                    name="from"
                    id="from"
                    disabled={destination == "" ? true : false}
                    onChange={(e) => {
                      setUpdateCardDetails({
                        ...updateCardDetails,
                        flights: e.target.value,
                      });
                    }}
                  >
                    <option value={updateCardDetails?.flights?.from} hidden>
                      From
                    </option>
                    {allFlights?.map((flight, key) => (
                      <option value={flight?._id}>{flight?.from}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="update-input">
                <label htmlFor="company">Hotels </label>
                <select
                  name=""
                  id=""
                  onChange={(e) => {
                    setUpdateCardDetails({
                      ...updateCardDetails,
                      hotelDetails: e.target.value,
                    });
                  }}
                >
                  <option hidden>Select Hotel</option>

                  {hotels?.map((hotel, key) => (
                    <option key={key} value={hotel?._id}>
                      {hotel?.name}
                    </option>
                  ))}
                </select>
              </div>

              <button onClick={updateFlightHandler}>Update</button>
            </div>
          </div>
          <div className="update-card" style={{ display: display2 }}>
            <i className="bx bx-x-circle icon cross" onClick={appearCard2}></i>
            <div className="update-card-cont">
              <div className="update-input">
                <label htmlFor="company">Name</label>
                <input
                  type="text"
                  value={updateCardDetails2?.name}
                  onChange={(e) => {
                    setUpdateCardDetails2({
                      ...updateCardDetails2,
                      name: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="update-input">
                <label htmlFor="company">Destination</label>
                <input
                  type="text"
                  value={updateCardDetails2?.destination}
                  onChange={(e) => {
                    setDestination(e.target.value);
                    setUpdateCardDetails2({
                      ...updateCardDetails2,
                      destination: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="update-input">
                <label htmlFor="company">Package Price</label>
                <input
                  type="number"
                  value={updateCardDetails2?.packagePrice}
                  onChange={(e) => {
                    setUpdateCardDetails2({
                      ...updateCardDetails2,
                      packagePrice: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="update-input">
                <label htmlFor="company">Flights from </label>
                <div className="flight-select">
                  <select
                    name="from"
                    id="from"
                    disabled={destination == "" ? true : false}
                    onChange={(e) => {
                      setUpdateCardDetails2({
                        ...updateCardDetails2,
                        flights: e.target.value,
                      });
                    }}
                  >
                    <option hidden>From</option>
                    {allFlights?.map((flight, key) => (
                      <option value={flight?._id}>{flight?.from}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="update-input">
                <label htmlFor="company">Hotels </label>
                <select
                  name=""
                  id=""
                  onChange={(e) => {
                    setUpdateCardDetails2({
                      ...updateCardDetails2,
                      hotelDetails: e.target.value,
                    });
                  }}
                >
                  <option hidden>Select Hotel</option>

                  {hotels?.map((hotel, key) => (
                    <option key={key} value={hotel?._id}>
                      {hotel?.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="update-input">
                <label htmlFor="company">Events </label>
                <select
                  name=""
                  id=""
                  onChange={(e) => {
                    setUpdateCardDetails2({
                      ...updateCardDetails2,
                      eventDetails: e.target.value,
                    });
                  }}
                >
                  <option hidden>Select an event</option>

                  {events?.map((event, key) => (
                    <option key={key} value={event?._id}>
                      {event?.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="update-input">
                <label htmlFor="company">Image</label>
                <input type="file" onChange={handleFile} />
              </div>
              <button onClick={createPoster}>Create</button>
            </div>
          </div>
          <div className="admin-tour-heading">
            <h1>All Tours</h1>
            <button onClick={appearCard2}>Create +</button>
          </div>
          <div className="all-tour-admin">
            {allTours?.tours?.map((tour, key) => (
              <>
                <TourHandleCard
                  item={tour}
                  key={key}
                  updateFunc={setUpdateCardDetails}
                  data={updateCardDetails}
                  appearCard={appearCard}
                />
              </>
            ))}
          </div>
        </div>
      ) : (
        <>
          <Loading />
        </>
      )}
    </>
  );
};

export default TourHandle;
