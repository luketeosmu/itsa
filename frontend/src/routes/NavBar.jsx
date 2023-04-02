import React from 'react'
import logo from '../ascenda.png';
const NavBar = () => {
    // const user = JSON.parse(localStorage.getItem('User'));
  return (
    <div className="navbar bg-base-100 mb-10">
        <div className="flex-1 ml-48">
            <img src={logo} alt='ascenda' className='w-28'/>
        </div>
        <div className="flex-none mr-56">
            <ul className="menu menu-horizontal px-1">
            <li><a href='/editprofile' className='btn btn-ghost'>{localStorage.getItem("username")}</a></li>
            <li><a href='/mybank' className='btn btn-ghost'>My Bank</a></li>
            <li><a href='/login' className='btn btn-ghost'>Logout</a></li>
            </ul>
        </div>
    </div>
  )
}

export default NavBar