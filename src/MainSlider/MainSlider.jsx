import React from 'react'
import img1 from '../assets/slider-image-1.jpeg'
import img2 from '../assets/slider-image-2.jpeg'
import img3 from '../assets/slider-image-3.jpeg'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';


export default function MainSlider() {
  return (
    <div className='row g-0'>
        <div className='col-9 '>
            <OwlCarousel className='owl-theme' loop items={1} >
            <img height={400} src={img1} alt="Image" className='w-100' />
            <img height={400} src={img2} alt="Image" className='w-100' />
            <img height={400} src={img3} alt="Image" className='w-100' />


    </OwlCarousel>
        </div>
        <div className='col-3'>
        <img height={200} src={img2} alt="Image" className='w-100'/>
        <img height={200} src={img3} alt="Image" className='w-100'/>

        </div>
    </div>
  )
}
