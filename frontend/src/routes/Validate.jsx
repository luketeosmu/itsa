import React from 'react'

const Validate = () => {
  return (
    <div>
        <div class="h-screen flex items-center justify-center ">
            <div>
                <div>
                    <span class='text-2xl font-medium'>Validate Account</span>
                </div>
                <div>
                    <input type="text" placeholder="Enter OTP" class="input input-bordered w-64 my-5 bg-indigo-100 text-indigo-600 placeholder-indigo-400 text-sm" />
                </div>
                <div class='text-center'>
                <a href="#my-modal-2" class="btn w-64 bg-indigo-600">Validate</a>
                <div class="modal" id="my-modal-2">
                        <div class="modal-box text-center">
                          <h3 class="font-bold text-2xl">OTP Validation Successful!</h3>
                          <p class="py-4 font-medium">You will be redirected to your profile page.</p>
                          <div class="modal-action flex justify-center items-center space-x-10">
                            <a href="#" class="btn w-48 bg-indigo-600">Close</a>
                          </div>
                        </div>
                      </div>
                    <br />
                    <a class='text-sm my-2 font-medium' href='#'>Resend OTP</a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Validate