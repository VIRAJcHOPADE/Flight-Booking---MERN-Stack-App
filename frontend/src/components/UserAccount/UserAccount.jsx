import axios from "axios";
import React, { useEffect, useState } from "react";
import "./UserAccount.scss";
import { toast } from "react-toastify";
import FlightCard from "../FlightCard/FlightCard";
import TourCard from "../TourCard/TourCard";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
const UserAccount = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [avatar, setAvatar] = useState();
  const [file, setFiles] = useState(null);
  const [newAvatar, setNewAvatar] = useState();
  const [success, setSuccess] = useState();
  const getUserDetails = async () => {
    const { data } = await axios.get("/api/v1/me");
    setUser(data);
    setSuccess(data?.success);
    setName(data?.user?.name);
    setEmail(data?.user?.email);
    setUserName(data?.user?.username);
    setAvatar(data?.user?.avatar);
    console.log(data);
  };
  const [change, setChange] = useState(true);

  const activateUserProfile = () => {
    setChange(!change);
  };
  useEffect(() => {
    getUserDetails();
  }, []);
  useEffect(() => {
    if (success == false) {
      navigate("/login");
    }
  }, [success]);

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

  const createPoster = async () => {
    if (file !== null) {
      // console.log("hi");
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
        setAvatar(thisData);
        toast.success("Profile Picture Uploaded Successfully!!");
        setTimeout(() => {
          updateProfile();
        }, 2000);
      }, 6000);
    } else {
      updateProfile();
    }
  };

  const updateProfile = async () => {
    setTimeout(async () => {
      const Userdata = {
        name,
        email,
        username,
        avatar: {
          public_id: newAvatar?.public_id,
          url: newAvatar?.url,
        },
      };
      toast.warning("Updating Info...Please Wait");
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.put("/api/v1/me/update", Userdata, config);
      if (data?.success == true) {
        toast.success("User Details updated Successfully");
        // window.location.reload();
      }
    }, 3000);
  };

  return (
    <>
      {name ? (
        <>
          <div className="content color-change user-details">
            <div className="user-details-cont">
              <button className="updateDetails" onClick={activateUserProfile}>
                Update User Details
              </button>
              <div className="user-avatar">
                <img
                  src={avatar?.url}
                  alt=""
                  style={{ borderRadius: "50%", objectFit: "contain" }}
                />
                <div className="profile-pic-input">
                  <input type="file" onChange={handleFile} />
                  <button
                    style={{
                      display: change == true ? "none" : "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Change Profile Picture
                  </button>
                </div>
              </div>

              <div className="user-details-info">
                <div className="user-info">
                  <label htmlFor="name">Name</label>
                  <input
                    disabled={change}
                    value={name}
                    className={change ? "" : "active-change"}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  ></input>
                </div>
                <div className="user-info">
                  <label htmlFor="username">Username</label>
                  <input
                    disabled={change}
                    value={username}
                    className={change ? "" : "active-change"}
                    onChange={(e) => {
                      setUserName(e.target.value);
                    }}
                  ></input>
                </div>
                <div className="user-info">
                  <label htmlFor="email">Email</label>
                  <input
                    disabled={change}
                    value={email}
                    className={change ? "" : "active-change color-change"}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div className="info-update">
                  <button
                    style={{ display: change == true ? "none" : "flex" }}
                    onClick={createPoster}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="content color-change my-flights">
            <h2>My Flights</h2>
            <div className="all-flights">
              {user?.user?.flights?.length == 0 ? (
                <div className="no-flights">
                  You don't have any flights booked yet
                </div>
              ) : (
                <div className="flight-main-cards">
                  {user?.user?.flights?.map((flight, key) => (
                    <FlightCard key={key} item={flight} />
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className=" content color-change my-tours">
            <h2>My Tours</h2>
            <div className="all-tours">
              {user?.user?.tourPackage?.length == 0 ? (
                <div className="no-tours">
                  You don't have any Tours booked yet
                </div>
              ) : (
                <div className="tour-main-cards">
                  {user?.user?.tourPackage?.map((tour, key) => (
                    <TourCard key={key} item={tour} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="content">
          <Loading />
        </div>
      )}
    </>
  );
};

export default UserAccount;
