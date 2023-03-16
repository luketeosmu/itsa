const https = require('https');

/**
 * Pass the data to send as `event.data`, and the request options as
 * `event.options`. For more information see the HTTPS module documentation
 * at https://nodejs.org/api/https.html.
 *
 * Will succeed with the response body.
 */
exports.handler = async (event, context, callback) => {
    const authCode = event.queryStringParameters.code; // extract auth code from request body
    const client_id = process.env.client_id
    const client_secret = process.env.client_secret
    const bank_end_point = process.env.bank_end_point
    const redirect_uri = process.env.redirect_uri
    const client_uri = process.env.client_uri

    const formData = {
        grant_type: 'authorization_code',
        code: authCode,
        client_id: client_id, 
        client_secret: client_secret, 
        redirect_uri: redirect_uri
    };

    const options = {
        hostname: bank_end_point,
        port: 443,
        path: `/oauth/token`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
    };
    
    const promise = new Promise((resolve, reject) => {
        let data = ''
        const req = https.request(options, (res) => {
            res.on('data', (d) => {
                data += d
                const response = JSON.parse(d);
                console.log(response);
            });
            
            res.on('end', () => {
                console.log(data)
                const parsedData = JSON.parse(data);
                console.log(parsedData)
                const accessCode = parsedData.access_token;
                const redirectUrl = `${client_uri}?accessToken=${accessCode}`;
                console.log(`Redirecting to ${redirectUrl}`);
                resolve({
                    statusCode: 301,
                    headers: {
                        Location: redirectUrl
                    }
                });
            })
        });

        req.on('error', (error) => {
            console.error(error);
            reject(error);
        });
    
        req.write(JSON.stringify(formData));
        req.end();
    })

    return promise;
};
