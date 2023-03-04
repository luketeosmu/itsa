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
                        <button class="btn w-40 bg-indigo-600 mt-6 ml-5 mr-8" >Delete Account</button>
                        <button class="btn w-40 bg-indigo-600 mt-6 ml-0 mr-0 xs:ml-8 xs:mr-8" >Change Password</button>
                        <button class="btn w-40 bg-indigo-600 mt-6 ml-8 mr-5" >Save Changes</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EditProfile