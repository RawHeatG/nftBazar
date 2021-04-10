import { Cart, ProductListing, WishList, Login, Signup, Logout } from "./Components";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
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
                    {!currentUser && <li><Link to="/login">Login</Link></li>}
                    {currentUser && <li><Link to="/logout">Hi {currentUser.name}</Link></li>}
                    </ul>
                </div>
            </div>
            <Routes>
                <Route path="/" element={<ProductListing />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/wishlist" element={<WishList />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/logout" element={<Logout />} />
            </Routes>
        </>
    )
}

