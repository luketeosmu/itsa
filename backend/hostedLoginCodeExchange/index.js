const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

exports.handler = async (event) => {
    const { code_verifier, client_id, client_secret, auth_code } = JSON.parse(event.body);
    // get code_challenge and code_challenge_method using auth_code
    const endpoint = process.env.endpoint;
    const username = process.env.username;
    const rdsPassword = process.env.rdsPassword;
    const databaseName = process.env.databaseName;
    const connection = await mysql.createConnection({
        host: endpoint,
        user: username,
        password: rdsPassword,
        database: databaseName
    });
    const [rows1] = await connection.execute("SELECT *_method FROM auth where auth_code=?", [auth_code]);
    const { code_challenge, code_challenge_method, access_token, id_token, refresh_token } = rows1[0];
    // validate code_verifier
    if (code_challenge_method == 'S256') {
        const hashedInputCodeVerifier = await bcrypt.hash(code_verifier, 10);
        if (hashedInputCodeVerifier != code_challenge) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'invalid_grant' })
            };
        }
    } else {
        if (code_verifier != code_challenge) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'invalid_grant' })
            };
        }
    }
    
    // validate client_id and client_secret
    const [rows2] = await connection.execute("SELECT client_secret FROM client where client_id=?", [client_id]);
    const { client_secret: client_secret_db } = rows2[0];
    if (client_secret != client_secret_db) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'invalid_client' })
        };
    }

    // return access_token, id_token, refresh_token
    return {
        statusCode: 200,
        body: JSON.stringify({ access_token, id_token, refresh_token })
    };
}