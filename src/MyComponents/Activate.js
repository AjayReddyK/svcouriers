import React, { useContext, useState } from "react";
import axiosInstance from "./axios2";
import { NavLink, useNavigate, useParams } from "react-router-dom";
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

export const Activate = () => {
  const { state, dispatch } = useContext(UserContext);

  const classes = useStyles();
  const { uid, token } = useParams();
  if (state.creation != null) {
    dispatch({ type: "CREATION", payload: null });
  }
  if (state.location != null) {
    dispatch({ type: "LOCATION", payload: null });
  }

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance
      .post(`auth/users/activation/`, {
        uid: uid,
        token: token,
      })
      .then((res) => {
        dispatch({ type: "SIGNUP", payload: "success" });
        console.log("SIGNUP " + state.signup);
        navigate("/login");
      })
      .catch(function (error) {
        console.log(error.response.data);
        console.log(error.response.status);
        dispatch({ type: "SIGNUP", payload: "error" });
        console.log("sign:" + state.signup);
        navigate("/login");
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}></Avatar>
        <Typography component="h1" variant="h5">
          Activate account
        </Typography>
        <form className={classes.form} noValidate>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Verify
          </Button>
        </form>
      </div>
    </Container>
  );
};
