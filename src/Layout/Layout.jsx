import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar.jsx/Navbar'

export default function Layout(LayoutProps) {
  return (
<div>
<Navbar LayoutProps={LayoutProps} LogOut={LayoutProps.LogOut}/>
 <Outlet/>
</div>
  )
}
