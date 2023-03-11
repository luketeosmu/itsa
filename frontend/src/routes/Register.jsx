import React from 'react'
import logo from '../ascenda.png';
import man from '../man.jpg';
const Register = () => {
    const setFocus = (e) => {
        console.log(e.target.type)
        e.target.type = 'date';
    }
    const setBlur = (e) => {
        e.target.type = 'text';
    }
  return (
    <div class="min-h-screen">
      <div classname='container mx-auto'>
        <div class='flex'>
            <div class='absolute top-10 left-48'>
              <img src={logo} alt='ascenda' class='w-28'/>
            </div>
          <div class='w-3/5 h-screen flex items-center justify-center relative'>
              <div class='text-2xl'>
                <span class='text-5xl font-bold'>Create an account to</span>
                <br />
                <span className='font-medium'>manage your resources today.</span>
                <br />
                <br />
                <br />
                <span className='text-xl'>Already have an account?</span>
                <br />
                <a class='text-indigo-600 text-xl font-medium' href='/login'>Login here!</a>
              </div>
              <div class='absolute bottom-20 left-1/2'>
                <img src={man} alt="man" className='w-96'/>
              </div>
          </div>
          <div class='w-2/5 h-screen flex items-center'>
            <div class='absolute top-10 flex'>
                <a class='ml-48' href='#'>
                  Login
                </a>
                <a class='ml-5 text-black' href='#'>
                  Sign up
                </a>
            </div>
            <div class="mr-20 grid grid-rows-5 flex-auto">
                <div>
                    <span class='text-2xl font-medium'>Register New Account</span>
                </div>
                <div>
                    <input type="text" placeholder="Enter email" class="input input-bordered w-full max-w-xs my-2 bg-indigo-100 text-indigo-600 placeholder-indigo-400 text-sm" />
                </div>
                <div>
                    <input type="text" placeholder="First Name" class="input input-bordered w-full max-w-xs my-2 bg-indigo-100 text-indigo-600 placeholder-indigo-400 text-sm" />
                </div>
                <div>
                    <input type="text" placeholder="Last Name" class="input input-bordered w-full max-w-xs my-2 bg-indigo-100 text-indigo-600 placeholder-indigo-400 text-sm" />
                </div>
                <div>
                    <input type="text" placeholder="Birthdate" onFocus={(e) => setFocus(e)} onBlur={(e) => setBlur(e)} class="input input-bordered w-full max-w-xs my-2 bg-indigo-100 text-indigo-600 placeholder-indigo-400 text-sm" />
                </div>
                <div>
                    <input type="password" placeholder="Password" class="input input-bordered w-full max-w-xs my-2 bg-indigo-100 text-indigo-600 placeholder-indigo-400 text-sm" />
                </div>
                <div>
                    <input type="password" placeholder="Re-enter Password" class="input input-bordered w-full max-w-xs my-2 bg-indigo-100 text-indigo-600 placeholder-indigo-400 text-sm" />
                </div>
                <div>
                    <a href="#my-modal-2" class="btn w-full max-w-xs bg-indigo-600 mt-6">Register</a>
                      <div class="modal" id="my-modal-2">
                        <div class="modal-box text-center">
                          <h3 class="font-bold text-2xl">Registration Successful!</h3>
                          <p class="py-4">An OTP has been sent to your email account.</p>
                          <p>Please enter the OTP within 1 min(s) to validate your account</p>
                          <div class="modal-action flex justify-center items-center space-x-10">
                            <a href="#" class="btn bg-indigo-400">Dismiss</a>
                            <a href="#" class="btn bg-indigo-600">Enter OTP</a>
                          </div>
                        </div>
                      </div>
                    <br />
                    <a class='text-sm my-2 ml-20' href='#'>or continue with Bank SSO</a>
                </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Register