import React, { useContext } from "react";
import "./index.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { UserContext } from "../App";

export const Navbar = () => {
  const { state, dispatch } = useContext(UserContext);
  const [cname, setcname] = useState([
    "false",
    "false",
    "false",
    "false",
    "false",
    "false",
  ]);

  const cchange = (num) => {
    let l = ["false", "false", "false", "false", "false", "false"];
    l[num] = "true";
    setcname(l);
  };

  const notloggedlinks = () => {
    return (
      <>
        <li className={`nav-item ${cname[4]} `}>
          <NavLink
            className="nav-link active"
            onClick={() => {
              cchange(4);
            }}
            aria-current="page"
            to="/login"
          >
            <div>Login/Signup</div>
          </NavLink>
        </li>
        <li className={`nav-item ${cname[5]} `}>
          <NavLink
            className="nav-link active"
            onClick={() => {
              cchange(5);
            }}
            aria-current="page"
            to="/tracking"
          >
            <div>Track Shipment</div>
          </NavLink>
        </li>
      </>
    );
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg  navbar-light bg-light">
        <div
          className="container-fluid"
          style={{ height: "130%", width: "100%" }}
        >
          <NavLink
            activeClassName="menu_active"
            className="navbar-brand"
            to="/"
          >
            SV Couriers
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
              <li className={`nav-item ${cname[0]} `}>
                <NavLink
                  className="nav-link active"
                  onClick={() => {
                    cchange(0);
                  }}
                  aria-current="page"
                  to="/"
                >
                  <div>Home</div>
                </NavLink>
              </li>
              <li className={`nav-item ${cname[1]} `}>
                <NavLink
                  className="nav-link active"
                  onClick={() => {
                    cchange(1);
                  }}
                  aria-current="page"
                  to="/pickupform"
                >
                  <div>Request-Pickup</div>
                </NavLink>
              </li>
              <li className={`nav-item ${cname[2]} `}>
                <NavLink
                  className="nav-link active"
                  onClick={() => {
                    cchange(2);
                  }}
                  aria-current="page"
                  to="/price"
                >
                  <div>Prices</div>
                </NavLink>
              </li>
              {state.login === true ? (
                <>
                  {/* <li className={`nav-item ${cname[3]} `}>
                    <NavLink
                      className="nav-link active"
                      onClick={() => {
                        cchange(3);
                      }}
                      aria-current="page"
                      to="/profile"
                    >
                      <div>Profile</div>
                    </NavLink>
                  </li> */}
                  <li className={`nav-item ${cname[3]} `}>
                    <NavLink
                      className="nav-link active"
                      onClick={() => {
                        cchange(3);
                      }}
                      aria-current="page"
                      to="/logout"
                    >
                      <div>Logout</div>
                    </NavLink>
                  </li>
                </>
              ) : (
                notloggedlinks()
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
