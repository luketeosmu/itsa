import React from 'react'
import logo from '../ascenda.png';
const NavBar = ({}) => {
    // const user = JSON.parse(localStorage.getItem('User'));
  return (
    <div class="navbar bg-base-100 mb-10">
        <div class="flex-1 ml-48">
            <img src={logo} alt='ascenda' class='w-28'/>
        </div>
        <div class="flex-none mr-56">
            <ul class="menu menu-horizontal px-1">
            <li><a href='/editprofile' class='btn btn-ghost'>Kang Chin Shen</a></li>
            <li><a href='/mybank' class='btn btn-ghost'>My Bank</a></li>
            <li><a href='/login' class='btn btn-ghost'>Logout</a></li>
            </ul>
        </div>
    </div>
  )
}

export default NavBar