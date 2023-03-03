import React, { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";

import { NavLink } from "react-router-dom";
import { Home, Flight, Tour, Login } from "@mui/icons-material";
import { isAuthenticated } from "../../auth/isAuthenticated";
import axios from "axios";
const SideBar = () => {
  const { collapseSidebar } = useProSidebar();
  const [user, setUser] = useState(null);

  const [backGroundColor, setBackGroundColor] = useState("rgba(0,0,0,0.05)");
  const getUserDetails = async () => {
    if (isAuthenticated) {
      const { data } = await axios.get("/api/v1/me");
      setUser(data?.user);
      console.log(data);
    }
  };

  const setBackGroundColorHandler = () => {
    if (backGroundColor == "rgba(0,0,0,0.05)") {
      setBackGroundColor("rgb(11,41,72)");
    } else {
      setBackGroundColor("rgb(0,0,0,0.05)");
    }
  };

  useEffect(() => {
    getUserDetails();
  }, [isAuthenticated]);
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar backgroundColor={backGroundColor}>
        <Menu>
          <div>
            {isAuthenticated && user?.name != "" ? (
              <MenuItem
                icon={
                  <img
                    src={user?.avatar?.url}
                    style={{ height: "2em", width: "2em" }}
                  />
                }
                component={<NavLink to="/me" />}
              >
                {user?.name}
              </MenuItem>
            ) : (
              <MenuItem icon={<Login />} component={<NavLink to="/login" />}>
                Login
              </MenuItem>
            )}
            <MenuItem icon={<Home />} title={Home}>
              Home
            </MenuItem>
            <MenuItem icon={<Flight />} component={<NavLink to="/flights" />}>
              Flights
            </MenuItem>

            <MenuItem icon={<Tour />} component={<NavLink to="/tour" />}>
              Tour
            </MenuItem>
          </div>
        </Menu>
      </Sidebar>
      <main>
        <button onClick={() => collapseSidebar()}> {"<"} </button>
      </main>
    </div>
  );
};

export default SideBar;
