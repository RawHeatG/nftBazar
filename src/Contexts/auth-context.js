import { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const a = JSON.parse(localStorage?.getItem("nftLogin"));
      setCurrentUser(a);
    } catch (error) {
      console.error(error);
    }
  }, []);

  async function loginUserWithCredentials(username, password) {
    try {
      const user = { username: username, password: password };
      const response = await axios.post(
        "https://nftBaazarAPI.rawheatg.repl.co/login",
        { user }
      );
      if (response.data.success) {
        const user = response.data.data;
        console.log(user);
        localStorage?.setItem("nftLogin", JSON.stringify(user));
        setCurrentUser(user);
        navigate(state.from);
      }
    } catch (error) {
      console.error("Error occured during login", error);
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
      const response = await axios.post(
        "https://nftBaazarAPI.rawheatg.repl.co/signup",
        { user }
      );
      if (response.data.success) {
        const user = response.data.data;
        localStorage?.setItem("nftLogin", JSON.stringify(user));
        setCurrentUser(user);
        navigate("/");
      }
    } catch (error) {
      console.error("Error occured during signup", error);
    }
  }

  function logoutUser() {
    localStorage.removeItem("nftLogin");
    setCurrentUser();
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loginUserWithCredentials,
        signupUserWithCredentials,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
