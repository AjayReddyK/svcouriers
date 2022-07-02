import React, { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import axiosInstance from "./axios";
import "./css/updateform.css";

export const Updateform = () => {
  const history = useNavigate();
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
  if (state.login === "error") {
    dispatch({ type: "LOGIN", payload: null });
  }
  if (state.pickup != null) {
    dispatch({ type: "PICKUP", payload: null });
  }
  const initialFormData = Object.freeze({
    pk: state.updatedata.pk,
    ordered_at: state.updatedata.ordered_at,
    email: state.updatedata.email,
    name: state.updatedata.name,
    mobile: state.updatedata.mobile,
    address: state.updatedata.address,
    picked: state.updatedata.picked,
    has_tracking_id: state.updatedata.has_tracking_id,
    tracking_id: state.updatedata.tracking_id,
  });
  const [formData, updateFormData] = useState(initialFormData);
  const handleChange = (e) => {
    updateFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    await axiosInstance
      .put(`user/updateorder/`, {
        email: formData.email,
        name: formData.name,
        mobile: formData.mobile,
        address: formData.address,
        pk: formData.pk,
        ordered_at: formData.ordered_at,
        picked: formData.picked,
        has_tracking_id: formData.has_tracking_id,
        tracking_id: formData.tracking_id,
      })
      .then((res) => {
        console.log("entered handle submit of pickup form");
        console.log(res.data);
      });
    history("/");
  };

  return (
    <div className="updateform">
      <div
        className="container"
        style={{
          boxShadow:
            "0 3px 6px 0 rgba(0, 0, 0, 0.1), 0 4px 15px 0 rgba(0, 0, 0, 0.1)",
          textAlign: "center",
        }}
      >
        <div className="row header">
          <h1>Update order &nbsp;</h1>
        </div>
        <div className="row body">
          <form>
            <ul>
              <li>
                <p className="left">
                  <label htmlfor="first_name">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </p>
              </li>
              <li>
                <p className="left">
                  <label htmlfor="first_name">Mobile</label>
                  <input
                    type="text"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                  />
                </p>
              </li>
              <li>
                <p className="left">
                  <label htmlfor="first_name">Email</label>
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </p>
              </li>
              <li>
                <p className="left">
                  <label htmlfor="first_name">Order Date</label>
                  <input
                    type="text"
                    name="orderdate"
                    value={formData.ordered_at.split("T")[0]}
                    onChange={handleChange}
                  />
                </p>
              </li>
              <li>
                <p className="left">
                  <label htmlfor="first_name" className="row col-md-1">
                    Is picked
                  </label>
                  <select
                    className="select row col-md-6"
                    name="picked"
                    value={formData.picked}
                    onChange={handleChange}
                  >
                    <option value="false">false</option>
                    <option value="true">true</option>
                  </select>
                </p>
              </li>
              <li>
                <p className="left">
                  <label htmlfor="first_name" className="row col-md-5">
                    Has_tracking_id
                  </label>
                  <select
                    className="select row col-md-6"
                    name="has_tracking_id"
                    value={formData.has_tracking_id}
                    onChange={handleChange}
                  >
                    <option value="false">false</option>
                    <option value="true">true</option>
                  </select>
                </p>
              </li>
              <li>
                <p className="left">
                  <label htmlfor="first_name">Tracking ID</label>
                  <input
                    type="text"
                    name="tracking_id"
                    value={formData.tracking_id}
                    onChange={handleChange}
                  />
                </p>
              </li>
              <li>
                <label htmlfor="comments">Address</label>
                <textarea
                  cols="46"
                  rows="3"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                ></textarea>
              </li>

              <li>
                <input
                  className="btn btn-submit"
                  type="submit"
                  value="Update"
                  onClick={handleSubmit}
                />
              </li>
            </ul>
          </form>
        </div>
      </div>
    </div>
  );
};
