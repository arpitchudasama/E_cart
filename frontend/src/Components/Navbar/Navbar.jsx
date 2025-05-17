import React, { useContext, useRef, useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.jpg'
import cart_icon from '../Assets/cart.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import nav_dropdown from '../Assets/dropdown_nav.png'

const Navbar = () => {

    const [menu,setMenu] = useState('Shop');
    const {getTotalCartItems} = useContext(ShopContext);
    const menuRef = useRef();

    const dropdown_toggle = (e) => {
      menuRef.current.classList.toggle('nav-menu-visible');
      e.target.classList.toggle('open');
    }

  return (
    <div className='navbar'>
      <Link to='/' style={{textDecoration: 'none'}}>
        <div className="nav-logo">
          <img className='ecart' src={logo} alt="" />
          <p>E-cart</p>
        </div>
      </Link>
      <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="" />
      <ul ref={menuRef} className='nav-menu'>
        <li onClick={() => {setMenu("Shop")}}><Link to='/' style={{textDecoration: 'none', color: 'white'}}>Shop</Link>{menu==="Shop"?<hr/>:<></>}</li>
        <li onClick={() => {setMenu("Phones")}}><Link to='/phones' style={{textDecoration: 'none', color: 'white'}}>Phones</Link>{menu==="Phones"?<hr/>:<></>}</li>
        <li onClick={() => {setMenu("Tablets")}}><Link to='/tablets' style={{textDecoration: 'none', color: 'white'}}>Tablets</Link>{menu==="Tablets"?<hr/>:<></>}</li>
        <li onClick={() => {setMenu("Laptops")}}><Link to='/laptops' style={{textDecoration: 'none', color: 'white'}}>Laptops</Link>{menu==="Laptops"?<hr/>:<></>}</li>
        <li onClick={() => {setMenu("Cloths")}}><Link to='/cloths' style={{textDecoration: 'none', color: 'white'}}>Cloths</Link>{menu==="Cloths"?<hr/>:<></>}</li>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem('auth-token')
          ?<button onClick={() => {localStorage.removeItem('auth-token');window.location.replace('/')}}>Log Out</button>
          :<Link to='/login'><button>Login</button></Link>
        }
        <Link to='/cart'><img src={cart_icon} alt="" /></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  )
}

export default Navbar
