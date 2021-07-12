import { useParams } from "react-router-dom";
import { useData } from "../../Contexts";
import { useNavigate } from "react-router-dom";
import "./ProductDetails.css";


export function ProductDetails() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { data, itemsInCart, itemsInWishList, dispatch, wishlistHandler} = useData();
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
        <button className="btn btn-primary interactions-button-cart" onClick={() => navigate("/cart")}>
          Go To Cart
        </button>
      );
    }
    return (
      <button
        className="btn btn-primary interactions-button-cart"
        onClick={() => 
          dispatch({
                    type: "MANIPULATE_CART",
                    payload: { manipulation: "ADD_TO_CART", item: product },
                  })}
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
        onClick={() => 
          {console.log("In ProductDetial, Dispatch called");
          wishlistHandler(product)
            // dispatch({
            //         type: "MANIPULATE_WISHLIST",
            //         payload: { manipulation: "ADD_TO_WISHLIST", item: product },
            //       }) 
                }
                }
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