// const cartHandler = async (product, quantity) => {
//   try {
//     if (currentUser) {
//       const response = await axios.post(
//         `https://nftBaazarAPI.rawheatg.repl.co/cart/${currentUser.userId}`,
//         { productId: product._id, quantity: quantity }
//       );
//       return response.data.success;
//     } else {
//       console.error("Please Login first");
//     }
//   } catch (err) {
//     console.error(err);
//   }
// };

// const wishlistHandler = async (product) => {
//   try {
//     if (currentUser) {
//       const response = await axios.post(
//         `https://nftBaazarAPI.rawheatg.repl.co/wishlist/${currentUser.userId}`,
//         { productId: product._id }
//       );
//       return response.data.success;
//     } else {
//       console.error("Error!!!");
//     }
//   } catch (err) {
//     console.error(err);
//   }
// };

// function manipulateCart(state, { manipulation, item }) {
//   switch (manipulation) {
//     case "ADD_TO_CART": {
//       const responseStatus = cartHandler(item, 1);
//       if (responseStatus) {
//         item = { ...item, quantity: 1 };
//         return { ...state, itemsInCart: [...state.itemsInCart, item] };
//       }
//     }

//     case "MOVE_TO_CART": {
//       const cartResponseStatus = cartHandler(item, 1);
//       if (cartResponseStatus) {
//         const wishlistResponseStatus = wishlistHandler(item);
//         if (wishlistResponseStatus) {
//           item = { ...item, quantity: 1 };
//           return {
//             ...state,
//             itemsInCart: [...state.itemsInCart, item],
//             itemsInWishList: [
//               ...state.itemsInWishList.filter(
//                 (wishListItem) => wishListItem.id !== item.id
//               ),
//             ],
//           };
//         }
//       }
//     }

//     case "INCREASE":
//       const cartItem = state.itemsInCart.find(
//         (cartItem) => cartItem.id === item.id
//       );
//       const responseStatus = cartHandler(item, cartItem.quantity + 1);
//       if (responseStatus) {
//         return {
//           ...state,
//           itemsInCart: [
//             ...state.itemsInCart.map((cartItem) =>
//               cartItem.id === item.id
//                 ? { ...cartItem, quantity: cartItem.quantity + 1 }
//                 : cartItem
//             ),
//           ],
//         };
//       }

//     case "DECREASE":
//       const itemInCart = state.itemsInCart.find(
//         (cartItem) => cartItem.id === item.id
//       );
//       if (cartHandler(item, itemInCart.quantity - 1)) {
//         return {
//           ...state,
//           itemsInCart: [
//             ...state.itemsInCart.map((cartItem) =>
//               cartItem.id === item.id
//                 ? { ...cartItem, quantity: cartItem.quantity - 1 }
//                 : cartItem
//             ),
//           ],
//         };
//       }

//     case "REMOVE":
//       if (cartHandler(item, 0)) {
//         return {
//           ...state,
//           itemsInCart: [
//             ...state.itemsInCart.filter((cartItem) => cartItem.id !== item.id),
//           ],
//         };
//       }

//     default:
//       console.error("Error occured while manipulating Cart");
//   }
// }

// async function manipulateWishList(state, { manipulation, item }) {
//   switch (manipulation) {
//     case "ADD_TO_WISHLIST":
//       const responseStatus = await wishlistHandler(item);
//       if (responseStatus) {
//         return {
//           ...state,
//           itemsInWishList: [...state.itemsInWishList, item],
//         };
//       }

//     case "REMOVE_FROM_WISHLIST":
//       return {
//         ...state,
//         itemsInWishList: [
//           ...state.itemsInWishList.filter(
//             (wishListItem) => wishListItem.id !== item.id
//           ),
//         ],
//       };

//     case "MOVE_TO_WISHLIST":
//       return {
//         ...state,
//         itemsInCart: [
//           ...state.itemsInCart.filter((cartItem) => cartItem.id !== item.id),
//         ],
//         itemsInWishList: [...state.itemsInWishList, item],
//       };
//   }
// }

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
    // case "MANIPULATE_CART":
    //   return manipulateCart(state, action.payload);

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
      const cartItem = state.itemsInCart.find(
        (cartItem) => cartItem.id === action.payload.id
      );
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
      const itemInCart = state.itemsInCart.find(
        (cartItem) => cartItem.id === action.payload.id
      );
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
    // case "MANIPULATE_WISHLIST":
    //   console.log("In DataProvider, Manipulate called");
    //   return manipulateWishList(state, action.payload);

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
