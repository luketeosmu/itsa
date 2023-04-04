import React, { useEffect, useState } from 'react'
import man from '../man.jpg';
import Nav from './Nav';
import sha256 from 'crypto-js/sha256'; 
import Base64 from 'crypto-js/enc-base64';

const Login = () => {
  const [codeChallenge, setCodeChallenge] = useState('');
  const client_id = 'cMZ8riSFzCrLUwDCkd3awhx5pFLURjW5th2aWfm13ws';
  // const secret = 'PLT2bDFO0zU-8j1pADf-VqzZNMJqaQKyy0K-O5XMGPk';
  const scope = 'openid+profile';
  const redirect_uri = 'itsag1t4.com';
  useEffect(() => {
    console.log(process.env.REACT_APP_client_id);
    const newCodeVerifier = generateCodeVerifier()
    const newCodeChallenge = generateCodeChallenge(newCodeVerifier)
    console.log("code verifier: " + newCodeVerifier);
    // maybe can encrypt with client secret before storing in local storage
    localStorage.setItem('code_verifier', newCodeVerifier);
    localStorage.setItem('code_challenge', newCodeChallenge);
    setCodeChallenge(newCodeChallenge);
  }, [])
  
  const generateCodeVerifier = () => {
    return generateRandomString(128)
    // document.getElementById("code_verifier").value = code_verifier
  }
  const generateRandomString = (length) => {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
  const generateCodeChallenge = (code_verifier) => {
    return base64URL(sha256(code_verifier))
  }
  const base64URL = (string) => {
    return string.toString(Base64).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
  }

  const callKang = () => {
    let url = "https://3qhkw6bpzk.execute-api.ap-southeast-1.amazonaws.com/default/refresh_access_token_1";
    console.log("calling POST");
    fetch(url, {
      method: 'POST',
      // headers: "Access-Control-Allow-Origin",
      body: JSON.stringify(
        {"refresh-token" : "eyJhbGciOiJSUzI1NiJ9.eyJlbWFpbCI6Im5pY29sYXMua2lobkBkaWV0cmljaC5uZXQiLCJpYXQiOjE2ODA1MTMzMDcsImV4cCI6MTY4MzEwNTMwNywiaXNzIjoiQmFuayBBcHAiLCJhdWQiOiJodHRwOi8vcHJvamVjdC0yMDIyLTIzdDItZzEtdDQtczMuczMtd2Vic2l0ZS11cy1lYXN0LTEuYW1hem9uYXdzLmNvbSJ9.u5T3llyQ66OeQMVRGnfTWlSH3NVcO35VriRatichgDWUWohUQcCl9_UMB6ah19CF7aTxaQXCTe-ZlfNOxy9Xf935U3XckWDQeQ7bC1OxCVIT5F4v3J4mXrwiBiC71twDFB-BXbRUDB5Wo--6Hvx9ZrxBEp_gZ5oiBkFn7pAbTg7JHOX7UD1A3UvcnUs7DZJKVX76ILNu2ZTNoTmfKa7MtWdkfJiRs1I6otVCwAelGdvzhwTzrMBOAthra5qAYMhNdH5eHRydqEpn1k1to5Cj-eQnHfGKsWjWPYuoYei8tQPEoM6OaG3DthZ_KYZeQVawtFOBa4q3hy8H1EEdArQq7A","access-token":"eyJhbGciOiJSUzI1NiJ9.eyJ1c2VyIjp7ImVtYWlsIjoibmljb2xhcy5raWhuQGRpZXRyaWNoLm5ldCJ9LCJpYXQiOjE2ODA1MTMzMDcsImV4cCI6MTY4MDUyMDUwNywiaXNzIjoiQmFuayBBcHAiLCJhdWQiOiJodHRwOi8vcHJvamVjdC0yMDIyLTIzdDItZzEtdDQtczMuczMtd2Vic2l0ZS11cy1lYXN0LTEuYW1hem9uYXdzLmNvbSJ9.lvEtZenNwL1aDQS-E4CijKPm3uFNA_BVXMrZT9QWyRMdvEGwMmzvTwva0zOMhGz74Bgk_m6HLrZhh8AS64kbnk15BMvMKtSd62LKIcaqe-CymM2pg2jFVq2GExjdfo6ksEVJrNGqR8BwNIJUWHFVi1Zor6I3pPsr4YihFW3Ik6rgBoO05zlOHkvysycM8DszJJUabcEG5XBsF1PjWfewK0psB1g0wXj3voBmOk1uQTXAQFMbvL6bBOZTWo_UDpwY9DKcoJpPhAQP5WefsrWLvR1a0X21YTAXQaPt50eKgIGzq1N7_-HSf6nMlZ6I8zfBS7fsufj52I2sCII7EP5P8Q","id-token":"eyJhbGciOiJSUzI1NiJ9.eyJyb2xlIjoic3VwZXJhZG1pbiIsImVtYWlsIjoibmljb2xhcy5raWhuQGRpZXRyaWNoLm5ldCIsImlhdCI6MTY4MDUxMzMwNywiZXhwIjoxNjgwNTIwNTA3LCJpc3MiOiJCYW5rIEFwcCIsImF1ZCI6Imh0dHA6Ly9wcm9qZWN0LTIwMjItMjN0Mi1nMS10NC1zMy5zMy13ZWJzaXRlLXVzLWVhc3QtMS5hbWF6b25hd3MuY29tIn0.rpuQYcPBRr8M79idjIRFP2fWLKUNUV9Np_s0lyRztf4ajTKD0_ztAZzeVx68btjDZSwQDWxSQk_dLrr029gbk95YkE7Ln7CA12QK75Pp_VAJsxrWyqGHj1zMv8zZS4WSFZjr76DYI-ow6zhJpVhJoCnV4IH06cq2yadq3imV8m1MurK8AQ6zGn4HcxoFFz2sV2qcms5wrWximTg8sMtzJxNzQnli4rEbmbZCbTQrZ0N5_kHfCJmE_7JceJ-pQgTwJWQ6C_eNf6l__jO2Ud-y-SqqZFiCOeYWCewE25zNIE246HDz-8yvskq6vzG8LzAsW5CGUPt2tEhTlJ8hyTU1-w"
      })
    })
    .then((response) => response.json())
    .then("helloo");
  }

  return (
    <div className="min-h-screen">
      <Nav />
      <div className='container mx-auto'>
        <div className='flex'>
          <div className='w-3/5 h-screen flex items-center justify-center relative'>
              <div className='text-2xl absolute z-10'>
                {/* <button onClick={callKang} className="btn btn-xs">Chin Shen Kang</button> */}
                <span className='text-5xl font-bold'>Login to</span>
                <br />
                <span className='font-medium'>manage your resources today.</span>
                <br />
                <br />
                <br />
                <span className='text-xl'>Don't have an account?</span>
                <br />
                <a className='text-indigo-600 text-xl font-medium' href='/register'>Register here!</a>
              </div>
              <div className='absolute left-1/2 bottom-24 z-0'>
                <img src={man} alt="man" className='w-64'/>
              </div>
          </div>
          <div className='w-2/5 h-screen flex items-center'>
            <div className="mr-20">
              {/* <span className='text-2xl font-medium'>Login</span> */}
              {/* <br />
              <input type="text" placeholder="Enter email" className="input input-bordered w-full max-w-xs my-5 bg-indigo-100 text-indigo-600 placeholder-indigo-400 text-sm" />
              <input type="password" placeholder="Password" className="input input-bordered w-full max-w-xs my-2 bg-indigo-100 text-indigo-600 placeholder-indigo-400 text-sm" />
              <br />
              <button className='text-xs ml-56'>Forgot password?</button>
              <br /> */}
              <form action="https://3qhkw6bpzk.execute-api.ap-southeast-1.amazonaws.com/default/hosted_login/oauth/authorize" method='post'>
                {/* TODO: add to environment variable */}
                <input type="hidden" value={client_id} name='client_id'/>
                <input type="hidden" value={redirect_uri} name='redirect_uri'/>
                <input type="hidden" value="code" name='response_type'/>
                <input type="hidden" value={scope} name='scope'/>
                <input type="hidden" value="S256" name='code_challenge_method'/>
                <input type="hidden" value={codeChallenge} name='code_challenge'/>
                <input className="btn w-80 bg-indigo-600 mt-6" type='submit' value='Hosted Login'/>
              </form>
              <br />
              <div className="divider before:bg-black after:bg-black text-black mx-auto">OR</div>
              <a className="btn w-full bg-black-600 mt-6" href='https://3qhkw6bpzk.execute-api.ap-southeast-1.amazonaws.com/default/bank/oauth/authorize'>Bank SSO Login </a>
              {/* <a className='text-sm my-2 ml-20' href='http://localhost:4000/get-auth-code'>or continue with Bank SSO</a> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login