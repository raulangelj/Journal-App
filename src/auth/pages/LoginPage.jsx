import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { Google } from "@mui/icons-material";
import React from "react";
import { AuthLayout } from "../layout";
import { useForm } from "../../share";
import { checkingAuthentication, startGoogleSignIn } from "../../store/auth";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const { email, password, onInputChange } = useForm({
    email: "",
    password: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
    dispatch(checkingAuthentication())
  };

  const onGoogleSignIn = () => {
    console.log("Google Sign In");
    dispatch(startGoogleSignIn())
  };

  return (
    <AuthLayout title="Login">
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              type="email"
              name="email"
              onChange={onInputChange}
              value={email}
              placeholder="correo@google.com"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Password"
              type="password"
              placeholder="correo@google.com"
              fullWidth
              name="password"
              onChange={onInputChange}
              value={password}
            />
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <Button variant="contained" fullWidth type="submit">
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant="contained" fullWidth onClick={onGoogleSignIn}>
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="end">
            <Link component={RouterLink} color="inherit" to="/auth/register">
              Sign in
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
