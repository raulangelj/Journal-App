import { initialState } from "../../../fixtures";
import { authSlice } from "./authSlice";

describe("Tests on authSlice", () => {
  test("should return the initial state and call the auth", () => {
    const state = authSlice.reducer(initialState, {});
    expect(authSlice.name).toBe("auth");
    expect(state).toEqual(initialState);
  });
});
