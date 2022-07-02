import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "./axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

export const Logout = () => {
  const history = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const response = axiosInstance.post("user/logout/blacklist/", {
      refresh_token: localStorage.getItem("refresh_token"),
    });
    dispatch({ type: "LOGIN", payload: false });
    dispatch({ type: "USERTYPE", payload: "not_logged" });
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    axiosInstance.defaults.headers["Authorization"] = null;
    history("/login");
  });
  return <div>Logout</div>;
};
