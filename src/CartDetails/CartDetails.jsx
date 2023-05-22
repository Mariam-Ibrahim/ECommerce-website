import React, { useContext, useEffect } from 'react'
import { CartContext } from '../ShareData/CartContext'
import { Link } from 'react-router-dom'

export default function CartDetails() {
  let {cartData,gettCartData,removeCartItem,updateQuantity} = useContext(CartContext)
  useEffect(()=>{
    gettCartData()
  },[])
  return (
    <div className='container'>
        {cartData?

            <div>
                <table className="table border-2 mt-3  align-middle bg-light" >
                <thead className='text-center'>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className='text-center' >
                    {cartData.data.products.map((el,i)=>{
                        return                     <tr key={i}  >
                        <td>
                        <img src={el.product.imageCover} className='w-75' height={150}  alt="productimg" />
    
                        </td>
                        <td>{el.product.title}</td>
                        <td><button className='btn btn-success btn-sm' onClick={()=>{updateQuantity(el.product._id,el.count+=1)}}>+</button><span className='px-2'>{el.count}</span> <button className='btn btn-warning btn-sm' onClick={()=>{updateQuantity(el.product._id,el.count-=1)}}>-</button></td>
                    <td>{el.price}EGP</td>
                    <td><i className='fa-solid fa-trash text-danger' onClick={()=>{removeCartItem(el.product. _id)}}></i></td>
                    </tr>
                    })}

                    <tr >
                        <td colSpan={4} className='text-center'>Total Price</td>
                        <td ><span className='bg-success rounded py-2 px-1'>{cartData.data.totalCartPrice} EGP</span></td>
                    </tr>
                </tbody>
            </table>
            <div className='text-end'><Link className='btn btn-success ' to={'/checkoutSession/'+cartData.data._id}>Confirm your order</Link></div>
            </div>

        :""}

    </div>
  )
}
