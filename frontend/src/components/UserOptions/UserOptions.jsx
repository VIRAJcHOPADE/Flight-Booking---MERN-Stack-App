import React, { useEffect, useRef, useState } from "react";
import { SpeedDial } from "primereact/speeddial";
import { Toast } from "primereact/toast";
import "./UserOptions.scss";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // theme
import "primereact/resources/primereact.css"; // core css
import "primeicons/primeicons.css"; // icons
import "primeflex/primeflex.css";

import axios from "axios";

import { useNavigate } from "react-router-dom";
const UserOptions = () => {
  const toast = useRef(null);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const getUserDetails = async () => {
    const { data } = await axios.get("/api/v1/me");
    setUser(data?.user);
  };

  const LogoutHandler = async () => {
    await axios.post("/api/v1/logout");
    toast.success("Logged Out SuccessFully");

    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  useEffect(() => {
    getUserDetails();
  }, []);
  const items = [
    {
      label: user ? "Logout" : "Login",
      icon: user ? "pi-arrow-left" : "pi-arrow-right",

      command: () => {
        if (user) {
          LogoutHandler();
        } else {
          navigate("/login");
        }
      },
    },
    {
      label: "Home",
      icon: "pi pi-home",
      command: () => {
        navigate("/");
      },
    },
    {
      label: "Flights",
      icon: "pi pi-car",
      command: () => {
        navigate("/flight");
      },
    },
    {
      label: "Tours",
      icon: "pi pi-book",
      command: () => {
        navigate("/tour");
      },
    },
    {
      label: "Contact",
      icon: "pi pi-phone",
      command: () => {
        navigate("/contact");
      },
    },
  ];
  return (
    <div className="card-t">
      <div style={{ position: "relative", height: "500px" }}>
        <Toast ref={toast} />
        <SpeedDial
          model={items}
          direction="up"
          style={{ left: "calc(50% - 2rem)", bottom: 0 }}
        />
      </div>
    </div>
  );
};

export default UserOptions;
