import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

import { AuthContext } from "./_app";
import { SignInParams } from "../types";
import { signIn } from "../lib/api/auth";
// import useRequireLogin from "../hooks/useRequireLogin"

import {
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Visibility, VisibilityOff } from "@material-ui/icons";

export const useStyles = makeStyles(() => ({
  downCaseText: {
    textTransform: "none",
  },
}));

const SignIn: React.FC = () => {
  const classes = useStyles();
  const router = useRouter();

  const { isSignedIn, setIsSignedIn, setCurrentUser } = useContext(AuthContext);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  // useRequireLogin()
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const params: SignInParams = {
      email: email,
      password: password,
    };

    try {
      const res = await signIn(params);

      if ((res.status = 200)) {
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers["client"]);
        Cookies.set("_uid", res.headers["uid"]);

        setIsSignedIn(true);
        setCurrentUser(res.data.data);

        router.replace("/home");
        console.log("Signed in successfully!");
      } else {
        console.log("Signed in failed");
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (isSignedIn) {
    return (
      <>
        <p>...Redirecting</p>
      </>
    );
  }

  return (
    <>
      <p>this is Sign in Page</p>
      <p></p>
      <form noValidate autoComplete="off">
        <TextField
          id="outlined-email-input"
          label="Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onMouseLeave={() => setShowPassword(false)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.downCaseText}
          disabled={!email || !password ? true : false}
          onClick={handleSubmit}
        >
          Sign Up
        </Button>
      </form>
    </>
  );
};

export default SignIn;
