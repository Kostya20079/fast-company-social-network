import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <ul className="nav">
      <li className="nav-item">
        <NavLink to="main" className="nav-link " aria-current="page">
          Main
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="login" className="nav-link " aria-current="page">
          Login
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="users" className="nav-link " aria-current="page">
          Users
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="posts" className="nav-link " aria-current="page">
          Posts
        </NavLink>
      </li>
    </ul>
  );
};

export default NavBar;
