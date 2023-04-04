import React from 'react'
import unauthorized from '../unauthorized.jpg';
const InvalidLogin = () => {
    return (
        <div className="min-h-screen">
            <div className="flex">
                <img src={unauthorized} alt="man" className='h-48 mx-auto mt-20'/>
            </div>
            <div>
                <h1 className="text-6xl font-bold text-center">OOPS!</h1>
            </div>
            <div className="flex text-center">
                <div className="w-auto px-16 h-36 rounded-xl justify-center text-center items-center mx-auto mt-10 font-medium">
                    <h1 className="text-xl">Invalid Username or Password.</h1>
                    {/* <p>Click <a href="/login" className="underline">here</a> to return to Login Page to sign in again</p> */}
                    <p>Please attempt to sign in again.</p>
                    <a className="btn btn-sm mt-2" href="/login">Sign In</a>
                </div>
            </div>
        </div>
    )
}

export default InvalidLogin
