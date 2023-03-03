import axios from "axios";
import React, { useState } from "react";
import "./login.scss";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export const LoginAndOut = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupEmail, setSignUpEmail] = useState("");
  const [signupPassword, setSignUpPassword] = useState("");
  const [signupName, setSignUpName] = useState("");
  const [signupUserName, setSignUpUserName] = useState("");

  const navigate = useNavigate();
  const signUpHandler = async (e) => {
    e.preventDefault();
    if (
      signupName == "" ||
      signupEmail == "" ||
      signupPassword == "" ||
      signupUserName == ""
    ) {
      toast.error("Please fill in all the details");
      return;
    }
    const info = {
      name: signupName,
      password: signupPassword,
      email: signupEmail,
      username: signupUserName,
      avatar: {
        public_id: "1234",
        url: "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745",
      },
    };
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post("/api/v1/register", info, config);

    if (data?.success == true) {
      toast.success("Registration Successfull !!");
      navigate("/");
    } else {
      toast.error(data?.message);
    }
  };
  const loginHandler = async (e) => {
    e.preventDefault();
    if (loginEmail == "" || loginPassword == "") {
      toast.error("Please fill in all the details");
      return;
    }

    const info = {
      email: loginEmail,
      password: loginPassword,
    };
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post("/api/v1/login", info, config);

    if (data?.success == true) {
      toast.success("Login in SuccessFull");
      navigate("/");
    } else {
      toast.error(data?.message);
    }
  };
  return (
    <div>
      <section class="wrapper">
        <div
          class="form signup"
          onClick={() => {
            document.querySelector(".wrapper").classList.remove("active");
          }}
        >
          <header
            onClick={() => {
              document.querySelector(".wrapper").classList.remove("active");
            }}
          >
            Signup
          </header>
          <form>
            <input
              type="text"
              placeholder="Full name"
              required
              value={signupName}
              onChange={(e) => {
                setSignUpName(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="User name"
              required
              value={signupUserName}
              onChange={(e) => {
                setSignUpUserName(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Email address"
              required
              value={signupEmail}
              onChange={(e) => {
                setSignUpEmail(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={signupPassword}
              onChange={(e) => {
                setSignUpPassword(e.target.value);
              }}
            />
            <input type="submit" value="Signup" onClick={signUpHandler} />
          </form>
        </div>

        <div
          class="form login"
          onClick={() => {
            document.querySelector(".wrapper").classList.add("active");
          }}
        >
          <header
            onClick={() => {
              document.querySelector(".wrapper").classList.add("active");
            }}
          >
            Login
          </header>
          <form action="#">
            <input
              type="text"
              placeholder="Email address"
              required
              value={loginEmail}
              onChange={(e) => {
                setLoginEmail(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={loginPassword}
              onChange={(e) => {
                setLoginPassword(e.target.value);
              }}
            />

            <input type="submit" value="Login" onClick={loginHandler} />
          </form>
        </div>

        {/* <script>
        const wrapper = document.querySelector(".wrapper"),
          signupHeader = document.querySelector(".signup header"),
          loginHeader = document.querySelector(".login header");

        loginHeader.addEventListener("click", () => {
          wrapper.classList.add("active");
        });
        signupHeader.addEventListener("click", () => {
          wrapper.classList.remove("active");
        });
      </script> */}
      </section>
    </div>
  );
};
