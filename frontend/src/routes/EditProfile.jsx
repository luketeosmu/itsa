import React from 'react'
import NavBar from './NavBar';
const EditProfile = () => {
  return (
      <div>
        <NavBar />
        <div class='flex relative w-1/2 mx-auto'>
            {/* <div class=''>
                <h1 class='text-3xl mt-36 ml-64 font-bold'>
                    Edit Profile
                </h1>
            </div> */}
            <div class='container'>
                <div class='flex-auto grid grid-cols-2'>
                    <div class='col-span-2'>
                        <h1 class='text-4xl mb-10 font-bold'>
                            Edit Profile
                        </h1>
                    </div>
                    <div>
                        <h1 class='text-2xl font-medium'>First Name</h1>
                        <input type="text" placeholder="First Name" class="input input-bordered w-full max-w-md my-2 bg-indigo-100 text-indigo-600 placeholder-indigo-400 text-sm" />
                    </div>
                    <div class='ml-10'>
                        <h1 class='text-2xl font-medium'>Last Name</h1>
                        <input type="text" placeholder="Last Name" class="input input-bordered w-full max-w-md my-2 bg-indigo-100 text-indigo-600 placeholder-indigo-400 text-sm" />
                    </div>
                    <div class='col-span-2'>
                        <h1 class='text-2xl font-medium'>Email</h1>
                        <input type="text" placeholder="Email" class="input input-bordered w-full my-2 bg-indigo-100 text-indigo-600 placeholder-indigo-400 text-sm" />
                    </div>
                    <div class='col-span-2'>
                        <h1 class='text-2xl font-medium'>Birthdate</h1>
                        <input type="text" placeholder="Birthdate" class="input input-bordered w-full my-2 bg-indigo-100 text-indigo-600 placeholder-indigo-400 text-sm" />
                    </div>
                    <div class='col-span-2 text-center mt-5'>
                        {/* <button class="btn w-40 bg-indigo-600 mt-6 ml-5 mr-8" >Delete Account</button> */}
                        <a href="#my-modal-2" class="btn w-40 bg-indigo-600 mt-6 ml-5 mr-8">Delete Account</a>
                            <div class="modal" id="my-modal-2">
                                <div class="modal-box text-center">
                                    <h3 class="font-bold text-xl">Are you sure you want to delete account?</h3>
                                    <p class='mt-2'>Enter password to delete account</p>
                                    <input type="password" placeholder="Password" class="mt-2 input input-bordered input-primary w-full max-w-xs" />
                                    <div class="modal-action flex justify-center items-center space-x-10">
                                        <a href="/login" class="btn bg-indigo-400">Yes</a>
                                        <a href="#" class="btn bg-indigo-600">No</a>
                                    </div>
                                </div>
                            </div>
                        <button class="btn w-40 bg-indigo-600 mt-6 ml-0 mr-0 xs:ml-8 xs:mr-8" >Change Password</button>
                        <a href="#my-modal-3" class="btn w-40 bg-indigo-600 mt-6 ml-8 mr-5">Save Changes</a>
                            <div class="modal" id="my-modal-3">
                                <div class="modal-box text-center">
                                <h3 class="font-bold text-2xl">Changes saved successfully!</h3>
                                <div class="modal-action flex justify-center items-center space-x-10">
                                    <a href="#" class="btn bg-indigo-600">Close</a>
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