import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import logoimg from '../assets/freshcart-logo.svg'
import { CartContext } from '../ShareData/CartContext'

export default function Navbar(NavProps) {
  let{cartData,gettCartData,removeCartItem,updateQuantity} = useContext(CartContext)

  return (
<>

<nav className="navbar navbar-expand-lg bg-light">
    <div className="container-fluid">
    <img src={logoimg} alt="logo" className='col-1'/>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

          {NavProps.LayoutProps.checkLoginData != null ?<> <li className="nav-item">
            <Link className="nav-link active " aria-current="page"  to="home">Home</Link></li><li className="nav-item">
 </li> </>: ""}
 
 

        </ul>


        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          {NavProps.LayoutProps.checkLoginData != null?          <div className='pt-2 d-flex align-items-center'>
            <i className="fa-brands fa-solid fa-instagram pe-2 "></i>
            <i className="fa-brands fa-youtube pe-2 "></i>
            <i className="fa-brands fa-tiktok pe-2 "></i>
            <i className="fa-brands fa-twitter pe-2 "></i>
            <i className="fa-brands fa-facebook pe-2 "></i>
            {/* <i className='fa-solid fa-shopping-cart'></i> */}
            <div  className=" position-relative mx-3 ">
            <i className='fa-solid fa-shopping-cart ' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"></i>
{cartData?  <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle px-1 py-1 bg-success">
{cartData.numOfCartItems}
    <span className="visually-hidden">unread messages</span>
  </span>:""}
</div>

            <li className="nav-item">
            <Link className="nav-link text-dark " onClick={NavProps.LogOut}>LogOut</Link>
          </li>



            </div>: <>
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/" >Register</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="login" >Login</Link>
          </li>

          </>}
  
 

        </ul>

      </div>
    </div>
  </nav>

{/* <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Toggle right offcanvas</button> */}

<div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
  <div className="offcanvas-header">
    <h5 className="offcanvas-title text-center mx-auto" id="offcanvasRightLabel">Your shopping-cart <i className='fa-solid fa-shopping-cart fa-bounce'></i></h5>
    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div className="offcanvas-body">
  <div className='container'>
<div className='row bg-light g-3'>
{cartData? <>

        {cartData.data.products.map((el,i)=>{
          return <div className='col-6' key={i}>
            <div className='d-flex justify-content-center item '>
<div className=''>
<img src={el.product.imageCover} className='w-100' height={150}  alt="productimg" />
              <h3 className='h6 '>{el.product.title.split(" ").slice(0,4).join(" ")}</h3>
              <div className='pe-2'>{el.price}EGP</div>

<div className='d-flex justify-content-between align-items-center'>
{/* <div className='pe-2'>{el.price}EGP</div> */}

              <div ><button className='btn btn-dark text-light btn-sm py-0 px-1' onClick={()=>{updateQuantity(el.product._id,el.count+=1)}}>+</button><span className='px-1'>{el.count}</span> <button className='btn btn-dark text-light btn-sm py-0 px-1' onClick={()=>{updateQuantity(el.product._id,el.count-=1)}}>-</button></div>
              <div className='px-2 py-3'><i className='fa-solid fa-trash text-danger' onClick={()=>{removeCartItem(el.product. _id)}}></i></div >

</div>

</div>

            </div>
          </div>

        })}
                                <div colSpan={4} className='text-center'>Total Price</div>

                  <div  className='text-center '><span className='bg-success  rounded py-2 px-5 '>{cartData.data.totalCartPrice} EGP</span></div>

        </>



        :""}
</div>

    </div>  </div>
</div>
</>
  )
}
