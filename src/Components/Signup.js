import { useAuth } from "../Contexts";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export function Signup () {

    const [name, setName] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const { signupUserWithCredentials } = useAuth();

    const signupHandler = () => {
        signupUserWithCredentials(name, username, password);
    }

    return(
        <>
        <div class="form">
            <div class="form-wrapper">
                <h1>NFT Baazar</h1>
                <input placeholder="Name" onChange={(event) => setName(event.target.value)} />
                <input placeholder="Username" onChange={(event) => setUsername(event.target.value)} />
                <input type="password" placeholder="Set a password" onChange={(event) => setPassword(event.target.value)} />
                <button class="btn btn-primary" onClick={signupHandler}>Sign Up</button>
                <p>Already have an accont? <Link to="/login"><span>Log In</span></Link></p>
            </div>
        </div>
        </>
    )
}