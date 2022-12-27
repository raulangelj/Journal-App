import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import {
  demoUser,
  notAuthenticatedState,
} from "../../../fixtures/authFixtures";
import { authSlice, startGoogleSignIn } from "../../../store/auth";
import { LoginPage } from "./LoginPage";

const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();

jest.mock("../../../store/auth/authThunks/authThunks", () => ({
  startGoogleSignIn: () => mockStartGoogleSignIn,
  startLoginWithEmailPassword: ({ email, password }) => {
    return () => mockStartLoginWithEmailPassword({ email, password });
  },
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => (fn) => fn(),
}));

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  preloadedState: {
    auth: notAuthenticatedState,
  },
});

describe("Test on <LoginPage />", () => {
  beforeEach(() => jest.clearAllMocks());
  test("should dislpay the component as expected", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getAllByText("Login").length).toBeGreaterThanOrEqual(1);
  });

  test("google button should call the startGoogleSignIn", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );
    const googleBtn = screen.getByLabelText("google-btn");
    fireEvent.click(googleBtn);
    expect(mockStartGoogleSignIn).toHaveBeenCalled();
  });

  test("submit should call the startLoginWithEmailPassword", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const emailInput = screen.getByRole("textbox", { name: "Email" });
    const passwordInput = screen.getByTestId("password");
    const loginSubmit = screen.getByLabelText("login-btn");

    fireEvent.change(emailInput, {
      target: { name: "email", value: demoUser.email },
    });
    fireEvent.change(passwordInput, {
      target: { name: "password", value: demoUser.password },
    });
    fireEvent.click(loginSubmit);

    expect(mockStartLoginWithEmailPassword).toHaveBeenCalledWith({
      email: demoUser.email,
      password: demoUser.password,
    });
  });
});
