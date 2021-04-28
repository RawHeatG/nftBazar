import {useContext, createContext, useReducer, useEffect, useState } from "react";
import axios from "axios";

const DataContext = createContext();

export function DataProvider({children}) {

    console.log("Data context called")
    
    const [ data, setData ] = useState([]);
    const [ loading, setLoading ] = useState(true);
  
    useEffect(() => {
        (async function () {
            
            console.log("data called")
            const response = await axios('https://nftBaazarAPI.rawheatg.repl.co/test');
            console.log("Data from useEfect: ", data)
            setData(response.data.data);
            
            setLoading(false);
            console.log("Data from useEfect: ", data)
        }) ()
    }, []);
    
    //data population using faker
    // faker.seed(123);

    // const data = [...Array(50)].map((item) => ({
    //     quantity: 0,
    //     id: faker.random.uuid(),
    //     name: faker.commerce.productName(),
    //     image: faker.random.image(),
    //     price: faker.commerce.price(),
    //     material: faker.commerce.productMaterial(),
    //     brand: faker.lorem.word(),
    //     inStock: faker.random.boolean(),
    //     fastDelivery: faker.random.boolean(),
    //     ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
    //     offer: faker.random.arrayElement([
    //         "Save 50",
    //         "70% bonanza",
    //         "Republic Day Sale"
    //     ]),
    //     idealFor: faker.random.arrayElement([
    //         "Men",
    //         "Women",
    //         "Girl",
    //         "Boy",
    //         "Senior"
    //     ]),
    //     level: faker.random.arrayElement([
    //         "beginner",
    //         "amateur",
    //         "intermediate",
    //         "advanced",
    //         "professional"
    //     ]),
    //     color: faker.commerce.color()
    // }));
    function manipulateCart( state, {manipulation, item}){
        switch(manipulation){

            case "ADD_TO_CART":
                {
                    item = {...item, quantity: 1}
                    return {...state, itemsInCart: [...state.itemsInCart, item]}
                }

            case "MOVE_TO_CART":
                {
                    item = {...item, quantity: 1}
                    return {...state,
                        itemsInCart: [...state.itemsInCart, item],
                        itemsInWishList : [...state.itemsInWishList.filter((wishListItem) => wishListItem.id !==  item.id )]
                    }
                }
            
            case "INCREASE":
                return { ...state, itemsInCart : [
                    ...state.itemsInCart.map((cartItem) => cartItem.id === item.id ?  {...cartItem, quantity: cartItem.quantity + 1} : cartItem)
                ]}

            case "DECREASE":
                return { ...state, itemsInCart : [
                    ...state.itemsInCart.map((cartItem) => cartItem.id === item.id ?  {...cartItem, quantity: cartItem.quantity - 1} : cartItem)
                ]}

            case "REMOVE":
                return { ...state, 
                    itemsInCart : [ ...state.itemsInCart.filter((cartItem) => cartItem.id !==  item.id ) ]
                }

            default:
                return state;
        }
    }

    function manipulateWishList( state, {manipulation, item}) {
        switch (manipulation){
            case "ADD_TO_WISHLIST":
                return {...state, itemsInWishList: [...state.itemsInWishList, item]};
            case "REMOVE_FROM_WISHLIST":
                return { ...state,
                    itemsInWishList : [ ...state.itemsInWishList.filter((wishListItem) => wishListItem.id !==  item.id ) ]
                }
            case "MOVE_TO_WISHLIST":
                return { ...state,
                    itemsInCart : [...state.itemsInCart.filter((cartItem) => cartItem.id !==  item.id )], 
                    itemsInWishList: [...state.itemsInWishList, item]
                }
        }
        
    }

    //reduce driver function
    function reducer(state, action) {
        switch (action.type) {
            case "TOGGLE_INVENTORY":
                return (state = {
                    ...state,
                    showInventoryAll: !state.showInventoryAll
                });

            case "TOGGLE_DELIVERY":
                return (state = {
                    ...state,
                    showFastDeliveryOnly: !state.showFastDeliveryOnly
                });
            case "SORT":
                return {
                    ...state,
                    sortBy: action.payload
                };
            case "MANIPULATE_CART":
                return (
                    manipulateCart( state, action.payload )
                );
            case "MANIPULATE_WISHLIST":
                return (
                    manipulateWishList( state, action.payload )
                );
            default:
                return state;
        }
    }

    //intializing useReducer()
    const [{
        showInventoryAll,
        showFastDeliveryOnly,
        sortBy,
        itemsInCart,
        itemsInWishList
    }, dispatch] = useReducer(
        reducer, {
            showInventoryAll: true,
            showFastDeliveryOnly: false,
            sortBy: null,
            itemsInCart: [],
            itemsInWishList: []
        }
    );
    return ( 
        <DataContext.Provider value = {
            {
                showInventoryAll,
                showFastDeliveryOnly,
                sortBy,
                dispatch,
                itemsInCart,
                itemsInWishList,
                data,
                loading
            }
        }>
            {children}
        </DataContext.Provider>
    )
}

export function useData() {
    return useContext(DataContext);
}