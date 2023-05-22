import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import './ForgetPAssword.css'

export default function ForgetPassword() {
    let Navigate = useNavigate()

let [EmailerrorMsg,setEmailErrorMsg]=useState("")
let [CodeerrorMsg,setCodeErrorMsg]=useState("")
let [flag , setFlag]=useState(false)
    let Validate1 =yup.object({
        email:yup.string().required().email("Enter a Valid Email")
    })

let formik1=useFormik({
    initialValues:{
        email:""
    },
    onSubmit:(email)=>{
        SendCode(email)
    },
    validationSchema:Validate1
})
async function SendCode(email){
    let MyEmail= await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", email).catch((x)=>{
        console.log(x.response.data.message)
        setEmailErrorMsg(x.response.data.message)
    })
    console.log(MyEmail);

    if(MyEmail.data.statusMsg== 'success'){
        setFlag(true)
  
    }
}




let Validate2 =yup.object({
    resetCode:yup.string().required()
})

let formik2=useFormik({
initialValues:{
    resetCode:""
},
onSubmit:(C)=>{
    validateCode(C)
},
validationSchema:Validate2
})
async function validateCode(Code){
let myCode= await axios.post("https://route-ecommerce.onrender.com/api/v1/auth/verifyResetCode", Code).catch((x)=>{
    setCodeErrorMsg(x.response.data.message)
})
    // setCodeErrorMsg(x.response.data.message)
console.log("My validation");
console.log(myCode);

if(myCode.data.status== "Success"){
    Navigate('/resetPasswod')
console.log("mmmm success");
}
}


  return (
    

<div className='w-100  py-5  d-flex justify-content-center align-items-center mybg'>

    {flag?<form className='col-lg-4 col-md-12 col-sm-12 py-5 border border-1 border-success rounded px-3' onSubmit={formik2.handleSubmit}>
    
   <div className='col-4'>
   <label className='mb-2' >Enter Code:</label>
    <input type="text" name='resetCode' id='resetCode' className='form-control mb-2 ' onChange={formik2.handleChange}  />
   </div>
    <p className=' text-danger'>{formik2.errors.resetCode}</p>
    <button className='btn btn-success' type='submit'>Send Code</button>
    {CodeerrorMsg != ""? <p className='text-danger'>{CodeerrorMsg}</p>:"" }
 </form> 
 :
<form className='col-4 py-5 border border-1 border-success rounded px-3 shadow-none' onSubmit={formik1.handleSubmit}>
    
    <label className='mb-2' >email:</label>
    <input type="email" name='email' id='email' className='form-control mb-2' onChange={formik1.handleChange}  />
    <p className=' text-danger'>{formik1.errors.email}</p>
    <button className='btn btn-success' type='submit'>Send Code</button>
    {EmailerrorMsg != ""? <p className='text-danger'>{EmailerrorMsg}</p>:"" }
 </form>}
 



 
</div>

  )
}
