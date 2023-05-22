import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { CartContext } from '../ShareData/CartContext'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function CheckoutSession() {
    let{cartData}=useContext(CartContext)
    let{id}=useParams()
    let formik=useFormik({
        initialValues:{
            details: "",
            phone: "",
            city: ""
        },
        onSubmit:(vals)=>{
            Checkout(vals,id)
        }
    })
    async function Checkout(vals,id){
        let body = {shippingAddress:vals}
        let headers={token:localStorage.getItem("token")}
        let {data}=await axios.post (`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`,body,{headers})
        console.log(data);
        if(data.status=='success'){
            window.open(data.session.url)
        }
    }
  return (
    <div className=' w-100 h-100 py-5 d-flex justify-content-center align-items-center rigesterbg'>
       
        <form className='col-4 py-5 border border-1 border-success rounded px-3' onSubmit={formik.handleSubmit}>
        <h2 className='text-center '>Get your order now:</h2>


<div>
<label htmlFor="">address:</label>
 <input type="text" name='details' className='form-control border-success shadow-none' onChange={formik.handleChange} />
 <p className='text-danger'>{formik.errors.details}</p>

</div>

<div>
<label htmlFor="">phone:</label>
 <input type="text" name='phone' className='form-control border-success shadow-none' onChange={formik.handleChange} />
 <p className='text-danger'>{formik.errors.phone}</p>

</div>

<div>
<label htmlFor="">city:</label>
 <input type="text" name='city' className='form-control border-success shadow-none'onChange={formik.handleChange} />
 <p className='text-danger'>{formik.errors.city}</p>

</div>
<button className='btn btn-success' type='submit'>Submit</button>
{/* {loadingBtn ==true ?<button className='btn btn-success' type='submit'><i className='fa-solid fa-spinner fa-spin'></i></button>:<button disabled={!formik.isValid} className='btn btn-success' type='submit'>SignIn</button>} */}
{/* <Link to="/forgetpassword" className='ps-3'>Forgot Password?</Link> */}



{/* {errorMsg != "" ? <div className='border border-danger text-danger rounded p-3 mt-2'>{errorMsg}</div> : ""} */}



        </form>
    </div>  )
}
