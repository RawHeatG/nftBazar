import { useData, useAuth } from "../../../Contexts";
import "./CartCard.css";
import {
  addToCart,
  updateCartQuantity,
  removeFromCart,
  moveToWishlist,
} from "../../../services/dataServices";
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
  const { currentUser } = useAuth();
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
              onClick={async () => {
                const response = await updateCartQuantity(
                  currentUser.userId,
                  product._id,
                  quantity - 1
                );
                response.data.success
                  ? dispatch({
                      type: "DECREASE_QUANTITY",
                      payload: product,
                    })
                  : console.error(response.data.error);
              }}
            >
              -
            </button>
          ) : (
            <button
              className="btn btn-tertiary"
              onClick={async () => {
                const response = await removeFromCart(
                  currentUser.userId,
                  product._id
                );
                response.data.success
                  ? dispatch({
                      type: "REMOVE_FROM_CART",
                      payload: product,
                    })
                  : console.error(response.data.error);
              }}
            >
              Remove
            </button>
          )}

          <h3>{quantity}</h3>
          <button
            className="btn btn-tertiary"
            onClick={async () => {
              const response = await updateCartQuantity(
                currentUser.userId,
                product._id,
                quantity + 1
              );
              response.data.success
                ? dispatch({
                    type: "INCREASE_QUANTITY",
                    payload: product,
                  })
                : console.error(response.data.error);
            }}
          >
            +
          </button>
        </div>
      );
    }
    return (
      <div>
        <button
          onClick={async () => {
            const response = await addToCart(currentUser.userId, product._id);
            response.data.success
              ? dispatch({
                  type: "ADD_TO_CART",
                  payload: product,
                })
              : console.error(response.data.error);
          }}
        >
          Add To Cart
        </button>
      </div>
    );
  };
  return (
    <div key={id} className="card">
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
            onClick={async () => {
              const response = await moveToWishlist(
                currentUser.userId,
                product._id
              );
              response.data.success
                ? dispatch({
                    type: "MOVE_TO_WISHLIST",
                    payload: product,
                  })
                : console.error(response.data.error);
            }}
          >
            Move to WishList
          </button>
        )}
        {WhichButtonToShow()}
      </div>
    </div>
  );
}
