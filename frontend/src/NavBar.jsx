import React from 'react'
import logo from './ascenda.png';
const NavBar = ({}) => {
    // const user = JSON.parse(localStorage.getItem('User'));
  return (
    <div class="navbar bg-base-100 mb-10">
        <div class="flex-1 ml-48">
            <img src={logo} alt='ascenda' class='w-28'/>
        </div>
        <div class="flex-none mr-72">
            <ul class="menu menu-horizontal px-1">
            <li><a>Kang Chin Shen</a></li>
            <li><a>Logout</a></li>
            </ul>
        </div>
    </div>
  )
}

export default NavBar