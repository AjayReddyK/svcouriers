import React, { useContext, useState } from "react";
import { UserContext } from "../App";
import axiosInstance from "./axios";

export const Showtracking = () => {
  const { state, dispatch } = useContext(UserContext);
  const [result, updateResult] = useState("");
  const [settrack, updatesettrack] = useState(false);
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

  if (settrack === false) {
    axiosInstance
      .post(`/user/tracking/`, {
        tracking_id: state.tracking_id,
      })
      .then((res) => {
        dispatch({ type: "LOCATION", payload: true });
        updateResult(res.data);
        updatesettrack(true);
      });
  }
  return (
    <>
      <div
        dangerouslySetInnerHTML={{
          __html: result,
        }}
      ></div>
    </>
  );
};
