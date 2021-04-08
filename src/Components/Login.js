import {useState} from "react";

export function Login() {
   
    const [ isLoggedIn, setIsLoggedIn] = useState(false);

    const loginHandler = () => {
        setIsLoggedIn((status) => !status);
    }

    return(
        <>
            {isLoggedIn && <h1>Swaagat h aapka Login m👋</h1>}
            {!isLoggedIn && <h1>Chaabi kha bhul gye ***** 🤐</h1>}

            <button class="btn btn-secondary" onClick={loginHandler}>{isLoggedIn ? "Logout" : "Login"}</button>
        </>
    )
}