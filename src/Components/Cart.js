import { useData } from "../data-context";
import { ProductCard } from "./ProductCard"

export function Cart() {
    const{ itemsInCart } = useData();
    return(
        <>
            {(itemsInCart.lentgh === 0) ?
                (
                    <div>
                        <h1>Cart is Empty</h1>
                    </div>
                )
            :
                (
                    <div className="App" style={{ display: "flex", flexWrap: "wrap" }}>
                        {itemsInCart.map( (item) => (<ProductCard product={item} />) )}
                    </div>
                )
                }
        </>
    )
}