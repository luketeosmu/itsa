import React from 'react'
import NavBar from './NavBar';
const EditProfile = () => {
  return (
      <div>
        <NavBar />
        <div className='flex relative w-1/2 mx-auto'>
            {/* <div className=''>
                <h1 className='text-3xl mt-36 ml-64 font-bold'>
                    Edit Profile
                </h1>
            </div> */}
            <div className='container'>
                <div className='flex-auto grid grid-cols-2'>
                    <div className='col-span-2'>
                        <h1 className='text-4xl mb-10 font-bold'>
                            Edit Profile
                        </h1>
                    </div>
                    <div>
                        <h1 className='text-2xl font-medium'>First Name</h1>
                        <input type="text" placeholder="First Name" className="input input-bordered w-full max-w-md my-2 bg-indigo-100 text-indigo-600 placeholder-indigo-400 text-sm" />
                    </div>
                    <div className='ml-10'>
                        <h1 className='text-2xl font-medium'>Last Name</h1>
                        <input type="text" placeholder="Last Name" className="input input-bordered w-full max-w-md my-2 bg-indigo-100 text-indigo-600 placeholder-indigo-400 text-sm" />
                    </div>
                    <div className='col-span-2'>
                        <h1 className='text-2xl font-medium'>Email</h1>
                        <input type="text" placeholder="Email" className="input input-bordered w-full my-2 bg-indigo-100 text-indigo-600 placeholder-indigo-400 text-sm" />
                    </div>
                    <div className='col-span-2'>
                        <h1 className='text-2xl font-medium'>Birthdate</h1>
                        <input type="text" placeholder="Birthdate" className="input input-bordered w-full my-2 bg-indigo-100 text-indigo-600 placeholder-indigo-400 text-sm" />
                    </div>
                    <div className='col-span-2 text-center mt-5'>
                        {/* <button className="btn w-40 bg-indigo-600 mt-6 ml-5 mr-8" >Delete Account</button> */}
                        <a href="#my-modal-2" className="btn w-40 bg-indigo-600 mt-6 ml-5 mr-8">Delete Account</a>
                            <div className="modal" id="my-modal-2">
                                <div className="modal-box text-center">
                                    <h3 className="font-bold text-xl">Are you sure you want to delete account?</h3>
                                    <p className='mt-2'>Enter password to delete account</p>
                                    <input type="password" placeholder="Password" className="mt-2 input input-bordered input-primary w-full max-w-xs" />
                                    <div className="modal-action flex justify-center items-center space-x-10">
                                        <a href="/login" className="btn bg-indigo-400">Yes</a>
                                        <button className="btn bg-indigo-600">No</button>
                                    </div>
                                </div>
                            </div>
                        <button className="btn w-40 bg-indigo-600 mt-6 ml-0 mr-0 xs:ml-8 xs:mr-8" >Change Password</button>
                        <a href="#my-modal-3" className="btn w-40 bg-indigo-600 mt-6 ml-8 mr-5">Save Changes</a>
                            <div className="modal" id="my-modal-3">
                                <div className="modal-box text-center">
                                <h3 className="font-bold text-2xl">Changes saved successfully!</h3>
                                <div className="modal-action flex justify-center items-center space-x-10">
                                    <button className="btn bg-indigo-600">Close</button>
                                </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EditProfile