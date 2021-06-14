import { useAuth } from "../Contexts";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Login/Login.css";

export function Signup() {
  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState(null);
  const [emailStyle, setEmailStyle] = useState({});
  const [passwordStyle, setPasswordStyle] = useState({});

  function validateEmail(email) {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(String(email).toLowerCase());
  }

  function validatePassword(password) {
    const passwordRegex = /^[\w!@#\$%\^\&*\)\(+=._-]{6,}$/
    return passwordRegex.test(password)
  }

  useEffect(()=>{
    if(email){
      setEmailStyle(validateEmail(email) ?
        { backgroundColor: "#8ac926", color: "white" }
       :
        { backgroundColor: "#ff595e", color: "white" })
      console.log(emailStyle)
    }
    else{setEmailStyle({})}
  },[email])

  useEffect(()=>{
    if(password){
      setPasswordStyle(validatePassword(password) ?
        { backgroundColor: "#8ac926", color: "white" }
       :
        { backgroundColor: "#ff595e", color: "white" })
      console.log(passwordStyle)
    }
    else{setPasswordStyle({})}
  },[password])

  const { signupUserWithCredentials } = useAuth();

  const signupHandler = () => {
    signupUserWithCredentials(name, username, password);
  };
  console.log(emailStyle)
  return (
    <div className="login">
      <div className="form">
        <div className="form-wrapper">
          <h1>NFT Baazar</h1>
          <input
            placeholder="Name"
            onChange={(event) => setName(event.target.value)}
          />
          <input
            placeholder="Username"
            onChange={(event) => setUsername(event.target.value)}
          />
          <input
            style={{...emailStyle}}
            placeholder="Email"
            type="email"
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            style={{...passwordStyle}}
            type="password"
            placeholder="Password*"
            onChange={(event) => setPassword(event.target.value)}
          />
          <small>*Password should be greater than 6 characters</small>
          <button className="btn btn-primary" onClick={signupHandler}>
            Sign Up
          </button>
          <p>
            Already have an accont?{" "}
            <Link to="/login">
              <span>Log In</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
