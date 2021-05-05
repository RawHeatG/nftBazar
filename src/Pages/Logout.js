import { useAuth } from "../Contexts";

export function Logout() {
  const { logoutUser } = useAuth();

  const logoutHandler = () => {
    logoutUser();
  };

  return (
    <>
      <button className="btn btn-error" onClick={logoutHandler}>
        Logout :(
      </button>
    </>
  );
}
