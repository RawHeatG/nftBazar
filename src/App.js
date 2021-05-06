import {
  Home,
  Cart,
  ProductListing,
  WishList,
  Login,
  Signup,
  ProductDetails,
  TestAPI,
} from "./Pages";
import { PrivateRoute } from "./PrivateRote";
import { Routes, Route, Link } from "react-router-dom";
import { useAuth } from "./Contexts";
import "./styles.css";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FavoriteIcon from "@material-ui/icons/Favorite";
import HomeIcon from "@material-ui/icons/Home";
import AppsIcon from "@material-ui/icons/Apps";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

export function App() {
  const { currentUser } = useAuth();

  return (
    <div className="canvas">
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
      <div className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductListing />} />
          <PrivateRoute path="/cart" element={<Cart />} />
          <PrivateRoute path="/wishlist" element={<WishList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/products/:productId" element={<ProductDetails />} />
          <Route path="/test" element={<TestAPI />} />
        </Routes>
      </div>
    </div>
  );
}
