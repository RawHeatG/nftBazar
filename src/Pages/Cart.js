import { useData } from "../Contexts";
import { CartCard } from "../Components";

export function Cart() {
    const{ itemsInCart } = useData();
    let total = 0;
    return(
        <>
            {(itemsInCart.length === 0) ?
                (
                    <div>
                        <h1>Cart is Empty</h1>
                    </div>
                )
            :
                (
                    <div className="App" style={{ display: "flex", flexWrap: "wrap" }}>
                        {itemsInCart.map( (item) => (<CartCard product={item} />) )}
                    </div>
                )
            }
            
            <div>
                <ol>
                    {itemsInCart.map( ({name, quantity, price}) => {
                        total = total + price*quantity;
                        return(<li><div>
                            <p>{name} x {quantity} = {price*quantity}</p>
                        </div></li>)
                    })}
                </ol>
                <h2>Total amount: {total}</h2>
            </div>
            
        </>
    )
}