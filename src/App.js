import { Cart, ProductListing, WishList, Login, Signup, Logout, ProductDetails, TestAPI } from "./Pages";
import { PrivateRoute } from "./PrivateRote";
import { Routes, Route, Link } from "react-router-dom";
import { useAuth } from "./Contexts"

export function App(){

    const { currentUser } = useAuth();

    return(
        <>
            <div class="navbar">
                <h1>NFT Baazar</h1>
                <div class="nav-right">
                    <ul class="nav-menu">
                    <li><Link to="/">Products</Link></li>
                    <li><Link to="/cart">Cart</Link></li>
                    <li><Link to="/wishlist">WishList</Link></li>
                    <li><Link to="/test">Test</Link></li>
                    {!currentUser && <li><Link to="/login">Login</Link></li>}
                    {currentUser && <li><Link to="/logout">Hi {currentUser.name}</Link></li>}
                    </ul>
                </div>
            </div>
            <Routes>
                <Route path="/" element={<ProductListing />} />
                <PrivateRoute path="/cart" element={<Cart />} />
                <PrivateRoute path="/wishlist" element={<WishList />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/products/:productId" element={<ProductDetails />} />
                <Route path="/test" element={<TestAPI />} />
            </Routes>
        </>
    )
}

