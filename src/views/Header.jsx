import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/Logo.svg"
import "./Styles.css"

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light header_custom">
      <a className="navbar-brand" href="/">
        <img src={logo} alt="Logo.svg" />
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a className="nav-link" href="#">
           
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
