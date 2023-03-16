const querystring = require('querystring')

exports.handler = async (event) => {
    const client_id = "cMZ8riSFzCrLUwDCkd3awhx5pFLURjW5th2aWfm13ws"
    const redirect_uri = "http://localhost:3000"
    const bank_end_point = "https://smurnauth-production.fly.dev"

    const params = {
        client_id: client_id, 
        redirect_uri: redirect_uri,
        response_type: "code",
        scope: "openid profile"
    };

    const stringified_params = querystring.stringify(params)


    const response = {
        statusCode: 301,
        headers: {
            Location: `${bank_end_point}/oauth/authorize?` + stringified_params
        }
    };
    
    return response;
};