import React, { useContext } from "react";
import { UserContext } from "../App";
import "./price.css";

export const Price = () => {
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
  return (
    <div class="demo10">
      <div class="container">
        <h4 class="py-4 text-center" style={{ color: "DodgerBlue" }}>
          Pricing Table
        </h4>
        <div class="row">
          <div class="col-md-3 col-sm-6 mb-4">
            <div class="pricingTable10">
              <div class="pricingTable-header">
                <h3 class="heading">USA</h3>
                <span class="price-value">
                  <span class="currency">&#8377; </span> 2008
                  <span class="month">kg</span>
                </span>
              </div>
              <div class="pricing-content">
                <ul>
                  <li>For 1st kg - 2008</li>
                  <li>Increment for every kg 500</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-md-3 col-sm-6">
            <div class="pricingTable10">
              <div class="pricingTable-header">
                <h3 class="heading">CANADA</h3>
                <span class="price-value">
                  <span class="currency">&#8377; </span> 2027
                  <span class="month">kg</span>
                </span>
              </div>
              <div class="pricing-content">
                <ul>
                  <li>For 1st kg - 2027</li>
                  <li>Increment for every kg 400</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="col-md-3 col-sm-6">
            <div class="pricingTable10">
              <div class="pricingTable-header">
                <h3 class="heading">BRITAIN</h3>
                <span class="price-value">
                  <span class="currency">&#8377; </span> 2200
                  <span class="month">kg</span>
                </span>
              </div>
              <div class="pricing-content">
                <ul>
                  <li>For 1st kg - 2200</li>
                  <li>Increment for every kg 550</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-md-3 col-sm-6">
            <div class="pricingTable10">
              <div class="pricingTable-header">
                <h3 class="heading">AUSTRALIA</h3>
                <span class="price-value">
                  <span class="currency">&#8377; </span> 2300
                  <span class="month">kg</span>
                </span>
              </div>
              <div class="pricing-content">
                <ul>
                  <li>For 1st kg - 2300</li>
                  <li>Increment for every kg 540</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-md-3 col-sm-6">
            <div class="pricingTable10">
              <div class="pricingTable-header">
                <h3 class="heading">EUROPE</h3>
                <span class="price-value">
                  <span class="currency">&#8377; </span> 2130
                  <span class="month">kg</span>
                </span>
              </div>
              <div class="pricing-content">
                <ul>
                  <li>For 1st kg - 2130</li>
                  <li>Increment for every kg 470</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-md-3 col-sm-6">
            <div class="pricingTable10">
              <div class="pricingTable-header">
                <h3 class="heading">RUSSIA</h3>
                <span class="price-value">
                  <span class="currency">&#8377; </span> 2450
                  <span class="month">kg</span>
                </span>
              </div>
              <div class="pricing-content">
                <ul>
                  <li>For 1st kg - 2450</li>
                  <li>Increment for every kg 390</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-md-3 col-sm-6">
            <div class="pricingTable10">
              <div class="pricingTable-header">
                <h3 class="heading">SINGAPORE</h3>
                <span class="price-value">
                  <span class="currency">&#8377; </span> 2640
                  <span class="month">kg</span>
                </span>
              </div>
              <div class="pricing-content">
                <ul>
                  <li>For 1st kg - 2640</li>
                  <li>Increment for every kg 535</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="col-md-3 col-sm-6">
            <div class="pricingTable10">
              <div class="pricingTable-header">
                <h3 class="heading">USA</h3>
                <span class="price-value">
                  <span class="currency">&#8377; </span> 2008
                  <span class="month">kg</span>
                </span>
              </div>
              <div class="pricing-content">
                <ul>
                  <li>For 1st kg - 2008</li>
                  <li>Increment for every kg 500</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
