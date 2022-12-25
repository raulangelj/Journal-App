import { authenticatedState, demoUser, initialState } from "../../../fixtures";
import { authSlice, checkingCredentials, login, logout } from "./authSlice";

describe("Tests on authSlice", () => {
  test("should return the initial state and call the auth", () => {
    const state = authSlice.reducer(initialState, {});
    expect(authSlice.name).toBe("auth");
    expect(state).toEqual(initialState);
  });
  test("should do authentication", () => {
    const state = authSlice.reducer(initialState, login(demoUser));
    expect(state).toEqual({
      status: "authenticated",
      uid: demoUser.uid,
      email: demoUser.email,
      displayName: demoUser.displayName,
      photoURL: demoUser.photoURL,
      errorMessage: null,
      errorCode: null,
    });
  });
  test("should do logout without args", () => {
    const state = authSlice.reducer(authenticatedState, logout());
    expect(state).toEqual({
      status: "not-authenticated",
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage: undefined,
      errorCode: undefined,
    });
  });
  test("should do logout and display error message", () => {
    const errorMessage = "Wrong password";
    const errorCode = "auth/wrong-password";
    const state = authSlice.reducer(
      authenticatedState,
      logout({ errorMessage, errorCode })
    );
    expect(state).toEqual({
      status: "not-authenticated",
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage,
      errorCode,
    });
  });
  test("should do checking credentials", () => {
    const state = authSlice.reducer(authenticatedState, checkingCredentials());
    expect(state.status).toBe("checking");
  });
});
