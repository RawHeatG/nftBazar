import { useParams } from "react-router-dom";
import { useData } from "../../Contexts";

export function ProductDetails() {
    const { productId } = useParams();
    const { data } = useData();
    const {
        id,
        name,
        image,
        price,
        productName,
        inStock,
        level,
        fastDelivery,
        quantity
      } = data.find((item) => item.id === productId )
    return(
        <>
            <div>
                <h1>{name}</h1> 
                <img src={image}></img>
            </div>
        </>
    )
}