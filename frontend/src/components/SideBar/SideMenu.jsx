import axios from "axios";
import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../../auth/isAuthenticated";
import { toast } from "react-toastify";
import "./SideMenu.scss";
import { NavLink, useNavigate } from "react-router-dom";
const SideMenu = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const getUserDetails = async () => {
    const { data } = await axios.get("/api/v1/me");
    setUser(data?.user);
  };

  const LogoutHandler = async () => {
    await axios.post("/api/v1/logout");
    toast.success("Logged Out SuccessFully");
    navigate("/");
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };
  useEffect(() => {
    getUserDetails();
  }, []);
  return (
    <>
      <nav className="sidebar close">
        <header>
          <div
            className="image-text"
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/me");
            }}
          >
            <span className="image">
              <img
                src={
                  user?.avatar?.url
                    ? user?.avatar?.url
                    : "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
                }
                alt=""
              />
            </span>

            <div className="text logo-text">
              <span className="name">
                {user?.name ? user?.name : "Guest User"}
              </span>
            </div>
          </div>

          <i
            className="bx bx-chevron-right toggle"
            onClick={() => {
              document.querySelector("nav").classList.toggle("close");
              document
                .querySelector(".content")
                .classList.toggle("content-big");
            }}
          ></i>
        </header>

        <div className="menu-bar">
          <div className="menu">
            <ul className="menu-links">
              <li className="nav-link">
                <NavLink to="/">
                  <i className="bx bx-home-alt icon"></i>
                  <span className="text nav-text">Home</span>
                </NavLink>
              </li>

              <li className="nav-link">
                <NavLink to="/flight">
                  <i className="bx bxs-plane icon"></i>

                  <span className="text nav-text">Flights</span>
                </NavLink>
              </li>

              <li className="nav-link">
                <NavLink to="/tour">
                  <i className="bx bx-book icon"></i>
                  <span className="text nav-text">Tour</span>
                </NavLink>
              </li>

              <li className="nav-link">
                <NavLink to="/contact">
                  <i className="bx bx-phone icon"></i>
                  <span className="text nav-text">Contact Us</span>
                </NavLink>
              </li>
              {user?.role == "admin" ? (
                <li className="nav-link">
                  <NavLink to="/dashboard/users">
                    <i className="bx bxs-dashboard icon"></i>
                    <span className="text nav-text">DashBoard</span>
                  </NavLink>
                </li>
              ) : (
                <></>
              )}
            </ul>
          </div>

          <div className="bottom-content">
            {user ? (
              <li
                className=""
                style={{ cursor: "pointer" }}
                onClick={LogoutHandler}
              >
                <i className="bx bx-log-out icon"></i>
                <span className="text nav-text">Logout</span>
              </li>
            ) : (
              <li
                className=""
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate("/login");
                }}
              >
                <i className="bx bx-log-in icon"></i>
                <span className="text nav-text">Login</span>
              </li>
            )}

            <li className="mode">
              <div className="sun-moon">
                <i className="bx bx-moon icon moon"></i>
                <i className="bx bx-sun icon sun"></i>
              </div>
              <span className="mode-text text">Dark mode</span>

              <div
                className="toggle-switch"
                onClick={() => {
                  document.querySelector("body").classList.toggle("dark");
                  document
                    .querySelector("body")
                    .querySelector(".color-change")
                    .classList.toggle("dark-color");
                  if (
                    document.querySelector("body").classList.contains("dark")
                  ) {
                    document.querySelector(".mode-text").innerText =
                      "Light mode";
                  } else {
                    document.querySelector(".mode-text").innerText =
                      "Dark mode";
                  }
                }}
              >
                <span className="switch"></span>
              </div>
            </li>
          </div>
        </div>
      </nav>
    </>
  );
};

export default SideMenu;
