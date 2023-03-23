import React from 'react'

const Validate = () => {
  return (
    <div>
        <div className="h-screen flex items-center justify-center ">
            <div>
                <div>
                    <span className='text-2xl font-medium'>Validate Account</span>
                </div>
                <div>
                    <input type="text" placeholder="Enter OTP" className="input input-bordered w-64 my-5 bg-indigo-100 text-indigo-600 placeholder-indigo-400 text-sm" />
                </div>
                <div className='text-center'>
                <a href="#my-modal-2" className="btn w-64 bg-indigo-600">Validate</a>
                <div className="modal" id="my-modal-2">
                        <div className="modal-box text-center">
                          <h3 className="font-bold text-2xl">OTP Validation Successful!</h3>
                          <p className="py-4 font-medium">You will be redirected to the login page.</p>
                          <div className="modal-action flex justify-center items-center space-x-10">
                            <a href="/login" className="btn w-48 bg-indigo-600">Close</a>
                          </div>
                        </div>
                      </div>
                    <br />
                    <button className='text-sm my-2 font-medium'>Resend OTP</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Validate