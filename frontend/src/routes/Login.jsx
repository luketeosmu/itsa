import React from 'react'
import man from '../man.jpg';
import Nav from './Nav';
import { useState} from 'react';
import sha256 from 'crypto-js/sha256'; 
import Base64 from 'crypto-js/enc-base64';
import axios from 'axios';
const Login = () => {
  const [codeChallenge, setCodeChallenge] = useState('');
  const [codeVerifier, setCodeVerifier] = useState('');
  const [user, setUser] = useState('');
  const generateCodeVerifier = () => {
    return generateRandomString(128)
    // document.getElementById("code_verifier").value = code_verifier
  }
  const generateRandomString = (length) => {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
  const generateCodeChallenge = (code_verifier) => {
    return base64URL(sha256(code_verifier))
  }
  const base64URL = (string) => {
    return string.toString(Base64).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
  }
  const handleLogin = () => {
    console.log("handling hosted login");
    setCodeVerifier(generateCodeVerifier());
    setCodeChallenge(generateCodeChallenge(codeVerifier));
    localStorage.set('codeVerifier', codeVerifier);
    localStorage.set('codeChallenge', codeChallenge);
    console.log("code verifier: " + codeVerifier);
    console.log("code challenge: " + codeChallenge);
  }

  return (
    <div className="min-h-screen">
      <Nav />
      <div className='container mx-auto'>
        <div className='flex'>
          <div className='w-3/5 h-screen flex items-center justify-center relative'>
              <div className='text-2xl'>
                <span className='text-5xl font-bold'>Login to</span>
                <br />
                <span className='font-medium'>manage your resources today.</span>
                <br />
                <br />
                <br />
                <span className='text-xl'>Don't have an account?</span>
                <br />
                <a className='text-indigo-600 text-xl font-medium' href='/register'>Register here!</a>
              </div>
              <div className='absolute left-1/2 bottom-28'>
                <img src={man} alt="man" className='w-64'/>
              </div>
          </div>
          <div className='w-2/5 h-screen flex items-center'>
            <div className="mr-20">
              <span className='text-2xl font-medium'>Login</span>
              <br />
              <input type="text" onChange={(e) => setUser(e.target.value)} placeholder="Enter email" className="input input-bordered w-full max-w-xs my-5 bg-indigo-100 text-indigo-600 placeholder-indigo-400 text-sm" />
              <input type="password" placeholder="Password" class="input input-bordered w-full max-w-xs my-2 bg-indigo-100 text-indigo-600 placeholder-indigo-400 text-sm" />
              <br />
              <a className='text-xs ml-56' href='#'>Forgot password?</a>
              <br />
              <form action="https://3qhkw6bpzk.execute-api.ap-southeast-1.amazonaws.com/default/auth_code_challenge_login_prompt" method='post'>
                <input type="hidden" value={codeChallenge} name='code_challenge'/>
                <input className="btn w-full max-w-xs bg-indigo-600 mt-6" type='submit' value='Login' onClick={handleLogin}/>
              </form>
              <br />
              <a className='text-sm my-2 ml-20' href='http://localhost:4000/get-auth-code'>or continue with Bank SSO</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login