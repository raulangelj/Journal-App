import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FirebaseAuth } from "../../../firebase/config";
import { login, logout } from "../../../store/auth";

export const useCheckAuth = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispatch(logout());
      const { displayName, email, uid, photoURL } = user;
      dispatch(login({ displayName, email, uid, photoURL }));
    });
  }, []);

  return {
    status,
  }
}
