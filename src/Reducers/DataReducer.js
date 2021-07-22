export function dataReducer(state, action) {
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

    case "INITIALIZE_CART": {
      return {
        ...state,
        itemsInCart: action.payload,
      };
    }

    case "INITIALIZE_WISHLIST": {
      return {
        ...state,
        itemsInWishList: action.payload,
      };
    }

    case "ADD_TO_CART": {
      action.payload = { ...action.payload, quantity: 1 };
      return { ...state, itemsInCart: [...state.itemsInCart, action.payload] };
    }

    case "MOVE_TO_CART": {
      action.payload = { ...action.payload, quantity: 1 };
      return {
        ...state,
        itemsInCart: [...state.itemsInCart, action.payload],
        itemsInWishList: [
          ...state.itemsInWishList.filter(
            (wishListItem) => wishListItem.id !== action.payload.id
          ),
        ],
      };
    }

    case "INCREASE_QUANTITY":
      return {
        ...state,
        itemsInCart: [
          ...state.itemsInCart.map((cartItem) =>
            cartItem.id === action.payload.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          ),
        ],
      };

    case "DECREASE_QUANTITY":
      return {
        ...state,
        itemsInCart: [
          ...state.itemsInCart.map((cartItem) =>
            cartItem.id === action.payload.id
              ? { ...cartItem, quantity: cartItem.quantity - 1 }
              : cartItem
          ),
        ],
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        itemsInCart: [
          ...state.itemsInCart.filter(
            (cartItem) => cartItem.id !== action.payload.id
          ),
        ],
      };

    case "ADD_TO_WISHLIST":
      return {
        ...state,
        itemsInWishList: [...state.itemsInWishList, action.payload],
      };

    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        itemsInWishList: [
          ...state.itemsInWishList.filter(
            (wishListItem) => wishListItem.id !== action.payload.id
          ),
        ],
      };

    case "MOVE_TO_WISHLIST":
      return {
        ...state,
        itemsInCart: [
          ...state.itemsInCart.filter(
            (cartItem) => cartItem.id !== action.payload.id
          ),
        ],
        itemsInWishList: [...state.itemsInWishList, action.payload],
      };
    default:
      return state;
  }
}
