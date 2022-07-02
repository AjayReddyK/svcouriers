import React, { useContext, useState } from "react";
import axiosInstance from "./axios";
import { NavLink, useNavigate } from "react-router-dom";
//MaterialUI
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { UserContext } from "../App";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const Login = () => {
  const { state, dispatch } = useContext(UserContext);
  console.log("signup" + state.signup);
  if (state.creation != null) {
    dispatch({ type: "CREATION", payload: null });
  }
  if (state.resetpassword != null) {
    dispatch({ type: "RESETPASSWORD", payload: null });
  }
  if (state.location != null) {
    dispatch({ type: "LOCATION", payload: null });
  }
  if (state.pickup != null) {
    dispatch({ type: "PICKUP", payload: null });
  }
  console.log("signup" + state.signup);
  const history = useNavigate();
  const initialFormData = Object.freeze({
    email: "",
    password: "",
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
      .post(`token/`, {
        email: formData.email,
        password: formData.password,
      })
      .then((res) => {
        dispatch({ type: "LOGIN", payload: true });
        localStorage.setItem("access_token", res.data.access);
        localStorage.setItem("refresh_token", res.data.refresh);
        axiosInstance.defaults.headers["Authorization"] =
          "JWT " + localStorage.getItem("access_token");
        axiosInstance.get(`user/usertype/`).then((res) => {
          console.log(res.data);
          dispatch({ type: "USERTYPE", payload: res.data });
        });
        history("/");
      })
      .catch(function (error) {
        console.log(error.response.data);
        console.log(error.response.status);
        dispatch({ type: "LOGIN", payload: "error" });
      });
  };

  const classes = useStyles();

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          {state.signup === "success" ? (
            <div className="alert alert-success" role="alert">
              Account created Successfully
            </div>
          ) : state.signup === "error" ? (
            <div className="alert alert-danger" role="alert">
              Something went wrong
            </div>
          ) : state.resetpasswordconfirm === "success" ? (
            <div className="alert alert-success" role="alert">
              Password reset Successfully
            </div>
          ) : state.resetpassword === "error" ? (
            <div className="alert alert-warning" role="alert">
              something went wrong resetting your password !
            </div>
          ) : state.login === "error" ? (
            <div className="alert alert-danger" role="alert">
              Enter Valid Credentials
            </div>
          ) : (
            ""
          )}
          <Avatar className={classes.avatar}></Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  placeholder="Email Address*"
                  name="email"
                  autoComplete="email"
                  type="email"
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  placeholder="Password*"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              Sign in
            </Button>
            <div className="d-flex align-items-center">
              <Grid container justify="flex">
                <Grid item xs={4}>
                  <NavLink to="/resetpassword" variant="body2">
                    ResetPassword
                  </NavLink>
                </Grid>
                <Grid item xs={8}>
                  <NavLink to="/register" variant="body2">
                    Don't have an Account? Sign Up
                  </NavLink>
                </Grid>
              </Grid>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};
