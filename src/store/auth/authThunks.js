import {
  loginWithEmailPassword,
  logoutFirebase,
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
      return dispatch(
        logout({
          errorMessage: result.errorMessage,
          errorCode: result.errorCode,
        })
      );
      // NOT NEEDED: SINCE IN USECHECKAUTH WE HAVE AN OBSERVABLE THAT WILL DISPATCH THE LOGIN WHEN FIREBASE USER CHANGE
    // dispatch(login(result));
  };
};

export const startEmailPasswordSignIn = ({ email, password, displayName }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const { ok, uid, photoURL, errorMessage, errorCode } =
      await signInWithEmailPassword({
        email,
        password,
        displayName,
      });
    if (!ok) return dispatch(logout({ errorMessage, errorCode }));
    dispatch(login({ uid, photoURL, email, displayName }));
  };
};

export const startLoginWithEmailPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const { ok, photoURL, uid, displayName, errorCode, errorMessage } = await loginWithEmailPassword({ email, password });
    if (!ok) return dispatch(logout({ errorMessage, errorCode }));
    // NOT NEEDED: SINCE IN USECHECKAUTH WE HAVE AN OBSERVABLE THAT WILL DISPATCH THE LOGIN WHEN FIREBASE USER CHANGE
    // dispatch(login({ uid, photoURL, email, displayName }));

  }
};

export const startingLogout = () => {
  return async (dispatch) => {
    await logoutFirebase();
    // NOT NEEDD: SINCE IN USEcHECKaUTH WE HAVE AN OBSERVABLE THAT WILL DISPATCH THE LOGOUT WHEN FIREBASE USER CHANGE
    // dispatch(logout())
  }
};
