import { useData } from "../data-context";
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
    const { dispatch } = useData();
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
            {(quantity === 0) ? ( <button onClick={() => dispatch({type: "MANIPULATE_QUANTITY", payload: {manipulation: "ADD_TO_CART", item: product}})} >Add To Cart</button> ) :
                (   
                    <div>
                        <button onClick={() => dispatch({type: "MANIPULATE_QUANTITY", payload: {manipulation: "DECREASE", item: product}})} >-</button>
                        <h3>{quantity}</h3>
                        <button onClick={() => dispatch({type: "MANIPULATE_QUANTITY", payload: {manipulation: "INCREASE", item: product}})} >+</button>
                    </div>
                )
            }
                        
        </div>
    )
}
