import { useData } from "../../../Contexts";
import "./CartCard.css";

export function CartCard({ product }) {
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
    quantity,
  } = product;
  const { dispatch, itemsInCart, itemsInWishList } = useData();
  const WhichButtonToShow = () => {
    if (itemsInCart.find((item) => item.id === id)) {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {quantity > 1 ? (
            <button
              className="btn btn-tertiary"
              onClick={() =>
                dispatch({
                  type: "MANIPULATE_CART",
                  payload: { manipulation: "DECREASE", item: product },
                })
              }
            >
              -
            </button>
          ) : (
            <button
              className="btn btn-tertiary"
              onClick={() =>
                dispatch({
                  type: "MANIPULATE_CART",
                  payload: { manipulation: "REMOVE", item: product },
                })
              }
            >
              Remove
            </button>
          )}

          <h3>{quantity}</h3>
          <button
            className="btn btn-tertiary"
            onClick={() =>
              dispatch({
                type: "MANIPULATE_CART",
                payload: { manipulation: "INCREASE", item: product },
              })
            }
          >
            +
          </button>
        </div>
      );
    }
    return (
      <div>
        <button
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
  return (
    <div div key={id} className="card">
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
        {!itemsInWishList.find((item) => item.id === id) && (
          <button
            className="btn btn-tertiary"
            onClick={() =>
              dispatch({
                type: "MANIPULATE_WISHLIST",
                payload: { manipulation: "MOVE_TO_WISHLIST", item: product },
              })
            }
          >
            Move to WishList
          </button>
        )}
        {WhichButtonToShow()}
      </div>
    </div>
  );
}
