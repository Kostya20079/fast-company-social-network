import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar fixed-top navbar-expand-sm bg-light">
      <div className="container-fluid">
        <div className="navbar-brand">FastCompany</div>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="nav nav-underline">
            <li className="nav-item">
              <NavLink to="/" className="nav-link " aria-current="page">
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
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
