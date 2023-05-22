import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import anyImg from '../assets/assortment-citrus-fruits.png'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';


export default function ProductDetails() {
  let params =useParams()
  let Navigate=useNavigate()

  let MyID=params.id
  let [productDetails,setProductDetails]=useState(undefined)



  useEffect(()=>{
    getDetails(MyID)
  },[])
  async function getDetails(id){
    let resp= await axios.get(`https://route-ecommerce.onrender.com/api/v1/products/${id}`)

setProductDetails(resp.data.data)
console.log("details");
console.log(resp.data.data);
  }
async function addToCart(id){
let body ={productId: id}
let headers={token: localStorage.getItem("token")}
let {data}=await axios.post('https://ecommerce.routemisr.com/api/v1/cart', body ,{headers:headers})
console.log(data)
if(data.status=='success'){
  Navigate('/cartDetails')
}
}

  return ( 
 <div>
     {productDetails != undefined ?    <div className='container mt-5'>
    <div className='row g-5 align-items-center' key={MyID}>
      <div className='col-lg-4 col-md-12 col-sm-12'>
      <OwlCarousel className='owl-theme' loop items={1} >
{productDetails.images.map((el,i)=>{
return <img src={el} alt="" className='w-100' key={i}/>
})}


    </OwlCarousel>
      </div>
      <div className='col-lg-8 col-md-12 col-sm-12'>
        <p >{productDetails.title}</p>
        <span className='text-muted'>{productDetails.description}</span>
        <h3 className='h6 pt-3'>{productDetails.category.name}</h3>
       <div className='d-flex justify-content-between'>
       <span >{productDetails.price} EGP</span>
       <div>
        <i className='fa-solid fa-star text-warning'></i> {productDetails.ratingsAverage}
       </div>
       </div>
        <button onClick={()=>addToCart(productDetails.id)} className='btn btn-success w-100 mt-4'>+ add to cart</button>
      </div>
    </div>
  </div>: ""}
 </div>

  )
}
