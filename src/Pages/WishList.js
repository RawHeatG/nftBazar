import { useData } from "../Contexts";
import { WishListCard } from "../Components";

export function WishList() {
  const { itemsInWishList } = useData();
  return (
    <>
      {itemsInWishList.length === 0 ? (
        <div>
          <h1>Nothing's here in WishList :(</h1>
        </div>
      ) : (
        <div className="App">
          {itemsInWishList.map((item) => (
            <WishListCard key={item._id} product={item} />
          ))}
        </div>
      )}
    </>
  );
}
