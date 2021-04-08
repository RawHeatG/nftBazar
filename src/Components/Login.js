import { useAuth } from "../Contexts"

export function Login() {
    const { isLoggedIn, setIsLoggedIn, loginWithCredentials} = useAuth();
    const loginHandler = () => {
        loginWithCredentials("rohit", "honeySingh");
    }

    return(
        <>
            {isLoggedIn && <h1>Swaagat h aapka Login m👋</h1>}
            {!isLoggedIn && <h1>Chaabi kha bhul gye ***** 🤐</h1>}

            <button class="btn btn-secondary" onClick={loginHandler}>Login</button>
        </>
    )
}