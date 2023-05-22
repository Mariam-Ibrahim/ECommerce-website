import { useFormik } from 'formik'
import React, { useState } from 'react'

import * as yup from 'yup'
import axios, { Axios } from 'axios'
import { Link, useNavigate } from 'react-router-dom'


export default function Register(RegisterProps) {
    let [errorMsg, setErrorMsg]=useState("")
    let[loadingBtn,setLoadingBtn]=useState(false)
    let Navigate =useNavigate()
let validate=yup.object({

    email:yup.string().required().email("please , type a valid email"),

    password:yup.string().required().matches(/^[A-Z][a-zA-Z0-9_@#$&]{7,19}$/,"Invalid password"),

})

let formik = useFormik({
    initialValues:{
        email:"",
        password:"",
    },
    onSubmit:(values)=>{
console.log("my values");
sendObjData(values)

    },
    validationSchema:validate
  
})
async function sendObjData(objData){
    setLoadingBtn(true)
    let myData= await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", objData).catch((x)=>{
       console.log(x);
        setErrorMsg(x.response.data.message)
        setLoadingBtn(false)
        
    })
    console.log("sent");
    console.log(myData);

    if(myData.data.message == 'success'){
        Navigate('/home')
        setLoadingBtn(false)
        RegisterProps.ChangeNull(myData.data)
        localStorage.setItem("token",myData.data.token)

    }



}






  return (
    <div className=' w-100 h-100 py-5 d-flex justify-content-center align-items-center rigesterbg'>
       
        <form className='col-4 py-5 border border-1 border-success rounded px-3' onSubmit={formik.handleSubmit}>
        <h2 className='text-center '>Login Now</h2>


<div>
<label htmlFor="">email:</label>
 <input type="email" name='email' className='form-control border-success shadow-none' onChange={formik.handleChange} />
 <p className='text-danger'>{formik.errors.email}</p>

</div>

<div>
<label htmlFor="">password:</label>
 <input type="password" name='password' className='form-control border-success shadow-none'onChange={formik.handleChange} />
 <p className='text-danger'>{formik.errors.password}</p>

</div>

{loadingBtn ==true ?<button className='btn btn-success' type='submit'><i className='fa-solid fa-spinner fa-spin'></i></button>:<button disabled={!formik.isValid} className='btn btn-success' type='submit'>SignIn</button>}
<Link to="/forgetpassword" className='ps-3'>Forgot Password?</Link>



{errorMsg != "" ? <div className='border border-danger text-danger rounded p-3 mt-2'>{errorMsg}</div> : ""}



        </form>
    </div>
  )
}

