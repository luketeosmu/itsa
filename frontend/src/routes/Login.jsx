import React from 'react'
import man from '../man.jpg';
import Nav from './Nav';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import sha256 from 'crypto-js/sha256'; 
import Base64 from 'crypto-js/enc-base64';
const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const generateCodeVerifier = () => {
    return generateRandomString(128)
    // document.getElementById("code_verifier").value = code_verifier
  }
  const generateRandomString = (length) => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
    for (var i = 0; i < length; i++) {
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
  // const handleLogin = () => {
  //   console.log("hihi");
  //   let code_verifier = generateCodeVerifier();
  //   let code_challenge = generateCodeChallenge(code_verifier);
  //   console.log("code verifier: " + code_verifier);
  //   console.log("code challenge: " + code_challenge);
  //   fetch('https:localhost:4000/...', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json; charset=UTF-8',
  //     },
  //     body: JSON.stringify({
  //       'code_challenge' : code_challenge,
  //       'code_verifier' : code_verifier,
  //       'code_challenge_method' : 'S256'
  //     }),
  //   }).then((response) => {
  //     console.log(response.data);
  //     //response shld be redirect URL link(?) which will be sth like "localhost:3000/authToken?code=..."
  //     // let link = response.data.link;
  //     let link = "http://localhost:3000/authToken?code=abcdefg";
  //     window.location.href=link;
  //   }
  //   ).catch((err) => {
  //     console.log(err.message);
  //   });
  //   // navigate('/mybank');
  // }

  const handleLogin = async () => {
    let code_verifier = generateCodeVerifier();
    let code_challenge = generateCodeChallenge(code_verifier);
    console.log("code verifier: " + code_verifier);
    console.log("code challenge: " + code_challenge);
    try {
      const res = await fetch('https://rg34z2txqcug2obu3463rgquhy0weoha.lambda-url.ap-southeast-1.on.aws/', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'code_challenge' : code_challenge,
            'code_verifier' : code_verifier,
            'code_challenge_method' : 'S256'
          })
      });
      const data = await res.json();
      console.log(data);
      //response shld be redirect URL link(?) which will be sth like "localhost:3000/authToken?code=..."
      // let link = response.data.link;
      let link = "http://localhost:3000/authToken?code=abcdefg";
      window.location.href=link;
    } catch (error) {
      console.log(error);
    }
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