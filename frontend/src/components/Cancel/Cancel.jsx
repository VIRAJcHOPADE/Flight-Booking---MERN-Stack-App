import React, { useEffect } from "react";
import "./Cancel.scss";
const Cancel = () => {
  const cancelPayment = () => {
    localStorage.removeItem("booking");
  };
  useEffect(() => {
    cancelPayment();
  }, []);
  return (
    <div className="content">
      <i className="bx bx-x-circle icon"></i>
      Payment Unsuccessfull !!
    </div>
  );
};

export default Cancel;
