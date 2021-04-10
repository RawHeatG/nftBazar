import { useAuth } from "../Contexts";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export function Signup () {

    return(
        <>
        <div class="form">
            <div class="form-wrapper">
                <h1>NFT Baazar</h1>
                <input placeholder="Enter your username..." />
                <input placeholder="Set a Password..." />
                <button class="btn btn-primary">Sign Up</button>
                <p>Already have an accont? <Link to="/login"><span>Log In</span></Link></p>
            </div>
        </div>
        </>
    )
}