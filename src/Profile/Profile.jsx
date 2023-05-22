import React from 'react'
import './profile.css'

export default function Profile(ProfileProps) {
console.log("profile");
console.log(ProfileProps);
  return (
    <div className='Profile-bg w-100   d-flex justify-content-center align-items-center'>
       <h2 className='profile-title text-success'>Hello {ProfileProps.mytoken?.name} <i className="fa-regular fa-face-smile-beam text-success"></i></h2>
       
    </div>
  )
}
