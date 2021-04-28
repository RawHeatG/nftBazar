import { useData } from "../../Contexts";

export function CartCard({product}) {
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
                    {quantity>1 ? 
                        (<button class="btn btn-tertiary" onClick={() => dispatch({type: "MANIPULATE_CART", payload: {manipulation: "DECREASE", item: product}})} >-</button>)
                        :
                        (<button class="btn btn-tertiary" onClick={() => dispatch({type: "MANIPULATE_CART", payload: {manipulation: "REMOVE", item: product}})} >Remove</button>)
                    }
                    
                    <h3>{quantity}</h3>
                    <button class="btn btn-tertiary" onClick={() => dispatch({type: "MANIPULATE_CART", payload: {manipulation: "INCREASE", item: product}})} >+</button>
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

        <div div key={id} class="card" >
            <img class="card-img" width="100%" height="auto" src={image} alt={productName} />
            <div class="card-content">
                <h2 class="card-heading">{name}</h2>
                <div class="price">
                <span class="card-price">₹ {price}</span><s>1000</s>
                </div>
                {inStock && <div> In Stock </div>}
                {!inStock && <div> Out of Stock </div>}
                {fastDelivery ? ( <div> Fast Delivery </div> ) : ( <div> 3 days minimum </div> )}
                {!itemsInWishList.find((item) => item.id === id) && ( <button class="btn btn-tertiary" onClick={() => dispatch({type: "MANIPULATE_WISHLIST", payload: {manipulation: "MOVE_TO_WISHLIST", item: product}})} >Move to WishList</button>)}
                {WhichButtonToShow()}
            </div>                        
        </div>
    )
}
