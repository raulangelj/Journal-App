import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth";
import { FirebaseAuth } from "../firebase/config";
import { JournalRoutes } from "../journal";
import { CheckingAuth } from "../shared";
import { login, logout } from "../store/auth";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispatch(logout());
      const { displayName, email, uid, photoURL } = user;
      dispatch(login({ displayName, email, uid, photoURL }));
    });
  }, []);

  if (status === "checking") {
    return <CheckingAuth />;
  }
  return (
    <Routes>
      {
        status === 'authenticated'
        ? <Route path="/*" element={<JournalRoutes />} />
        : <Route path="auth/*" element={<AuthRoutes />} />
      }
      <Route path='/*' element={<Navigate to='/auth/login' />} />
      {/* Log in y Registro */}
      {/* <Route path="auth/*" element={<AuthRoutes />} /> */}
      {/* Journal app */}
      {/* <Route path="/*" element={<JournalRoutes />} /> */}
    </Routes>
  );
};
