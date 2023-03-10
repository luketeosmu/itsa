const { spawn } = require('child_process');

const express = require('express')

const config = require('config')
const auth_code_request_credentials = config.get('auth_code_request_credentials')

const querystring = require('querystring')

const app = express()

const port = 3000

// http://localhost:3000
app.get('/', (req, res) => {

  const url = 'https://smurnauth-production.fly.dev/users/sign_in';
  spawn('open', [url]);

  res.send('bank sso login ...')

})

// http://localhost:3000/get-auth-code
app.get('/get-auth-code', (req, res) => {

  const client_id = auth_code_request_credentials.get('client_id'); 

  const bank_end_point = auth_code_request_credentials.get('bank_end_point');

  const redirect_uri = `http://localhost:${port}`; 

  const params = {
    client_id: client_id, 
    redirect_uri: redirect_uri,
    response_type: "code",
    scope: "openid profile"
  };

  const stringified_params = querystring.stringify(params)

  res.redirect(`${bank_end_point}/oauth/authorize?` + stringified_params)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})