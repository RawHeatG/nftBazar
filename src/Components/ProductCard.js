import { useData } from "../Contexts";
import "./styles.css";

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
    const WhichButtonToShow = () => {
        if(itemsInCart.find((item) => item.id === id)){
            return(
                <div>
                    <button onClick={() => dispatch({type: "MANIPULATE_CART", payload: {manipulation: "DECREASE", item: product}})} >-</button>
                    <h3>{quantity}</h3>
                    <button onClick={() => dispatch({type: "MANIPULATE_CART", payload: {manipulation: "INCREASE", item: product}})} >+</button>
                </div>
            )
        }
        return(
            <div>
                <button onClick={() => dispatch({type: "MANIPULATE_CART", payload: {manipulation: "ADD_TO_CART", item: product}})} >Add To Cart</button>
            </div>
        )
    }
    return(

        <div
            key={id}
            style={{
            border: "1px solid #4B5563",
            borderRadius: "0 0 0.5rem 0.5rem",
            margin: "1rem",
            maxWidth: "40%",
            padding: "0 0 1rem"
            }}
        >
            <img src={image} width="100%" height="auto" alt={productName} />
            <h3> {name} </h3>
            <div>₹ {price}</div>
            {inStock && <div> In Stock </div>}
            {!inStock && <div> Out of Stock </div>}
            <div>{level}</div>
            {fastDelivery ? ( <div> Fast Delivery </div> ) : ( <div> 3 days minimum </div> )}
            {itemsInWishList.find((item) => item.id === id) ? ( <button onClick={() => dispatch({type: "MANIPULATE_WISHLIST", payload: {manipulation: "REMOVE_FROM_WISHLIST", item: product}})} >Go to WishList</button> ) : ( <button onClick={() => dispatch({type: "MANIPULATE_WISHLIST", payload: {manipulation: "ADD_TO_WISHLIST", item: product}})} >Add to WishList</button>)}
            {WhichButtonToShow()}
                        
        </div>
    )
}
