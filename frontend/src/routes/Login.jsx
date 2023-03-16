import React from 'react'
import man from '../man.jpg';
import Nav from './Nav';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const handleLogin = () => {
    console.log("hihi");
    // localStorage.setItem('User', JSON.stringify(user));
    // console.log(JSON.parse(localStorage.getItem('User')));
    navigate('/mybank');
  }
  return (
    <div class="min-h-screen">
      <Nav />
      <div classname='container mx-auto'>
        <div class='flex'>
          <div class='w-3/5 h-screen flex items-center justify-center relative'>
              <div class='text-2xl'>
                <span class='text-5xl font-bold'>Login to</span>
                <br />
                <span className='font-medium'>manage your resources today.</span>
                <br />
                <br />
                <br />
                <span className='text-xl'>Don't have an account?</span>
                <br />
                <a class='text-indigo-600 text-xl font-medium' href='/register'>Register here!</a>
              </div>
              <div class='absolute left-1/2 bottom-28'>
                <img src={man} alt="man" className='w-64'/>
              </div>
          </div>
          <div class='w-2/5 h-screen flex items-center'>
            <div class="mr-20">
              <span class='text-2xl font-medium'>Login</span>
              <br />
              <input type="text" onChange={(e) => setUser(e.target.value)} placeholder="Enter email" class="input input-bordered w-full max-w-xs my-5 bg-indigo-100 text-indigo-600 placeholder-indigo-400 text-sm" />
              <input type="password" placeholder="Password" class="input input-bordered w-full max-w-xs my-2 bg-indigo-100 text-indigo-600 placeholder-indigo-400 text-sm" />
              <br />
              <a className='text-xs ml-56' href='#'>Forgot password?</a>
              <br />
              <button class="btn w-full max-w-xs bg-indigo-600 mt-6" onClick={() => handleLogin()}>Login</button>
              <br />
              <a class='text-sm my-2 ml-20' href='http://localhost:4000/get-auth-code'>or continue with Bank SSO</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login