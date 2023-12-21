import React, { createContext, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/apiRequest";

const UserContext = createContext();

export function UserProvider({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loginUser());
  }, [dispatch]);

  const currentUser = useSelector((state) => state.auth.login.currentUser);

  return (
    <UserContext.Provider value={currentUser}>{children}</UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
