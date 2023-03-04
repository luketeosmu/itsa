import React from 'react'
import man from './man.jpg';
import Nav from './Nav';
import { useState, useEffect } from 'react';
const Login = ({handleLogin, user, setUser}) => {
  // const [user, setUser] = useState('');
  // const handleLogin = () => {
  //   // console.log(user);
  //   localStorage.setItem('User', JSON.stringify(user));
  //   console.log(JSON.parse(localStorage.getItem('User')));
  // }
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
                <a class='text-indigo-600 text-xl font-medium' href='#'>Register here!</a>
              </div>
              <div class='absolute bottom-20 left-1/2'>
                <img src={man} alt="man" className='w-96'/>
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
              <a class='text-sm my-2 ml-20' href='#'>or continue with Bank SSO</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login