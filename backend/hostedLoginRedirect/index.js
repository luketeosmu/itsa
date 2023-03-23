const querystring = require('querystring');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

exports.handler = async (event) => {
    /*
    * Generate HTTP redirect response with 302 status code and Location header.
    */

    const {email, password, auth_code_id} = querystring.parse(event.body);

    // get auth_code and redirect_uri using auth_code_id
    const [rows1] = await connection.execute("SELECT auth_code, redirect_uri FROM auth_code where id=?", [auth_code_id]);
    const {auth_code, redirect_uri} = rows1[0];

    const params = {
        code: auth_code
    };
    const stringified_params = querystring.stringify(params);

    const redirectError = {
        statusCode: 500,
        headers: {
            Location: `${redirect_uri}/error`
        }
    };

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
    
    const [rows] = await connection.execute("SELECT hash_password, salt, code_challenge FROM users where email=?", [email]);
    console.log(rows);

    // validate password
    if (rows.length == 0) {
        console.log("row length error");
        return redirectError;
    }

    const {hash_password, salt} = rows[0];
    console.log(hash_password, salt);
    const hashedInputPassword = await bcrypt.hash(password, salt);
    if (hashedInputPassword != hash_password) {
        console.log("hash_password error");
        return redirectError;
    }

    const response = {
        statusCode: 301,
        headers: {
            Location: `${redirect_uri}/authToken/?${stringified_params}`
        }
    };

    return response;
};
