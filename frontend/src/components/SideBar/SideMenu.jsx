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
    if (isAuthenticated) {
      const { data } = await axios.get("/api/v1/me");
      setUser(data?.user);
    }
  };

  const LogoutHandler = async () => {
    await axios.post("/api/v1/logout");
    toast.success("Logged Out SuccessFully");

    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };
  useEffect(() => {
    if (isAuthenticated) {
      getUserDetails();
    }
  }, [isAuthenticated]);
  return (
    <>
      <nav class="sidebar close">
        <header>
          <div
            class="image-text"
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/me");
            }}
          >
            <span class="image">
              <img
                src={
                  user?.avatar?.url
                    ? user?.avatar?.url
                    : "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
                }
                alt=""
              />
            </span>

            <div class="text logo-text">
              <span class="name">{user?.name ? user?.name : "Guest User"}</span>
            </div>
          </div>

          <i
            class="bx bx-chevron-right toggle"
            onClick={() => {
              document.querySelector("nav").classList.toggle("close");
              document
                .querySelector(".content")
                .classList.toggle("content-big");
            }}
          ></i>
        </header>

        <div class="menu-bar">
          <div class="menu">
            <ul class="menu-links">
              <li class="nav-link">
                <NavLink to="/">
                  <i class="bx bx-home-alt icon"></i>
                  <span class="text nav-text">Home</span>
                </NavLink>
              </li>

              <li class="nav-link">
                <NavLink to="/flight">
                  <i class="bx bxs-plane icon"></i>

                  <span class="text nav-text">Flights</span>
                </NavLink>
              </li>

              <li class="nav-link">
                <NavLink to="/tour">
                  <i class="bx bx-book icon"></i>
                  <span class="text nav-text">Tour</span>
                </NavLink>
              </li>
            </ul>
          </div>

          <div class="bottom-content">
            {user ? (
              <li
                class=""
                style={{ cursor: "pointer" }}
                onClick={LogoutHandler}
              >
                <i class="bx bx-log-out icon"></i>
                <span class="text nav-text">Logout</span>
              </li>
            ) : (
              <li
                class=""
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate("/login");
                }}
              >
                <i class="bx bx-log-in icon"></i>
                <span class="text nav-text">Login</span>
              </li>
            )}

            <li class="mode">
              <div class="sun-moon">
                <i class="bx bx-moon icon moon"></i>
                <i class="bx bx-sun icon sun"></i>
              </div>
              <span class="mode-text text">Dark mode</span>

              <div
                class="toggle-switch"
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
                <span class="switch"></span>
              </div>
            </li>
          </div>
        </div>
      </nav>
    </>
  );
};

export default SideMenu;
