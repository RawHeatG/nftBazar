import { createContext, useContext } from "react";
import { useState } from "react";
import { dummyAuthApi } from "../dummyAuthApi"

const AuthContext = createContext();

export function AuthProvider({children}){
    const [ isUserLoggedIn, setIsUserLoggedIn ] = useState(false);

    

    async function loginUserWithCredentials(username, password) {
        try{
            const response = await dummyAuthApi(username, password)
            if(response.success){
                localStorage?.setItem(
                    "login",
                    JSON.stringify({ isUserLoggedIn: true })
                );
                setIsUserLoggedIn(true);
            }
        }catch (error){
            console.log("Error!", error);
        }
    }

    return (
        <AuthContext.Provider value={{ isUserLoggedIn, loginUserWithCredentials }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}