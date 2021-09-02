import { useData, useAuth } from "../../Contexts";
import { Link } from "react-router-dom";
import {
  addToWishlist,
  moveToCart,
  removeFromWishlist,
} from "../../services/dataServices";

export function WishListCard({ product }) {
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
  const { currentUser } = useAuth();
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
          disabled={!inStock}
          style={!inStock && { cursor: "no-drop" }}
          onClick={async () => {
            const response = await moveToCart(currentUser.userId, product._id);
            response.data.success
              ? dispatch({
                  type: "MOVE_TO_CART",
                  payload: product,
                })
              : console.error(response.data.error);
          }}
        >
          {inStock ? "Move to cart" : "Out of Stock"}
        </button>
      </div>
    );
  };
  return (
    <>
      <div key={id} className="card">
        {/* <img className="card-wishlist" width="100%" height="auto" src={image} alt={productName} /> */}
        <img
          className="card-img"
          width="100%"
          height="auto"
          src={image}
          alt={name}
        />
        <div className="card-content">
          <h2 className="card-heading">{name}</h2>
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
          <div>
            <button
              className="btn btn-tertiary"
              onClick={async () => {
                const response = await removeFromWishlist(
                  currentUser.userId,
                  product._id
                );
                response.data.success
                  ? dispatch({
                      type: "REMOVE_FROM_WISHLIST",
                      payload: product,
                    })
                  : console.error(response.data.error);
              }}
            >
              Remove from Wishlist
            </button>
          </div>
          {CartButtons()}
        </div>
      </div>
    </>
  );
}
