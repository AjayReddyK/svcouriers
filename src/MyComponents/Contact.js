import React, { useContext } from "react";
import { UserContext } from "../App";

export const Contact = () => {
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
  return <div>Contact</div>;
};
