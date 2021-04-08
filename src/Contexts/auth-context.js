import { createContext, useContext } from "react";
import { useState } from "react";
const AuthContext = createContext();

export function AuthProvider({children}){
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);

    const usersDB =  [
            {
                username: "rohit",
                password: "honeySingh"
            },
            {
                username: "dhairya",
                password: "Jstar"
            },
            {
                username: "tanay",
                password: "dhruv"
            }
        ];

    const loginWithCredentials = (user, pass) => {
        const details = usersDB.find((item) => item.username === user )
        if(details){
            if(details.password === pass)
                setIsLoggedIn(true);
            else(console.log("Wrong Password"));
        }
        else{
            console.log("Wrong Credentials");
            }
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, loginWithCredentials }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}