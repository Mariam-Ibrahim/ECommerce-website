import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext=createContext(null)
export function CartContextProvider(props){
    let [cartData,setCartData]=useState(null)
    useEffect(()=>{
        gettCartData()
    },[])
async function gettCartData(){
    let headers={token: localStorage.getItem("token")}

    let {data}=await axios.get('https://ecommerce.routemisr.com/api/v1/cart',{headers})
    // console.log(data);
    setCartData(data)
    
}
async function removeCartItem(id){
    let headers={token: localStorage.getItem("token")}
    let {data}=await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}` ,{headers})
    // console.log(data);
    setCartData(data)

}

async function updateQuantity(id,number){
    let body={count: number}
    let headers={token: localStorage.getItem("token")}
    let {data}=await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,body ,{headers})
    // console.log(data);
    setCartData(data)
}

    return <CartContext.Provider value={{cartData,gettCartData,removeCartItem,updateQuantity}}>
        {props.children}
    </CartContext.Provider>
}