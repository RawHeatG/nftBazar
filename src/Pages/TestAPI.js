import axios from "axios";
import { useState, useEffect } from "react";
import { useData } from "../Contexts/data-context"

export function TestAPI(){

    const [ testData, setTestData ] = useState([])
    

    // async function SendData(){
    //     const response = await axios.post('https://nftBaazarAPI.rawheatg.repl.co/test/populate', data )
    //     console.log(response);
    // }
    var total=0
    return(
        <>
            <h1>Welcome to API Tester!</h1>
            {/* <button class="btn btn-secondary" onClick={SendData}>Send Data</button> */}
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