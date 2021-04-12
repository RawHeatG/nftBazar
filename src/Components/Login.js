import { useAuth } from "../Contexts";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export function Login() {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const { currentUser, loginUserWithCredentials } = useAuth();
    
    const loginHandler = () => {
        loginUserWithCredentials(username, password);
    }

    return(
        <>
            {currentUser && <h1>Swaagat h {currentUser.name} aapka Login m👋</h1>}
            {!currentUser && <h1>Chaabi kha bhul gye 🤐</h1>}

            <div class="form">
                <div class="form-wrapper">
                    <h1>NFT Baazar</h1>
                    <input placeholder="Enter your username..." onChange={(event) => setUsername(event.target.value)} />
                    <input type="password" placeholder="Password..." onChange={(event) => setPassword(event.target.value)} />
                    <button class="btn btn-primary" onClick={loginHandler} >Log In</button>
                    <p>Don't have an accont? <Link to="/signup"><span>Sign Up</span></Link></p>
                </div>
            </div>
        </>
    )
}