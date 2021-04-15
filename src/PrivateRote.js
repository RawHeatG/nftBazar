import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { useAuth } from "./Contexts";

export function PrivateRoute({ path, ...props}) {
    const { currentUser } = useAuth();
    return(
        <>
            { currentUser ? <Route {...props} path={path} /> : <Navigate state={{ from: path }} replace to="/login" />}
        </>
    )
    
}