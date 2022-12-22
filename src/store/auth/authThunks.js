import {
  signInWithEmailPassword,
  signInWithGoogle,
} from "../../firebase/providers";
import { checkingCredentials, logout, login } from "./authSlice";

export const checkingAuthentication = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const result = await signInWithGoogle();
    if (!result.ok)
      return dispatch(logout({ errorMessage: result.errorMessage, errorCode: result.errorCode }));
    dispatch(login(result));
  };
};

export const startEmailPasswordSignIn = ({ email, password, displayName }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const { ok, uid, photoURL, errorMessage, errorCode } = await signInWithEmailPassword({
      email,
      password,
      displayName,
    });
    if (!ok) return dispatch(logout({ errorMessage, errorCode }));
    dispatch(login({ uid, photoURL, email, displayName }));
  };
};
