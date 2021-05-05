import { Link } from "react-router-dom";

import "./Home.css";

export function Home() {
  return (
    <div className="home">
      <div className="home__actions">
        <h1>The largest NFT marketplace</h1>
        <p>Buy, sell, and discover rare digital items</p>
        <Link to="/products">
          <button className="btn btn-primary">Explore the world of NFTs</button>
        </Link>
      </div>
    </div>
  );
}
