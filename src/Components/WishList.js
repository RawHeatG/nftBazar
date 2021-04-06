import { useData } from "../Contexts";
import { ProductCard } from "./Cards";
import "../styles.css";

export function WishList() {
    const{ itemsInWishList } = useData();
    return(
        <>
            {(itemsInWishList.length === 0) ?
                (
                    <div>
                        <h1>Nothing's here in WishList :(</h1>
                    </div>
                )
            :
                (
                    <div className="App" style={{ display: "flex", flexWrap: "wrap" }}>
                        {itemsInWishList.map( (item) => (<ProductCard product={item} />) )}
                    </div>
                )
            }
        </>
    )
}