import {
  useContext,
  createContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import { dataReducer } from "../../Reducers/DataReducer";
import { useAuth } from "../index";
import axios from "axios";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    (async function () {
      console.log("data called");
      const response = await axios(
        "https://nftBaazarAPI.rawheatg.repl.co/product"
      );
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
        // cartHandler,
        // wishlistHandler,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
