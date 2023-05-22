import axios from 'axios'
import React, { useEffect, useState } from 'react'
import anyImg from '../assets/assortment-citrus-fruits.png'
import './home.css'
import { Link } from 'react-router-dom'
import MainSlider from '../MainSlider/MainSlider'
import Categoryslider from '../CategorySlider/Categoryslider'
import $ from 'jquery'



export default function Home() {
  let [allProductsList,setProductsList]=useState ([])
  const [isLoading, setIsLoading] = useState(true)
useEffect(() => {
    setTimeout(() => { // after some fake time, component will stop with render
        setIsLoading(false);
    }, 5000);
}, []);


  useEffect(()=>{
    getAllData()
  },[])

  async function getAllData(){
    let resp= await axios.get("https://ecommerce.routemisr.com/api/v1/products")
// console.log(resp.data.data);
setProductsList(resp.data.data)
$(".myspinner").fadeOut(2000)
  }
  return (<div>
<div className='w-100 bg-white myspinner '><div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>


{/* <div className='w-100 bg-white myspinner '><i className='fa-solid fa-spinner fa-spin fs-1 text-secondary'></i></div> */}
    <div className='container mt-5'>
      <MainSlider/>
      <Categoryslider/>
      <div className='row g-3 mydiv mt-5'>
        {allProductsList.map((el,i)=>{
          return  <div className='col-lg-2 col-md-6 col-sm-6 ' key={i}>
                    <Link to={'/productdetails/' +el.id} >
          <div className='item p-3 '>
            <img src={el.imageCover} alt="item image" className='w-100 imgg' />
            <h3 className='text-success  pt-2   h6'>{el.brand.name}</h3>
            <p className='fw-bold pb-1  parag-height mb-0 d-flex align-items-center'>{el.title.split(" ").slice(0,3).join(" ")}</p>
            <div className='d-flex justify-content-between '>
             <div className='pt-0 '>
             <span className='pe-2'>{el.price}</span>EGP
             </div>
              <div>
                <span>{el.ratingsAverage}</span>
                <i className='fa-solid fa-star text-warning'></i>
              </div>
            </div>
          </div>
          </Link>

        </div>
        })}

      </div>
    </div>
    </div>
  )
}
