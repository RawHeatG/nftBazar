import { useData } from "../Contexts";
import "../styles.css";
import { Link, Route } from "react-router-dom";

export function ProductCard({product}) {
    let {
        id,
        name,
        image,
        price,
        productName,
        inStock,
        level,
        fastDelivery,
        quantity
      } = product;
    const { dispatch, itemsInCart, itemsInWishList } = useData();
    const CartButtons = () => {
        if(itemsInCart.find((item) => item.id === id)){
            return(
                <div>
                    <Link to="/cart"><button class="btn btn-tertiary" >Go To Cart</button></Link>
                </div>
            )
        }
        return(
            <div>
                <button class="btn btn-primary" onClick={() => dispatch({type: "MANIPULATE_CART", payload: {manipulation: "ADD_TO_CART", item: product}})} >Add To Cart</button>
            </div>
        )
    }
    const WishListButtons = () => {
        if(itemsInWishList.find((item) => item.id === id)){
            return(
                <div>
                    <button class="btn btn-tertiary" onClick={() => dispatch({type: "MANIPULATE_WISHLIST", payload: {manipulation: "REMOVE_FROM_WISHLIST", item: product}})} >Remove from Wishlist</button>
                </div>
            )
        }
        return(
            <div>
                <button class="btn btn-tertiary" onClick={() => dispatch({type: "MANIPULATE_WISHLIST", payload: {manipulation: "ADD_TO_WISHLIST", item: product}})} >Add to WishList</button>
            </div>
        )
    }
    return(
        <>
        <div key={id} class="card">
            <img class="card-img" width="100%" height="auto" src={image} alt={productName} />
            <div class="card-content">
                <h2 class="card-heading">{name}</h2>
                <div class="price">
                <span class="card-price">₹ {price}</span><s>1000</s>
                </div>
                {inStock && <div> In Stock </div>}
                {!inStock && <div> Out of Stock </div>}
                {fastDelivery ? ( <div> Fast Delivery </div> ) : ( <div> 3 days minimum </div> )}
                {WishListButtons()}
                {CartButtons()}
                <Link to={`/products/${id}`} ><button class="btn btn-secondary" >View Details</button></Link>
            </div>
        </div>
    </>
    )
}
