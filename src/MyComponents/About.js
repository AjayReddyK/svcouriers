import React, { useContext } from "react";
import { UserContext } from "../App.js";
import { Common } from "./Common.js";

export const About = () => {
  const { state, dispatch } = useContext(UserContext);
  if (state.signup != null) {
    dispatch({ type: "SIGNUP", payload: null });
  }
  if (state.resetpassword != null) {
    dispatch({ type: "RESETPASSWORD", payload: null });
  }
  if (state.resetpasswordconfirm != null) {
    dispatch({ type: "RESETPASSWORDCONFIRM", payload: null });
  }
  if (state.creation != null) {
    dispatch({ type: "CREATION", payload: null });
  }
  if (state.location != null) {
    dispatch({ type: "LOCATION", payload: null });
  }
  if (state.pickup != null) {
    dispatch({ type: "PICKUP", payload: null });
  }
  return (
    <Common
      text="Welcome to about page"
      buttonname="contact now"
      visit="/contact"
    />
  );
};
