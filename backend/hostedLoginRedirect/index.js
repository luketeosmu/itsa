const querystring = require('querystring');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

exports.handler = async (event) => {
    /*
    * Generate HTTP redirect response with 302 status code and Location header.
    */

    const {email, password, auth_code_id} = querystring.parse(event.body);

    // get auth_code and redirect_uri using auth_code_id
    const [rows1] = await connection.execute("SELECT auth_code, redirect_uri FROM auth where id=?", [auth_code_id]);
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
    
    const [rows] = await connection.execute("SELECT id, hash_password, salt, role FROM users where email=?", [email]);
    console.log(rows);

    // validate password
    if (rows.length == 0) {
        console.log("row length error");
        return redirectError;
    }

    const {id, hash_password, salt, role} = rows[0];
    console.log(hash_password, salt);
    const hashedInputPassword = await bcrypt.hash(password, salt);
    if (hashedInputPassword != hash_password) {
        console.log("hash_password error");
        return redirectError;
    }

    // generate access_token and id_token and refresh_token
    const access_token = jose.SignJWT({ user: { id, email } })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('2h')
        .setIssuer('Bank App')
        .setAudience(redirect_uri)
        .sign(process.env.g1t4AsymmetricKey);

    // generate id_token
    const id_token = jose.SignJWT({ role })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('2h')
        .setIssuer('Bank App')
        .setAudience(redirect_uri)
        .sign(process.env.g1t4AsymmetricKey);

    // generate refresh_token
    const refresh_token = jose.SignJWT({ refresh: true })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('30d')
        .setIssuer('Bank App')
        .setAudience(redirect_uri)
        .sign(process.env.g1t4AsymmetricKey);

    const secret = jose.base64url.decode(process.env.g1t4SymmetricKey)
    const encrypted_access_token = await new jose.EncryptJWT({ role, access_token })
        .setProtectedHeader({ alg: 'dir', enc: 'A128CBC-HS256' })
        .setIssuedAt()
        .setExpirationTime('1h')
        .encrypt(secret)
    
    // update into auth_code table
    await connection.execute("UPDATE auth SET access_token=?, id_token=?, refresh_token=? where id=?", [encrypted_access_token, id_token, refresh_token, auth_code_id]);

    const response = {
        statusCode: 301,
        headers: {
            Location: `${redirect_uri}/authToken/?${stringified_params}`
        }
    };

    return response;
};
