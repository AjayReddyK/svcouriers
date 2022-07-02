import React, { useEffect, useState, createContext, useReducer } from "react";
import { Home } from "./MyComponents/Home";
import { About } from "./MyComponents/About";
import { Contact } from "./MyComponents/Contact";
import { Price } from "./MyComponents/Price";
import { Pickupform } from "./MyComponents/Pickupform";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./MyComponents/Navbar";
import { Footer } from "./MyComponents/footer";
import { SignUp } from "./MyComponents/SignUp";
import { Login } from "./MyComponents/login";
import { Logout } from "./MyComponents/logout";
import { Tracking } from "./MyComponents/tracking";
import { Showtracking } from "./MyComponents/showtracking";
import { Updateform } from "./MyComponents/updateform";
import { ResetPassword } from "./MyComponents/ResetPassword";
import { Resetpasswordconfirm } from "./MyComponents/resetpasswordconfirm";
import { Activate } from "./MyComponents/Activate";

import { initialState, reducer } from "./MyComponents/reducer/UseReducer";
import axiosInstance from "./MyComponents/axios";
import { Profile } from "./MyComponents/profile";

export const UserContext = createContext();

const App = () => {
  const [location, updatelocation] = useState(false);

  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      dispatch({ type: "LOGIN", payload: true });
      axiosInstance.get(`user/usertype/`).then((res) => {
        dispatch({ type: "USERTYPE", payload: res.data });
      });
    }
  }, []);

  return (
    <div className="flex-wrapper colorclass">
      <UserContext.Provider value={{ state, dispatch }}>
        {state.location === null ? <Navbar /> : ""}
        <Routes>
          <Route exact path="/showtracking" element={<Showtracking />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/price" element={<Price />} />
          <Route exact path="/pickupform" element={<Pickupform />} />
          <Route exact path="/register" element={<SignUp />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/logout" element={<Logout />} />
          <Route exact path="/tracking" element={<Tracking />} />
          <Route exact path="/updateorder" element={<Updateform />} />
          <Route exact path="/resetpassword" element={<ResetPassword />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route
            exact
            path="/password/reset/confirm/:uid/:token"
            element={<Resetpasswordconfirm />}
          />
          <Route exact path="/activate/:uid/:token" element={<Activate />} />
        </Routes>
        {state.location === null ? <Footer /> : ""}
      </UserContext.Provider>
    </div>
  );
};

export default App;
