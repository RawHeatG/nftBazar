import {
  useContext,
  createContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import axios from "axios";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

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

  function manipulateCart(state, { manipulation, item }) {
    switch (manipulation) {
      case "ADD_TO_CART": {
        item = { ...item, quantity: 1 };
        return { ...state, itemsInCart: [...state.itemsInCart, item] };
      }

      case "MOVE_TO_CART": {
        item = { ...item, quantity: 1 };
        return {
          ...state,
          itemsInCart: [...state.itemsInCart, item],
          itemsInWishList: [
            ...state.itemsInWishList.filter(
              (wishListItem) => wishListItem.id !== item.id
            ),
          ],
        };
      }

      case "INCREASE":
        return {
          ...state,
          itemsInCart: [
            ...state.itemsInCart.map((cartItem) =>
              cartItem.id === item.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
            ),
          ],
        };

      case "DECREASE":
        return {
          ...state,
          itemsInCart: [
            ...state.itemsInCart.map((cartItem) =>
              cartItem.id === item.id
                ? { ...cartItem, quantity: cartItem.quantity - 1 }
                : cartItem
            ),
          ],
        };

      case "REMOVE":
        return {
          ...state,
          itemsInCart: [
            ...state.itemsInCart.filter((cartItem) => cartItem.id !== item.id),
          ],
        };

      default:
        return state;
    }
  }

  function manipulateWishList(state, { manipulation, item }) {
    switch (manipulation) {
      case "ADD_TO_WISHLIST":
        return { ...state, itemsInWishList: [...state.itemsInWishList, item] };
      case "REMOVE_FROM_WISHLIST":
        return {
          ...state,
          itemsInWishList: [
            ...state.itemsInWishList.filter(
              (wishListItem) => wishListItem.id !== item.id
            ),
          ],
        };
      case "MOVE_TO_WISHLIST":
        return {
          ...state,
          itemsInCart: [
            ...state.itemsInCart.filter((cartItem) => cartItem.id !== item.id),
          ],
          itemsInWishList: [...state.itemsInWishList, item],
        };
    }
  }

  //reduce driver function
  function reducer(state, action) {
    switch (action.type) {
      case "TOGGLE_INVENTORY":
        return (state = {
          ...state,
          showInventoryAll: !state.showInventoryAll,
        });

      case "TOGGLE_DELIVERY":
        return (state = {
          ...state,
          showFastDeliveryOnly: !state.showFastDeliveryOnly,
        });
      case "SORT":
        return {
          ...state,
          sortBy: action.payload,
        };
      case "MANIPULATE_CART":
        return manipulateCart(state, action.payload);
      case "MANIPULATE_WISHLIST":
        return manipulateWishList(state, action.payload);
      default:
        return state;
    }
  }

  const [
    {
      showInventoryAll,
      showFastDeliveryOnly,
      sortBy,
      itemsInCart,
      itemsInWishList,
    },
    dispatch,
  ] = useReducer(reducer, {
    showInventoryAll: true,
    showFastDeliveryOnly: false,
    sortBy: null,
    itemsInCart: [],
    itemsInWishList: [],
  });
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
