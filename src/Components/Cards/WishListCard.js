import { useData } from "../../Contexts";
import "../../styles.css";
import { Link } from "react-router-dom";

export function WishListCard({product}) {
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
                <button class="btn btn-primary" onClick={() => dispatch({type: "MANIPULATE_CART", payload: {manipulation: "MOVE_TO_CART", item: product}})} >Move To Cart</button>
            </div>
        )
    }
    return(
        <>
        <div key={id} class="card">
            {/* <img class="card-wishlist" width="100%" height="auto" src={image} alt={productName} /> */}
            <img class="card-img" width="100%" height="auto" src={image} alt={productName} />
            <div class="card-content">
                <h2 class="card-heading">{name}</h2>
                <div class="price">
                <span class="card-price">₹ {price}</span><s>1000</s>
                </div>
                {inStock && <div> In Stock </div>}
                {!inStock && <div> Out of Stock </div>}
                {fastDelivery ? ( <div> Fast Delivery </div> ) : ( <div> 3 days minimum </div> )}
                <div>
                    <button class="btn btn-tertiary" onClick={() => dispatch({type: "MANIPULATE_WISHLIST", payload: {manipulation: "REMOVE_FROM_WISHLIST", item: product}})} >Remove from Wishlist</button>
                </div>
                {CartButtons()}
            </div>
        </div>
    </>
    )
}
