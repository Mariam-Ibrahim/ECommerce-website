import { useFormik } from 'formik'
import React, { useState } from 'react'
import './Register.css'
import * as yup from 'yup'
import axios, { Axios } from 'axios'
import { useNavigate } from 'react-router-dom'





export default function Register() {
    let [errorMsg, setErrorMsg]=useState("")
    let[loadingBtn,setLoadingBtn]=useState(false)
    let Navigate =useNavigate()
let validate=yup.object({
    name:yup.string().required().matches(/^[A-Z][a-zA-Z0-9 _]{1,7}[A-Z][a-zA-Z0-9 _]{1,7}$/,"please , enter your first and last name , start with an uppercase character , you can only use _ as a special character"),

    email:yup.string().required().email("at least 5 characters , and you can only use [Upper/Lower cases, Numbers ,- , _] then @example.com").matches(/^[a-zA-Z0-9_-]{5,20}@[a-z]{3,10}\.(com)$/,"emails has to contain at least 5 characters , and you can only use [Upper/Lower cases, Numbers ,- , _]"),
    
    password:yup.string().required().matches(/^[A-Z][a-zA-Z0-9_@$]{7,15}$/, "password has to start with an upper case followed by at least 7 characters"),
    rePassword:yup.string().required().oneOf([yup.ref('password')]),

    phone:yup.string().required().matches(/^(010|011|012|015)[0-9]{8}$/, "enter your true number")


})

let formik = useFormik({
    initialValues:{
        name:"",
        email:"",
        phone:"",
        password:"",
        rePassword:""
    },
    onSubmit:(values)=>{
console.log("my values");
sendObjData(values)

    },
    validationSchema:validate
  
})
async function sendObjData(objData){
    setLoadingBtn(true)
    let myData= await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", objData).catch((x)=>{
       console.log(x);
        setErrorMsg(x.response.data.message)
        setLoadingBtn(false)

    })
    console.log("sent");
    console.log(myData);

    if(myData.data.message == 'success'){
        Navigate('/login')
        setLoadingBtn(false)

    }



}






  return (<div>

    <div className=' w-100 h-100 py-5 d-flex justify-content-center align-items-center rigesterbg'>


       
        <form className='col-lg-4 col-md-12 col-sm-12 py-5 border border-1 border-success rounded px-3' onSubmit={formik.handleSubmit}>
        <h2 className='text-center '>Register Now</h2>
<div>
<label htmlFor=""> name:</label>
 <input type="text" name='name' className='form-control border-success shadow-none' onChange={formik.handleChange} />
 <p className='text-danger'>{formik.errors.name}</p>
</div>
<div>
<label htmlFor="">email:</label>
 <input type="email" name='email' className='form-control border-success shadow-none' onChange={formik.handleChange} />
 <p className='text-danger'>{formik.errors.email}</p>
</div>



<div>
<label htmlFor="">phone:</label>
 <input type="text" name='phone' className='form-control border-success shadow-none' onChange={formik.handleChange}/>
 <p className='text-danger'>{formik.errors.phone}</p>

</div>

<div>
<label htmlFor="">password:</label>
 <input type="password" name='password' className='form-control border-success shadow-none' onChange={formik.handleChange} />
 <p className='text-danger'>{formik.errors.password}</p>

</div>

<div>
<label htmlFor="">rePassword:</label>
 <input type="password" name='rePassword' className='form-control border-success shadow-none'onChange={formik.handleChange} />
 <p className='text-danger'>{formik.errors.rePassword}</p>

</div>


{loadingBtn ==true ?<button className='btn btn-success' type='submit'><i className='fa-solid fa-spinner fa-spin'></i></button>:<button disabled={!formik.isValid} className='btn btn-success' type='submit'>Register</button>}



{errorMsg != "" ? <div className='border border-danger text-danger rounded p-3 mt-2'>{errorMsg}</div> : ""}



        </form>
    </div>
    </div>
  )
}
