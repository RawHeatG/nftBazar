import { createContext, useContext } from "react";
import { useState } from "react";
import { checkUserDetails, findUserByUserName } from "../dummyAuthApi";

const AuthContext = createContext();

export function AuthProvider({children}){

    const [ currentUser, setCurrentUser ] = useState();

    async function loginUserWithCredentials(username, password) {
        try{
            const response = await checkUserDetails(username, password)
            if(response.success){
                const user = findUserByUserName(username)
                localStorage?.setItem(
                    "nftLogin",
                    JSON.stringify(user)
                );
                setCurrentUser(user);
            }
        }catch (error){
            console.error("Error occured during login", error);
        }
    }

    function signupUserWithCredentials(name, username, password) {
        try{
            let user = findUserByUserName(username);
            if(user === undefined){
                user = { name: name, username: username, password: password };
                setTimeout(() => {
                    localStorage?.setItem(
                        "nftLogin",
                        JSON.stringify(user)
                    );
                    setCurrentUser(user);
                }, 3000);
                
            }
        }catch(error){
            console.error("Error occured during signup", error);
        }
    }

    return (
        <AuthContext.Provider value={{ currentUser, loginUserWithCredentials, signupUserWithCredentials }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}