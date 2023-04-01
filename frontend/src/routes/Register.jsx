import React from 'react'
import man from '../man.jpg';
import Nav from './Nav';
import { useState } from 'react';
const Register = () => {
    const setFocus = (e) => {
        console.log(e.target.type)
        e.target.type = 'date';
    }
    const setBlur = (e) => {
        e.target.type = 'text';
    }
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [errors, setErrors] = useState([]);
    const checkInputs = () => {

    }
    // const handleRegister = () => {
    //   console.log("handling register");
    //   navigate('/login');
    // }
  return (
    <div className="min-h-screen">
      <Nav />
      <div className='container mx-auto'>
        <div className='flex'>
            {/* <div className='absolute top-10 left-48'>
              <img src={logo} alt='ascenda' className='w-28'/>
            </div> */}
          <div className='w-3/5 h-screen flex items-center justify-center relative'>
              <div className='text-2xl'>
                <span className='text-5xl font-bold'>Create an account to</span>
                <br />
                <span className='font-medium'>manage your resources today.</span>
                <br />
                <br />
                <br />
                <span className='text-xl'>Already have an account?</span>
                <br />
                <a className='text-indigo-600 text-xl font-medium' href='/login'>Login here!</a>
              </div>
              <div className='absolute bottom-20 left-1/2'>
                <img src={man} alt="man" className='w-96'/>
              </div>
          </div>
          <div className='w-2/5 h-screen flex items-center'>
            {/* <div className='absolute top-10 flex'>
                <a className='ml-48' href='#'>
                  Login
                </a>
                <a className='ml-5 text-black' href='#'>
                  Sign up
                </a>
            </div> */}
            <div className="mr-20 grid grid-rows-5 flex-auto">
                <div>
                    <span className='text-2xl font-medium'>Register New Account</span>
                </div>
                <div>
                    <input type="text" placeholder="Enter email" className="input input-bordered w-full max-w-xs my-2 bg-indigo-100 text-indigo-600 placeholder-indigo-400 text-sm" />
                </div>
                <div>
                    <input type="text" placeholder="First Name" className="input input-bordered w-full max-w-xs my-2 bg-indigo-100 text-indigo-600 placeholder-indigo-400 text-sm" />
                </div>
                <div>
                    <input type="text" placeholder="Last Name" className="input input-bordered w-full max-w-xs my-2 bg-indigo-100 text-indigo-600 placeholder-indigo-400 text-sm" />
                </div>
                <div>
                    <input type="text" placeholder="Birthdate" onFocus={(e) => setFocus(e)} onBlur={(e) => setBlur(e)} className="input input-bordered w-full max-w-xs my-2 bg-indigo-100 text-indigo-600 placeholder-indigo-400 text-sm" />
                </div>
                <div>
                    <input type="password" placeholder="Password" className="input input-bordered w-full max-w-xs my-2 bg-indigo-100 text-indigo-600 placeholder-indigo-400 text-sm" />
                </div>
                <div>
                    <input type="password" placeholder="Re-enter Password" className="input input-bordered w-full max-w-xs my-2 bg-indigo-100 text-indigo-600 placeholder-indigo-400 text-sm" />
                </div>
                <div>
                    <a href="#my-modal-2" className="btn w-full max-w-xs bg-indigo-600 mt-6" onClick={checkInputs}>Register</a>
                      <div className="modal" id="my-modal-2">
                        <div className="modal-box text-center">
                          <h3 className="font-bold text-2xl">Registration Successful!</h3>
                          <p className="py-4">An OTP has been sent to your email account.</p>
                          <p>Please enter the OTP within 1 min(s) to validate your account</p>
                          <div class="modal-action flex justify-center items-center space-x-10">
                            <a href="#" class="btn bg-indigo-400">Dismiss</a>
                            <a type="submit" href="/validate" className="btn bg-indigo-600">Enter OTP</a>
                          </div>
                        </div>
                      </div>
                    <br />
                    {/* <button className='text-sm my-2 ml-20'>or continue with Bank SSO</button> */}
                </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Register