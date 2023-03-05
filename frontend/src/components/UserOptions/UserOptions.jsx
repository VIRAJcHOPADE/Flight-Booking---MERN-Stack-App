import React, { useRef } from "react";
import { SpeedDial } from "primereact/speeddial";
import { Toast } from "primereact/toast";
import "./UserOptions.scss";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // theme
import "primereact/resources/primereact.css"; // core css
import "primeicons/primeicons.css"; // icons
import "primeflex/primeflex.css";
import { useNavigate } from "react-router-dom";
const UserOptions = () => {
  const toast = useRef(null);
  const navigate = useNavigate();
  const items = [
    {
      label: "Add",
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
