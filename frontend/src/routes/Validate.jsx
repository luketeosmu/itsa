import React, { useState } from 'react';


const Validate = () => {
  const [otp, setOtp] = useState('')


  //handleRegister
  const handleRegisterPart2NicoleFault = async () => {
    try {
      console.log("HELLO")
      const email = localStorage.getItem("email");
      const response = await fetch('https://ppzp0z6kh1.execute-api.ap-southeast-1.amazonaws.com/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
        })
      }).then(response => {
        console.log(response);
        response.json()
      }).then(data => console.log(data))
        .catch(err => console.log(err));
      //console.log("EMAIL HERE");
      //console.log(e)
      const data = await response.json();
      console.log(data);
      // handle success or error
    } catch (error) {
      console.error(error);
      // handle error
    }
  };

  const handleSubmitOTP = async () => {
    try {
      console.log("HELLO")
      const email = localStorage.getItem("email");    //This returns the email as an email variable!
      const response = await fetch('https://mbpzjhq32b.execute-api.ap-southeast-1.amazonaws.com/val_OTP/otp_validator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          otp: otp
        })   //PUT THE OTP HERE 
      })
      .then(response => {
        console.log(response)
        return response.json();
        console.log("BEfore u enter data")
      }).then(data => {
        // console.log("Trying Data")
        // console.log(data)
        console.log("Entered Data Read")

        console.log("Printing status")
  
        //added if responses here
        if (data.status === 200) {
          console.log("GOOD WORK");
          window.location.href = "#my-modal-2";
        }
        else {
          console.log("BAD NEVER WORK");
          window.location.href = "#my-modal-1";
        }
      }) .catch(err => console.log(err));


      console.log("These nutes");
      console.log(otp);
      // const data = await response.json();
      // console.log(data);
    } catch (error) {
      console.error(error);
      // handle error
    }
  }
  return (
    <div>
      <div className="h-screen flex items-center justify-center ">
        <div>
          <div>
            <span className='text-2xl font-medium'>Validate Account</span>
          </div>
          <div>
            <input onChange={e => setOtp(e.target.value)} value={otp} type="text" placeholder="Enter OTP" className="input input-bordered w-64 my-5 bg-indigo-100 text-indigo-600 placeholder-indigo-400 text-sm" />
          </div>
          <div className='text-center'>
            <button onClick={handleSubmitOTP} className="btn w-64 bg-indigo-600">Validate</button>
            {/* <a href="my-modal-2" className="btn w-64 bg-indigo-600">Validate</a> */}
            <div className="modal" id="my-modal-2">
              <div className="modal-box text-center">
                <h3 className="font-bold text-2xl">OTP Validation Successful!</h3>
                <p className="py-4 font-medium">You will be redirected to the login page.</p>
                <div className="modal-action flex justify-center items-center space-x-10">
                  <a href="/login" className="btn w-48 bg-indigo-600">Close</a>
                </div>
              </div>
            </div>
            <div className="modal" id="my-modal-1">
              <div className="modal-box text-center">
                <h3 className="font-bold text-2xl">OTP Validation Unsuccessful!</h3>
                <p className="py-4 font-medium">Please try again.</p>
                <div className="modal-action flex justify-center items-center space-x-10">
                  <a href="/validate" className="btn w-48 bg-indigo-600">Close</a>
                </div>
              </div>
            </div>
            <br />
            <button onClick={handleRegisterPart2NicoleFault} className='text-sm my-2 font-medium'>Resend OTP</button>
              <a href="/validate" ></a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Validate