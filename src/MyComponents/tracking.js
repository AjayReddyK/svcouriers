import React, { useContext, useState } from "react";
import { UserContext } from "../App";
import { Showtracking } from "./showtracking";
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

export const Tracking = () => {
  const navigate = useNavigate();

  const initialFormData = Object.freeze({
    tracking: "",
  });
  const [formData, updateFormData] = useState(initialFormData);
  const { state, dispatch } = useContext(UserContext);
  const [settracking, updatesettracking] = useState(false);
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
  const handleChange = (e) => {
    updateFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch({ type: "TRACKING", payload: formData.tracking });
    updatesettracking(true);
    navigate("/showtracking");
  };
  const classes = useStyles();
  return (
    // <div className="container">
    //   <form>
    //     <input name="tracking" id="tracking" onChange={handleChange} />
    //     <Button type="submit" onClick={handleSubmit}>
    //       Track
    //     </Button>
    //   </form>
    //   {settracking ? <Showtracking /> : ""}
    // </div>
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Track Shipment
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="tracking"
                  placeholder="enter tracking Id"
                  name="tracking"
                  autoComplete="email"
                  type="text"
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
              Track
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
};
