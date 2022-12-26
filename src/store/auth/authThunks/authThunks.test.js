import { signInWithEmailAndPassword } from "firebase/auth";
import {
  loginWithEmailPassword,
  logoutFirebase,
  signInWithEmailPassword,
  signInWithGoogle,
} from "../../../firebase/providers";
import { demoUser } from "../../../fixtures/authFixtures";
import { clearNotesLogout } from "../../journal";
import { checkingCredentials, login, logout } from "../authSlice/authSlice";
import {
  checkingAuthentication,
  startEmailPasswordSignIn,
  startGoogleSignIn,
  startingLogout,
  startLoginWithEmailPassword,
} from "./authThunks";

jest.mock("../../../firebase/providers");

describe("Tests on AuthThunks", () => {
  const dispatch = jest.fn();
  const error = {
    errorMessage: "Error",
    errorCode: "Error",
  };
  beforeEach(() => jest.clearAllMocks());
  test("Should call the checkingCredentials", async () => {
    await checkingAuthentication()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
  });

  test("StartGoogleSignIn should call checkingCredentials and not call login - Succes", async () => {
    const loginData = {
      ok: true,
      ...demoUser,
    };
    await signInWithGoogle.mockReturnValue(loginData);

    //THUNK
    await startGoogleSignIn()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    // WE DONT NEED TO CALL THE LOGIN BECAUSE IT IS IN THE HOOCK USECHECKAUTH
    // expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test("StartGoogleSignIn should call checkingCredentials and logout - Fail", async () => {
    const loginData = {
      ok: false,
      errorMessage: "Error",
      errorCode: "Error",
    };
    await signInWithGoogle.mockReturnValue(loginData);

    //THUNK
    await startGoogleSignIn()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(error));
  });

  test("StartEmailPasswordSingIn shoudl call checkingCredential and not call login - Succes", async () => {
    const loginData = {
      ok: true,
      ...demoUser,
    };
    const formData = {
      email: demoUser.email,
      password: demoUser.password,
    };
    await signInWithEmailPassword.mockReturnValue(loginData);

    //THUNK
    await startEmailPasswordSignIn(formData)(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    // WE DONT NEED TO CALL THE LOGIN BECAUSE IT IS IN THE HOOCK USECHECKAUTH
  });

  test("StartEmailPasswordSingIn shoudl call checkingCredential and not call logout - Fail", async () => {
    const loginData = {
      ok: false,
      ...demoUser,
      ...error,
    };
    const formData = {
      email: demoUser.email,
      password: demoUser.password,
    };
    await signInWithEmailPassword.mockReturnValue(loginData);

    //THUNK
    await startEmailPasswordSignIn(formData)(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(error));
  });

  test("StartLoginWithEmailPassword should call the checkingCredentials and not call the login - Succes", async () => {
    const loginData = {
      ok: true,
      ...demoUser,
    };
    const formData = {
      email: demoUser.email,
      password: demoUser.password,
    };
    await loginWithEmailPassword.mockReturnValue(loginData);

    //THUNK
    await startLoginWithEmailPassword(formData)(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    // WE DONT NEED TO CALL THE LOGIN BECAUSE IT IS IN THE HOOCK USECHECKAUTH
  });

  test("StartLoginWithEmailPassword should call the checkingCredentials and not call the logout - Fail", async () => {
    const loginData = {
      ok: false,
      ...demoUser,
      ...error,
    };
    const formData = {
      email: demoUser.email,
      password: demoUser.password,
    };
    await loginWithEmailPassword.mockReturnValue(loginData);

    //THUNK
    await startLoginWithEmailPassword(formData)(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(error));
  });

  test("StartingLogout should call logoutFirebasem clearNotes and logout", async () => {
    await startingLogout()(dispatch);
    expect(logoutFirebase).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
    // WE DONT NEED TO CALL THE LOGOUT BECAUSE IT IS IN THE HOOCK USECHECKAUTH
    // expect(dispatch).toHaveBeenCalledWith(logout());
  });
});
