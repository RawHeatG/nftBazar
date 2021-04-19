import axios from "axios";
import { useState, useEffect } from "react";

export function TestAPI(){

    const [ testData, setTestData ] = useState([])

    useEffect(() => {
        (async function () {
            const response = await axios('https://nftBaazarAPI.rawheatg.repl.co/test')
            console.log("RESPONSE: ", typeof(Object.keys(response.data.data)), response.data.data)
            setTestData(Object.values(response.data.data))
            console.log("Test datat: ", testData)
        })();
    }, []);

    // async function GetData(){
    //     response = await axios('https://nftBaazarAPI.rawheatg.repl.co/test')
    // }
    var total=0
    return(
        <>
            <h1>Welcome to API Tester!</h1>
            <ul>
                {testData.map( ({ name, price, quantity}) => (
                    <li>
                        <h1>{name}</h1>
                        <h2>₹ {price}</h2>
                        <h3>{quantity}</h3>
                        {total += price}
                    </li>
                ))}
            </ul>
            <h1>Total Amount: ₹{total}</h1>
        </>
    )
}