import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FavoriteIcon from "@material-ui/icons/Favorite";
import HomeIcon from "@material-ui/icons/Home";
import AppsIcon from "@material-ui/icons/Apps";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useAuth } from "../Contexts";
import { Link } from "react-router-dom";

export const Navbar = () => {
    const { currentUser } = useAuth();
    return (
        <div className="nav">
        <div class="logo">
          <Link to="/" className="link">
            <h1>NFT Baazar</h1>
          </Link>
        </div>
        <div className="nav-right">
          <ul className="nav-menu">
            <li>
              <Link to="/">
                <HomeIcon />
              </Link>
            </li>
            <li>
              <Link to="/products">
                <AppsIcon />
              </Link>
            </li>
            <li>
              <Link to="/cart">
                <ShoppingCartIcon />
              </Link>
            </li>
            <li>
              <Link to="/wishlist">
                <FavoriteIcon />
              </Link>
            </li>
            {!currentUser && (
              <li>
                <Link to="/login">
                  <AccountCircleIcon />
                </Link>
              </li>
            )}
            {currentUser && (
              <li>
                <Link to="/login">Hi {currentUser.name}</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    )
}
