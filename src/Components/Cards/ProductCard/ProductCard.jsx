import { Link } from "react-router-dom";
import "./ProductCard.css";
import GradeRoundedIcon from "@material-ui/icons/GradeRounded";

export function ProductCard({ product }) {
  let {
    id,
    name,
    image,
    price,
    material,
    brand,
    inStock,
    fastDelivery,
    ratings,
    offer,
    idealFor,
    level,
    color,
  } = product;

  const ratingStars = (ratings) => {
    let stars = [];
    for (let i = 0; i < ratings; i++) {
      stars.push(<GradeRoundedIcon style={{ color: "var(--yellow)" }} />);
    }
    return stars;
  };

  return (
    <div key={id} className="card">
      <Link to={`/products/${id}`} className="link">
        <img
          className="card-img"
          width="100%"
          height="auto"
          src={image}
          alt={name}
        />
        <div className="card-content">
          <h3 className="card-heading">{name}</h3>
          <div className="price">
            <span className="card-price">₹ {price}</span>
            <s>1000</s>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {ratingStars(ratings)}
          </div>
          {fastDelivery ? (
            <div> Fast Delivery </div>
          ) : (
            <div> 3 days minimum </div>
          )}
        </div>
      </Link>
    </div>
  );
}
