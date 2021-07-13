import { useData } from "../../Contexts";
import { Link } from "react-router-dom";

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
              type: "MOVE_TO_CART",
              payload: product,
            })
          }
        >
          Move To Cart
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
              onClick={() =>
                dispatch({
                  type: "REMOVE_FROM_WISHLIST",
                  payload: product,
                })
              }
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
