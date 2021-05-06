import { useAuth } from "../../Contexts";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ImageOutlined } from "@material-ui/icons";
import "./Login.css";

export function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const { currentUser, loginUserWithCredentials, logoutUser } = useAuth();

  const loginHandler = () => {
    loginUserWithCredentials(username, password);
  };

  const logoutHandler = () => {
    logoutUser();
  };

  return (
    <div className="login">
      {currentUser && (
        <div style={{ textAlign: "centre" }}>
          <h1>Hi {currentUser.name}👋</h1>
          <h2>Come back soon!</h2>
          <button className="btn btn-warning" onClick={logoutHandler}>
            Logout
          </button>
        </div>
      )}
      {!currentUser && (
        <div className="form">
          <div className="form-wrapper">
            <h1>NFT Baazar</h1>
            <input
              placeholder="Enter your username..."
              onChange={(event) => setUsername(event.target.value)}
            />
            <input
              type="password"
              placeholder="Password..."
              onChange={(event) => setPassword(event.target.value)}
            />
            <button className="btn btn-primary" onClick={loginHandler}>
              Log In
            </button>
            <p>
              Don't have an accont?{" "}
              <Link to="/signup">
                <span>Sign Up</span>
              </Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
