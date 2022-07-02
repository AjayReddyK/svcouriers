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

export const Resetpasswordconfirm = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  if (state.creation != null) {
    dispatch({ type: "CREATION", payload: null });
  }
  const classes = useStyles();
  const initialFormData = Object.freeze({
    new_password: "",
  });
  const { uid, token } = useParams();
  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance
      .post(`auth/users/reset_password_confirm/`, {
        uid: uid,
        token: token,
        new_password: formData.new_password,
      })
      .then((res) => {
        dispatch({ type: "RESETPASSWORDCONFIRM", payload: "success" });
        console.log("resetpasswordconfirm " + state.resetpasswordconfirm);
        navigate("/login");
      })
      .catch(function (error) {
        console.log(error.response.data);
        console.log(error.response.status);
        dispatch({ type: "RESETPASSWORDCONFIRM", payload: "error" });
        console.log("resetpasswordconfirm:" + state.resetpasswordconfirm);
      });
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}></Avatar>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="new_password"
                placeholder="new password*"
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
            Reset
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <NavLink to="/register" variant="body2">
                Don't have an Account? Sign Up
              </NavLink>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};
