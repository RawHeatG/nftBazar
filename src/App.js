import {
  Home,
  Cart,
  ProductListing,
  WishList,
  Login,
  Signup,
  ProductDetails,
} from "./Pages";
import { Navbar } from "./Components";
import { PrivateRoute } from "./PrivateRote";
import { Routes, Route } from "react-router-dom";
import "./index.css";

export function App() {
  return (
    <div className="canvas">
      <Navbar />
      <div className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductListing />} />
          <PrivateRoute path="/cart" element={<Cart />} />
          <PrivateRoute path="/wishlist" element={<WishList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/products/:productId" element={<ProductDetails />} />
        </Routes>
      </div>
    </div>
  );
}
