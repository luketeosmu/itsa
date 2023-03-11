import React from 'react'
import logo from '../ascenda.png';
const Nav = () => {
  return (
    <div class="navbar bg-base-100 absolute">
        <div class="flex-1 ml-48">
            <img src={logo} alt='ascenda' class='w-28'/>
        </div>
        <div class="flex-none mr-72">
            <ul class="menu menu-horizontal px-1">
            <li><a>Login</a></li>
            <li><a>Sign up</a></li>
            </ul>
        </div>
    </div>
  );
}

export default Nav