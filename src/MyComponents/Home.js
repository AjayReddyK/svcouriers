import React, { useState, useEffect, useContext } from "react";
import web from "./images/delivery_boy.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import axiosInstance from "./axios";
import { UserContext } from "../App";
import "./index.css";
export const Home = () => {
  const [result, updateresult] = useState([]);
  const [setbit, updatesetbit] = useState(0);
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  console.log("is logged:" + state.login);
  console.log("user type:" + state.usertype);
  if (state.signup != null) {
    dispatch({ type: "SIGNUP", payload: null });
  }
  if (state.creation != null) {
    dispatch({ type: "CREATION", payload: null });
  }
  if (state.resetpassword != null) {
    dispatch({ type: "RESETPASSWORD", payload: null });
  }
  if (state.resetpasswordconfirm != null) {
    dispatch({ type: "RESETPASSWORDCONFIRM", payload: null });
  }
  if (state.location != null) {
    dispatch({ type: "LOCATION", payload: null });
  }
  if (state.pickup === "error") {
    dispatch({ type: "PICKUP", payload: null });
  }
  const ListOrders = () => {
    if (setbit === 0) {
      axiosInstance.get(`user/listorders/`).then((res) => {
        updateresult(res.data);
        updatesetbit(1);
        console.log("print in axios:", result);
        console.log("type=", typeof result);
      });
    }
    const handleSubmit = async (order) => {
      await dispatch({ type: "UPDATEDATA", payload: order });
      navigate("/updateorder");
    };
    const handleSubmittrack = async (order) => {
      console.log("handle click");
      await dispatch({ type: "TRACKING", payload: order.tracking_id });
      navigate("/showtracking");
    };
    return (
      <div className="container mt-3">
        {result.length === 0
          ? "no orders to display"
          : result.map((order) => {
              return (
                <>
                  <div className="card2">
                    <h6
                      className="card-header"
                      style={{
                        backgroundColor: "#374d78",
                        color: "#fff",
                        width: "30%",
                      }}
                    >
                      Order id: {order.pk}
                    </h6>
                    <div
                      className="card mb-3"
                      style={{
                        textAlign: "center",
                      }}
                    >
                      <div className="card-body">
                        <div className="container">
                          <div className="row">
                            <div className="col-sm-2">
                              <p>Mobile:{order.mobile}</p>
                            </div>
                            <div className="col-sm-2">
                              {order.picked ? (
                                <p>Picked:No</p>
                              ) : (
                                <p>Picked:Yes</p>
                              )}
                            </div>
                            <div className="col-sm-2">
                              <p>Tracking ID:{order.tracking_id}</p>
                            </div>
                            <div className="col-sm-2">
                              <p>
                                Order Date: {order.ordered_at.split("T")[0]}
                              </p>
                            </div>
                            <div className="col-sm-2 mb-1">
                              <button
                                onClick={() => {
                                  handleSubmit(order);
                                }}
                                type="submit"
                                className="btn btn-primary"
                              >
                                Update
                              </button>
                            </div>
                            {order.has_tracking_id ? (
                              <div className="col-sm-2">
                                <button
                                  onClick={() => {
                                    handleSubmittrack(order);
                                  }}
                                  type="submit"
                                  className="btn btn-primary"
                                >
                                  Track
                                </button>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
      </div>
    );
  };

  const showOrders = () => {
    if (setbit === 0) {
      axiosInstance.get(`user/showorders/`).then((res) => {
        updateresult(res.data);
        updatesetbit(1);
        console.log("print in axios:", result);
        console.log("type=", typeof result);
      });
    }
    const handleSubmittrack = async (order) => {
      console.log("handle click");
      await dispatch({ type: "TRACKING", payload: order.tracking_id });
      navigate("/tracking");
    };
    return (
      <div className="container">
        {result.length === 0
          ? "no orders to display"
          : result.map((order) => {
              return (
                <>
                  <div
                    className="card mt-3"
                    style={{
                      boxShadow:
                        "0 3px 6px 0 rgba(0, 0, 0, 0.1), 0 4px 15px 0 rgba(0, 0, 0, 0.1)",
                      textAlign: "center",
                    }}
                  >
                    <h8
                      className="card-header"
                      style={{ backgroundColor: "#374d78", color: "#fff" }}
                    >
                      Order id: {order.pk}
                    </h8>
                    <div className="card-body">
                      <div className="container">
                        <div className="row">
                          <div className="col-sm-2">
                            <p>Mobile:{order.mobile}</p>
                          </div>
                          <div className="col-sm-2">
                            {order.picked ? (
                              <p>Picked:No</p>
                            ) : (
                              <p>Picked:Yes</p>
                            )}
                          </div>
                          <div className="col-sm-2">
                            <p>Tracking ID:{order.tracking_id}</p>
                          </div>
                          <div className="col-sm-2">
                            <p>Order Date: {order.ordered_at.split("T")[0]}</p>
                          </div>
                          {order.has_tracking_id ? (
                            <div className="col-sm-4">
                              <button
                                onClick={() => {
                                  handleSubmittrack(order);
                                }}
                                type="submit"
                                className="btn btn-primary"
                              >
                                Track
                              </button>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
      </div>
    );
  };
  const notlogged = () => {
    console.log("not logged usertype:" + state.usertype);
    if (state.login === "error") {
      dispatch({ type: "LOGIN", payload: null });
    }
    return (
      <>
        {state.pickup === "success" ? (
          <div className="alert alert-success" role="alert">
            Your pick up request Successfully placed
          </div>
        ) : (
          " "
        )}
        <section id="header" className="d-flex align-items-center">
          <div className=" container-fluid nav_bg">
            <div className="row">
              <div className="col-10 mx-auto">
                <div className="row">
                  <div className="col-md-6 pt-5 pt-lg-0 order-2 order-lg1-1 d-flex justify-content-center flex-column">
                    <h1>
                      Send your Couriers via{" "}
                      <strong className="brand-name">SV Couriers</strong>
                    </h1>
                    <h2 className="my-3">We are team of experienced men</h2>
                    <div className="mt-3">
                      <NavLink
                        to="/pickupform"
                        type="button"
                        className="btn btn-outline-primary mx-2 my-sm-3 mb-2"
                      >
                        Request PickUp
                      </NavLink>
                      <NavLink
                        to="/tracking"
                        type="button"
                        className="btn btn-outline-primary mx-2 my-sm-3 mb-2"
                      >
                        Track your Shipment
                      </NavLink>
                    </div>
                  </div>

                  <div className="col-lg-6 order-1 order-lg-2 header-img">
                    <img
                      src={web}
                      className="img-fluid animated"
                      alt="home img"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  };

  return (
    <>
      {state.login
        ? state.usertype === "admin"
          ? ListOrders()
          : showOrders()
        : notlogged()}
    </>
  );
};
