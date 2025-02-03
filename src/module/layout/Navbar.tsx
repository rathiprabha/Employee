import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light nav-back w-100">
      <div className="container-fluid">
        {/* Logo Section */}
        <NavLink
          className="navbar-brand d-flex align-items-center justify-content-center"
          to="/"
          style={{
            width: "50px",
            height: "50px",
            backgroundColor: "white",
            borderRadius: "50%",
            fontWeight: "bold",
            fontSize: "18px",
            fontFamily: "cursive",
            textAlign: "center",
            lineHeight: "50px",
            color: "black",
            textDecoration: "none",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          EM
        </NavLink>

        {/* Navbar Toggler (for smaller screens) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links and Logout Section */}
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          {/* Logout Button */}
          <NavLink to="/login" className="nav-link">
            <FontAwesomeIcon
              icon={faSignOut}
              style={{ color: "#2596be", fontSize: "20px" }}
            />
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
