const querystring = require('querystring');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

exports.handler = async (event) => {
    /*
     * Generate HTTP redirect response with 302 status code and Location header.
     */
    const client_end_point = "http://project-2022-23t2-g1-t4-s3.s3-website-us-east-1.amazonaws.com";
    const params = {
        code: "something"
    };

    // for post request
    console.log(querystring.parse(event.body));
    const {email, password, code_challenge} = querystring.parse(event.body);
    
    // for get request
    // const {email, password} = event.queryStringParameters;
    
    console.log("email", email);
    console.log("password", password);
    console.log("code_challenge", code_challenge);

    const endpoint = 'sarah-rds-main-1.chokqauthwr5.ap-southeast-1.rds.amazonaws.com';
    const username = 'admin';
    const rdsPassword = '*xNs#7v4pJ7rAAX';
    const databaseName = 'CS301';

    const redirectError = {
        statusCode: 500,
        headers: {
            Location: `${client_end_point}/error`
        }
    };
    
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
    console.log("hashedInputPassword", hashedInputPassword);

    await connection.execute("UPDATE users set code_challenge=? where email=?", [code_challenge, email]);
    const stringified_params = querystring.stringify(params);
    
    const response = {
        statusCode: 301,
        headers: {
            Location: `${client_end_point}/authToken/?${stringified_params}`
        }
    };

    return response;
};
