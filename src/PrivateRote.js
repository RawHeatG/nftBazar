import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { useAuth } from "./Contexts";

export function PrivateRoute({ element, ...props}) {
    const { currentUser } = useAuth();
    return(
        <>
            { currentUser ? <Route {...props} element={element} /> : <Navigate replace to="/login" />}
        </>
    )
    
}