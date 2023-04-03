import React from 'react'
import NavBar from './NavBar';
import { useState, useEffect } from 'react';
const EditProfile = () => {
    // const [currentUser, setCurrentUser] = useState(localStorage.getItem("currentUser"));
    const [email, setEmail] = useState(localStorage.getItem("currentUser_email"));
    const [given_name, setGivenName] = useState(localStorage.getItem("currentUser_given_name"));
    const [family_name, setFamilyName] = useState(localStorage.getItem("currentUser_family_name"));
    useEffect = (() => {
        console.log(given_name);
        console.log(family_name);
    }, []);

    const editUser = () => {
        // console.log(id);
        localStorage.setItem("currentUser_email", email);
        localStorage.setItem("currentUser_given_name", given_name);
        localStorage.setItem("currentUser_last_name", last_name);
    
        console.log(email);
        console.log(given_name);
        console.log(family_name);
        const url = "https://3qhkw6bpzk.execute-api.ap-southeast-1.amazonaws.com/default/hosted_login/oauth/updateuser";
        fetch(url, {
            method: "PUT",
            headers: {authorizationToken:localStorage.getItem("access_token")},
            body: JSON.stringify({
                "id": localStorage.getItem("currentUser_id"),
                "email": email,
                "first_name": given_name, 
                "last_name" : family_name
            })
        })
    }
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
                        <h1 className='text-2xl font-medium'>Given Name</h1>
                        <input type="text" value={given_name} onChange={(e)=>{setGivenName(e.target.value)}} className="input input-bordered w-full max-w-md my-2 bg-indigo-100 text-indigo-600 placeholder-indigo-400 text-sm" />
                    </div>
                    <div className='ml-10'>
                        <h1 className='text-2xl font-medium'>Family Name</h1>
                        <input type="text" value={family_name} onChange={(e)=> {setFamilyName(e.target.value)}} className="input input-bordered w-full max-w-md my-2 bg-indigo-100 text-indigo-600 placeholder-indigo-400 text-sm" />
                    </div>
                    <div className='col-span-2'>
                        <h1 className='text-2xl font-medium'>Email</h1>
                        <input type="text" value={email} onChange={(e)=> {setEmail(e.target.value)}} className="input input-bordered w-full my-2 bg-indigo-100 text-indigo-600 placeholder-indigo-400 text-sm" />
                    </div>
                    <div className='col-span-2 text-center mt-5'>
                        {/* <button className="btn w-40 bg-indigo-600 mt-6 ml-5 mr-8" >Delete Account</button> */}
                        <a href="#my-modal-2" className="btn w-40 bg-indigo-600 mt-6 ml-5 mr-8">Delete Account</a>
                            <div className="modal" id="my-modal-2">
                                <div className="modal-box text-center">
                                    <h3 className="font-bold text-xl">Are you sure you want to delete account?</h3>
                                    {/* <p className='mt-2'>Enter password to delete account</p>
                                    <input type="password" placeholder="Password" className="mt-2 input input-bordered input-primary w-full max-w-xs" /> */}
                                    <div className="modal-action flex justify-center items-center space-x-10">
                                        <a href="/login" className="btn bg-indigo-400">Yes</a>
                                        <button className="btn bg-indigo-600">No</button>
                                    </div>
                                </div>
                            </div>
                        {/* <button className="btn w-40 bg-indigo-600 mt-6 ml-0 mr-0 xs:ml-8 xs:mr-8">Change Password</button> */}
                        <a href="#my-modal-3" className="btn w-40 bg-indigo-600 mt-6 ml-8 mr-5" onClick={editUser}>Save Changes</a>
                            <div className="modal" id="my-modal-3">
                                <div className="modal-box text-center">
                                    <h3 className="font-bold text-2xl">Changes saved successfully!</h3>
                                    <div className="modal-action flex justify-center items-center space-x-10">
                                        <label for="my-modal-3" className="btn bg-indigo-600">Close</label>
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