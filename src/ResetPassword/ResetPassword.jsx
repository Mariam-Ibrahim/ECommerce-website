import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import './ResetPAssword.css' 

export default function ResetPassword() {
    let Navigate = useNavigate()
    let [CodeerrorMsg,setCodeErrorMsg]=useState("")
    let Validate2 =yup.object({
        email:yup.string().required().email("Enter a valid email"),
        newPassword:yup.string().required().matches(/^[A-Z][a-zA-Z0-9_@#$&]{7,19}$/,"At leat 8 Characters")
    })
    
    let formik2=useFormik({
    initialValues:{
        email:"",
        newPassword:""
    },
    onSubmit:(P)=>{
        validateCode(P)
    },
    validationSchema:Validate2
    })
    async function validateCode(Password){
    let myNewPAssword= await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", Password).catch((x)=>{
        setCodeErrorMsg(x.response.data.message)
    })
        // setCodeErrorMsg(x.response.data.message)
    console.log("My validation");
    console.log(myNewPAssword);
    
    if(myNewPAssword.data.token){
        Navigate('/login')
    console.log("mmmm success");
    }
    }
    

  return (
    <div className='w-100 py-5  d-flex justify-content-center align-items-center mybg'>
<form className='col-3 py-5 border border-1 border-success rounded px-3' onSubmit={formik2.handleSubmit}>
    
<label className='mb-2' >Email:</label>
     <input type="email" name='email' id='email' className='form-control mb-2 ' onChange={formik2.handleChange}  />

     <p className=' text-danger'>{formik2.errors.email}</p>

    

    <label className='mb-2' >Enter New Password:</label>
     <input type="password" name='newPassword' id='newPassword' className='form-control mb-2 ' onChange={formik2.handleChange}  />

     <p className=' text-danger'>{formik2.errors.newPassword}</p>
     <button className='btn btn-success' type='submit'>Submit</button>
     {CodeerrorMsg != ""? <p className='text-danger'>{CodeerrorMsg}</p>:"" }
  </form> 

    </div>
  )
}
