import {
  useContext,
  createContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import { dataReducer } from "../Reducers/DataReducer";
import { useAuth } from "./index";
import { getAllProducts, getCart, getWishlist } from "../services/dataServices";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    (async function () {
      console.log("data called");
      const response = await getAllProducts();
      console.log(response.data.data);

      setData(response.data.data);
      setLoading(false);
    })();
  }, []);

  const initialState = {
    showInventoryAll: true,
    showFastDeliveryOnly: false,
    sortBy: null,
    itemsInCart: [],
    itemsInWishList: [],
  };

  const [
    {
      showInventoryAll,
      showFastDeliveryOnly,
      sortBy,
      itemsInCart,
      itemsInWishList,
    },
    dispatch,
  ] = useReducer(dataReducer, initialState);

  useEffect(() => {
    (async function () {
      if (currentUser) {
        try {
          const cartResponse = await getCart(currentUser.userId);
          cartResponse.data.success &&
            dispatch({
              type: "INITIALIZE_CART",
              payload: cartResponse.data.data,
            });
          console.log(cartResponse);
          const wishlistResponse = await getWishlist(currentUser.userId);
          console.log(wishlistResponse);
          wishlistResponse.data.success &&
            dispatch({
              type: "INITIALIZE_WISHLIST",
              payload: wishlistResponse.data.data,
            });
        } catch (err) {
          console.error(err);
        }
      }
    })();
  }, [currentUser]);

  console.log("data called");

  console.log(itemsInCart, itemsInWishList);
  return (
    <DataContext.Provider
      value={{
        showInventoryAll,
        showFastDeliveryOnly,
        sortBy,
        dispatch,
        itemsInCart,
        itemsInWishList,
        data,
        loading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
