import React from 'react'
import './Navbar.css'
import nav_logo from '../../assets/nav-logo.png'
import nav_profile from '../../assets/nav-profile.svg'

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="s">
      <img className='nav-logo' src={nav_logo} alt="" />
      <h1 className='t'>e-cart</h1>
      </div>
   
      <img className='nav-profile' src={nav_profile} alt="" />
    </div>
  )
}

export default Navbar
