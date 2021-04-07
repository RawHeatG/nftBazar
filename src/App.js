import { Cart, ProductListing, WishList } from "./Components";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export function App(){

    return(
        <>
            <div class="navbar">
                <h1>NFT Baazar</h1>
                <div class="nav-right">
                    <ul class="nav-menu">
                    <li><Link to="/">ProductListing</Link></li>
                    <li><Link to="/cart">Cart</Link></li>
                    <li><Link to="/wishlist">WishList</Link></li>
                    </ul>
                </div>
            </div>
            <Routes>
                <Route path="/" element={<ProductListing />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/wishlist" element={<WishList />} />
            </Routes>
        </>
    )
}

