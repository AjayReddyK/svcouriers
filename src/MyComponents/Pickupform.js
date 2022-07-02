import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import axiosInstance from "./axios";
import "./css/updateform.css";

export const Pickupform = () => {
  const { state, dispatch } = useContext(UserContext);
  if (state.signup != null) {
    dispatch({ type: "SIGNUP", payload: null });
  }
  if (state.creation != null) {
    dispatch({ type: "CREATION", payload: null });
  }
  if (state.resetpassword != null) {
    dispatch({ type: "RESETPASSWORD", payload: null });
  }
  if (state.login === "error") {
    dispatch({ type: "LOGIN", payload: null });
  }
  if (state.resetpasswordconfirm != null) {
    dispatch({ type: "RESETPASSWORDCONFIRM", payload: null });
  }
  if (state.location != null) {
    dispatch({ type: "LOCATION", payload: null });
  }
  const history = useNavigate();
  const initialFormData = Object.freeze({
    email: "",
    name: "",
    mobile: "",
    address: "",
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
      .post(`user/createorder/`, {
        email: formData.email,
        name: formData.name,
        mobile: formData.mobile,
        address: formData.address,
      })
      .then((res) => {
        console.log("entered handle submit of pickup form");
        console.log(res.data);
        dispatch({ type: "PICKUP", payload: "success" });
        history("/");
      })
      .catch(function (error) {
        console.log(error.response.data);
        console.log(error.response.status);
        dispatch({ type: "PICKUP", payload: "error" });
      });
  };
  return (
    <div className="updateform demo10">
      {state.pickup === "error" ? (
        <div className="alert alert-danger" role="alert">
          Please check the form
        </div>
      ) : (
        ""
      )}
      <div
        className="container"
        style={{
          boxShadow:
            "0 3px 6px 0 rgba(0, 0, 0, 0.1), 0 4px 15px 0 rgba(0, 0, 0, 0.1)",
          textAlign: "center",
        }}
      >
        <div className="row header">
          <h1>Request Pick-up &nbsp;</h1>
          <h3>Our Delivery agent will contact you </h3>
        </div>
        <div className="row body">
          <form>
            <ul>
              <li>
                <p className="left">
                  <label htmlFor="first_name">Name</label>
                  <input type="text" name="name" onChange={handleChange} />
                </p>
                <p className="pull-left">
                  <label htmlFor="last_name">Mobile</label>
                  <input type="text" name="mobile" onChange={handleChange} />
                </p>
              </li>

              <li>
                <p>
                  <label htmlFor="email">Email</label>
                  <input type="email" name="email" onChange={handleChange} />
                </p>
              </li>
              <li>
                <div className="divider"></div>
              </li>
              <li>
                <label htmlFor="comments">Address</label>
                <textarea
                  cols="46"
                  rows="3"
                  name="address"
                  onChange={handleChange}
                ></textarea>
              </li>

              <li>
                <input
                  className="btn btn-submit"
                  type="submit"
                  value="PlaceOrder"
                  onClick={handleSubmit}
                />
              </li>
            </ul>
          </form>
        </div>
      </div>
    </div>
    // <div className="container">
    //   <form>
    //     <div className="mb-3">
    //       <label htmlhtmlFor="exampleInputEmail1" className="form-label">
    //         Name
    //       </label>
    //       <input
    //         type="text"
    //         className="form-control"
    //         id="exampleInputEmail1"
    //         aria-describedby="emailHelp"
    //       />
    //     </div>
    //     <div className="mb-3">
    //       <label htmlhtmlFor="exampleInputEmail1" className="form-label">
    //         Mobile number
    //       </label>
    //       <input
    //         type="digit"
    //         className="form-control"
    //         id="exampleInputEmail1"
    //         aria-describedby="emailHelp"
    //       />
    //     </div>
    //     <div className="mb-3">
    //       <label htmlhtmlFor="exampleInputEmail1" className="form-label">
    //         Email
    //       </label>
    //       <input
    //         type="text"
    //         className="form-control"
    //         id="exampleInputEmail1"
    //         aria-describedby="emailHelp"
    //       />
    //     </div>
    //     <div className="mb-3">
    //       <label htmlhtmlFor="exampleInputEmail1" className="form-label">
    //         Address
    //       </label>
    //       <input
    //         type="text"
    //         className="form-control"
    //         id="exampleInputEmail1"
    //         aria-describedby="emailHelp"
    //       />
    //     </div>
    //     <button type="submit" className="btn btn-primary">
    //       Submit
    //     </button>
    //   </form>
    // </div>
  );
};
