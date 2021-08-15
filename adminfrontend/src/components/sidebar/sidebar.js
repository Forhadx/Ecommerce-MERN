import React from "react";
import { NavLink } from "react-router-dom";
import "./sidebar.scss";

const Sidebar = () => {
  return (
    <div className="sidebar__items">
      <NavLink to="/dashboard">Dasboard</NavLink>
      <NavLink to="/orders">Orders</NavLink>
      <NavLink to="/products">Products</NavLink>
      <NavLink to="/regular+products">Regular Products</NavLink>
      <NavLink to="/category">Category</NavLink>
      <NavLink to="/users">Users</NavLink>
      <NavLink to="/logout">Logout</NavLink>
    </div>
  );
};

export default Sidebar;
