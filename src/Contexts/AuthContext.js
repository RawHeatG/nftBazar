import { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { signup, login } from "../services/authServices";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [authError, setAuthError] = useState(false);

  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage?.getItem("nftbaazarLogin"));
      setCurrentUser(user);
    } catch (error) {
      console.error(error);
      setAuthError(true);
    }
  }, []);

  currentUser?.token
    ? (axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${currentUser?.token}`)
    : delete axios.defaults.headers.common["Authorization"];

  const setUserandNavigate = (response) => {
    const user = response.data.data;

    localStorage?.setItem("nftbaazarLogin", JSON.stringify(user));
    setCurrentUser(user);
    state?.from ? navigate(state.from) : navigate("/");
  };

  async function loginUserWithCredentials(username, password) {
    try {
      const user = { username: username, password: password };
      const response = await login(user);
      response.data.success ? setUserandNavigate(response) : setAuthError(true);
    } catch (error) {
      console.error("Error occured during login", error);
      setAuthError(true);
    }
  }

  async function signupUserWithCredentials(name, username, email, password) {
    try {
      const user = {
        name: name,
        username: username,
        email: email,
        password: password,
      };
      const response = await signup(user);
      response.data.success ? setUserandNavigate(response) : setAuthError(true);
    } catch (error) {
      console.error("Error occured during signup", error);
      setAuthError(true);
    }
  }

  function logoutUser() {
    try {
      localStorage.removeItem("nftbaazarLogin");
      setCurrentUser();
    } catch (err) {
      console.error("Error while logging out", err);
      setAuthError(true);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loginUserWithCredentials,
        signupUserWithCredentials,
        logoutUser,
        authError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
