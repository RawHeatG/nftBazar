import { Cart, ProductListing, WishList } from "./Components";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export function App(){

    return(
        <>
            <h1>NFT Baazar</h1>
            <nav>
                <Link to="/">ProductListing</Link> ||
                <Link to="/cart">Cart</Link> ||
                <Link to="/wishlist">WishList</Link>
            </nav>
            <Routes>
                <Route path="/" element={<ProductListing />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/wishlist" element={<WishList />} />
            </Routes>
        </>
    )
}

