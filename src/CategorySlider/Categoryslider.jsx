import axios from 'axios'
import React, { useEffect, useState } from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

export default function Categoryslider() {
let [CategoriesList,setCategoriesList]=useState([])

useEffect(()=>{
    getCategoryImgs()
},[])

    async function getCategoryImgs(){
        let resp = await axios.get("https://route-ecommerce.onrender.com/api/v1/categories")
        setCategoriesList(resp.data.data)
        // console.log(resp.data.data);

    }
  return (<OwlCarousel className='owl-theme' autoplay={true} loop items={7} >
{CategoriesList.map((el,i)=>{
   return <img src={el.image} alt="" className='w-100' height={200} key={i}/>
})}


    </OwlCarousel>
  )
}
