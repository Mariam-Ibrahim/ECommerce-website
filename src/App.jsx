import React, { useEffect, useState } from 'react'
import { createBrowserRouter, Navigate, RouterProvider, useNavigate } from 'react-router-dom'
import Home from './Home/Home'
import Layout from './Layout/Layout'
import Login from './Login/Login'
import Logout from './Logout/Logout'
import Navbar from './Navbar.jsx/Navbar'
import Profile from './Profile/Profile'
import Register from './Register/Register'
import jwtDecode from 'jwt-decode'
import ForgetPassword from './ForgetPassword/ForgetPassword'
import ResetPassword from './ResetPassword/ResetPassword'
import ProductDetails from './ProductDetails/ProductDetails'
import { CartContextProvider } from './ShareData/CartContext'
import CartDetails from './CartDetails/CartDetails'
import CheckoutSession from './Checkout/CheckoutSession'


export default function App() {
  let [checkLoginData,setChechdata]=useState(null)
  let [mytoken,setmytoken]=useState("")

  function ChangeNull(loginData){
    setChechdata(loginData)
  }
useEffect(()=>{
  if (localStorage.getItem("token")){
    let token=localStorage.getItem("token")
    let data=jwtDecode(token)
    setChechdata(data)
    setmytoken(data)
    // console.log("mydataaaa");
    // console.log(data);
  }
},[])



function ProtectedRouting(props){
if(localStorage.getItem("token")){
return props.children
}else{
  return <Navigate to='/login'/>
}
}

function LogOut(){
  setChechdata(null)
  localStorage.removeItem("token")
  return <Navigate to='/login'/>
}

function ProtectedRouting2(props){
if(localStorage.getItem("token")!=null){
  return <Navigate to='/home'/>
}
else{
  return props.children
}
}


let routes=createBrowserRouter([
  {path:"", element:<Layout checkLoginData={checkLoginData} LogOut={LogOut}/>, children:[
    {path:"",element:<ProtectedRouting2><Register/></ProtectedRouting2>},
    {path:"login",element:<Login ChangeNull={ChangeNull}/>},
    {path:"home",element:<ProtectedRouting><Home/></ProtectedRouting>},
    {path:"cartDetails",element:<ProtectedRouting><CartDetails/></ProtectedRouting>},
    {path:"checkoutSession/:id",element:<ProtectedRouting><CheckoutSession/></ProtectedRouting>},


    {path:"profile",element:<ProtectedRouting><Profile checkLoginData={checkLoginData} mytoken={mytoken} /></ProtectedRouting>},
    {path:"logout",element:<Logout/> },
    {path:"forgetpassword",element:<ForgetPassword/> },
    {path:"resetPasswod",element:<ResetPassword/> },
    {path:"productdetails/:id",element: <ProtectedRouting><ProductDetails/></ProtectedRouting>},


    {path:"*",element:<Register/> },


  ]}
])


  return (
    <CartContextProvider>
      <RouterProvider router={routes}/>

    </CartContextProvider>

  )
}


