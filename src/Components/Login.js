import { useAuth } from "../Contexts"

export function Login() {
    const { isUserLoggedIn, loginUserWithCredentials } = useAuth();
    
    const loginHandler = () => {
        loginUserWithCredentials("rohit", "honeySingh");
    }

    return(
        <>
            {isUserLoggedIn && <h1>Swaagat h aapka Login m👋</h1>}
            {!isUserLoggedIn && <h1>Chaabi kha bhul gye ***** 🤐</h1>}

            <button class="btn btn-secondary" onClick={loginHandler}>Login</button>
        </>
    )
}