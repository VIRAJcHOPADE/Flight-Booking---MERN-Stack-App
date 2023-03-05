import React from "react";
import { NavLink } from "react-router-dom";
import "./AdminNavBar.scss";
const AdminNavBar = () => {
  return (
    <div className="admin-navbar color-change">
      <NavLink to="/dashboard/users">Users</NavLink>
      <NavLink to="/dashboard/flights">Flights</NavLink>
      <NavLink to="/dashboard/tours">Tours</NavLink>
    </div>
  );
};

export default AdminNavBar;
