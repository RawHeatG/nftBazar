import { useData } from "../../../Contexts";
import { Link } from "react-router-dom";
import "./ProductCard.css";

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
  const { dispatch, itemsInCart, itemsInWishList } = useData();
  const CartButtons = () => {
    if (itemsInCart.find((item) => item.id === id)) {
      return (
        <div>
          <Link to="/cart">
            <button className="btn btn-tertiary">Go To Cart</button>
          </Link>
        </div>
      );
    }
    return (
      <div>
        <button
          className="btn btn-primary"
          onClick={() =>
            dispatch({
              type: "MANIPULATE_CART",
              payload: { manipulation: "ADD_TO_CART", item: product },
            })
          }
        >
          Add To Cart
        </button>
      </div>
    );
  };
  const WishListButtons = () => {
    if (itemsInWishList.find((item) => item.id === id)) {
      return (
        <div>
          <button
            className="btn btn-tertiary"
            onClick={() =>
              dispatch({
                type: "MANIPULATE_WISHLIST",
                payload: {
                  manipulation: "REMOVE_FROM_WISHLIST",
                  item: product,
                },
              })
            }
          >
            Remove from Wishlist
          </button>
        </div>
      );
    }
    return (
      <div>
        <button
          className="btn btn-tertiary"
          onClick={() =>
            dispatch({
              type: "MANIPULATE_WISHLIST",
              payload: { manipulation: "ADD_TO_WISHLIST", item: product },
            })
          }
        >
          Add to WishList
        </button>
      </div>
    );
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
          {inStock && <div> In Stock </div>}
          {!inStock && <div> Out of Stock </div>}
          {fastDelivery ? (
            <div> Fast Delivery </div>
          ) : (
            <div> 3 days minimum </div>
          )}
          {/* <div className="card__buttons">
            {WishListButtons()}
            {CartButtons()}
          </div> */}
        </div>
      </Link>
    </div>
  );
}
