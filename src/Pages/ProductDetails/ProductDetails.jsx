import { useParams } from "react-router-dom";
import { useData, useAuth } from "../../Contexts";
import { useNavigate } from "react-router-dom";
import "./ProductDetails.css";
import { addToWishlist, addToCart } from "../../services/dataServices";

export function ProductDetails() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { data, itemsInCart, itemsInWishList, dispatch } = useData();
  const { currentUser } = useAuth();
  const product = data.find((item) => item.id === productId);
  const {
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

  const CartButtons = () => {
    if (itemsInCart?.find((item) => item.id === id)) {
      return (
        <button
          className="btn btn-primary interactions-button-cart"
          onClick={() => navigate("/cart")}
        >
          Go To Cart
        </button>
      );
    }
    return (
      <button
        className="btn btn-primary interactions-button-cart"
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
    );
  };

  const WishListButtons = () => {
    if (itemsInWishList?.find((item) => item.id === id)) {
      return (
        <button
          className="btn btn-tertiary interactions-button-wishlist"
          onClick={() => navigate("/wishlist")}
        >
          Go to Wishlist
        </button>
      );
    }
    return (
      <button
        className="btn btn-tertiary interactions-button-wishlist"
        onClick={async () => {
          const response = await addToWishlist(currentUser.userId, product._id);
          response.data.success
            ? dispatch({
                type: "ADD_TO_WISHLIST",
                payload: product,
              })
            : console.error(response.data.error);
        }}
      >
        Add to WishList
      </button>
    );
  };

  return (
    <>
      <div className="product-details">
        <div className="interactions">
          <img src={image} alt={name} />
          <div className="interactions-button">
            <WishListButtons />
            <CartButtons />
          </div>
        </div>

        <div className="details">
          <h1>{name}</h1>
          <h2>
            By - {brand} {material}
          </h2>
          <div>{ratings}⭐</div>
          <h2>₹ {price}</h2>
          {fastDelivery && (
            <div className="delivery">Get it delivered in by tommorow!</div>
          )}
          {!fastDelivery && <div>Delivered within 3 days</div>}
          <div className="offer">{offer}</div>
        </div>
      </div>
    </>
  );
}
