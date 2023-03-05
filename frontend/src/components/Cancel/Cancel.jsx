import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Cancel.scss";
const Cancel = () => {
  const navigate = useNavigate();
  const cancelPayment = () => {
    if (!localStorage.getItem("booking")) {
      navigate("/");
    }
    localStorage.removeItem("booking");
  };
  useEffect(() => {
    cancelPayment();
  }, []);
  return (
    <div className="content-check content">
      <i className="bx bx-x-circle icon"></i>
      Payment Unsuccessfull !!
    </div>
  );
};

export default Cancel;
