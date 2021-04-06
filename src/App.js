import { Cart, ProductListing } from "./Components";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export function App(){

    return(
        <>
            <h1>NFT Baazar</h1>
            <nav>
                <Link to="/">Home</Link> ||
                <Link to="/products">ProductListing</Link> ||
                <Link to="/cart">Cart</Link>
            </nav>
            <Routes>
                {/* <Route path="/" element=></Route> */}
                <Route path="/" element={<ProductListing />} />
                <Route path="/cart" element={<Cart />} />
            </Routes>
        </>
    )
}

