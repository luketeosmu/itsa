const util = require('util');
const AWS = require('aws-sdk');
const jose = require('jose');

// const secretsmanager = new AWS.SecretsManager();
const JWKS = jose.createLocalJWKSet({
    "keys": [
        {
            "kty":"RSA",
            "e":"AQAB",
            "kid":"20b5133f-8f01-4220-8544-f843ea72be64",
            "n":"tbrn2Yer9wEduoEcLzZpWjYUJY0a5rdk03z98G8fiQVveV9_OR62DaVPLV6JDFLkESWVet_R0ZfCHsi-rR74y69dMOrn3wvmBR30YyOfffwRkyOMnf7Zat3NoG-F_vUlPyJxSg8SvY9TTpTPivfVNCQX8GkBwDQGq_DxAo8qM0Wty3dCoVewFz3QafDBcOAlAKzD7FAidl5fzRZHeFMJkyefOOy7MS6Rr6jkUzTnZuYdsrnwnAm5cAf1k0KVXmCOubxPNuAVCvL0Vr7yqGcqPYXJgIIauhzIgo6p_sdfGpxIXmbdYZd2g32QK1CZLtxV_p7TnyYzfnMLUlADz4bPzw"
        },
    ]
});


const arn = `arn:aws:execute-api:${process.env.AWS_REGION}:${process.env.ACCOUNT_ID_1}:${process.env.API_ID}` // NOTE: Replace with your API Gateway API ARN
const apiPermissions = [
    {
        "arn": arn,
        "resource": "customers", // NOTE: Replace with your API Gateway Resource
        "stage": "test", // NOTE: Replace with your API Gateway Stage
        "httpVerb": "GET", // NOTE: Replcae with the HTTP Verbs you want to allow access your REST Resource
        "scope": "profile" // NOTE: Replace with the proper OAuth scopes that can access your REST Resource
    }
];

const defaultDenyAllPolicy = {
    "principalId": "user",
    "policyDocument": {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Action": "execute-api:Invoke",
                "Effect": "Deny",
                "Resource": "*"
            }
        ]
    }
};

function generatePolicyStatement(apiName, apiStage, apiVerb, apiResource, action) {
    // Generate an IAM policy statement
    const statement = {};
    statement.Action = 'execute-api:Invoke';
    statement.Effect = action;
    const methodArn = apiName + "/" + apiStage + "/" + apiVerb + "/" + apiResource;
    statement.Resource = methodArn;
    return statement;
};

function generatePolicy(principalId, policyStatements, decodedAccessToken) {
    // Generate a fully formed IAM policy
    const authResponse = {};
    authResponse.principalId = principalId;
    const policyDocument = {};
    policyDocument.Version = '2012-10-17';
    policyDocument.Statement = policyStatements;
    authResponse.policyDocument = policyDocument;
    authResponse.context = {
        "decodedAccessToken": JSON.stringify(decodedAccessToken),
    };
    return authResponse;
};

async function verifyAccessToken(accessToken) {
    /*
    * Verify the access token with your Identity Provider here (check if your
    * Identity Provider provides an SDK).
    *
    * This example assumes this method returns a Promise that resolves to
    * the decoded token, you may need to modify your code according to how
    * your token is verified and what your Identity Provider returns.
    * 
    * Fetch the KID attribute from your JWKS Endpoint to verify its integrity
    * You can either use a Environment Variable containing the KID or call AWS Secrets Manager with KID already securely stored.
    */

    const decryptedJwtWithPermissions = await decryptJWT(accessToken);
    const decodedAccessToken = await verifyTokenWithJWKS(decryptedJwtWithPermissions.accessToken);
    const permissions = decryptedJwtWithPermissions.permissions
    return { decodedAccessToken, permissions }
};

async function decryptJWT(encryptedToken) {
    const { payload } = await jose.jwtDecrypt(encryptedToken, process.env.g1t4SymmetricKey)
    return payload;
}

async function verifyTokenWithJWKS(decryptedJwt) {
    const decoded = await jose.jwtVerify(decryptedJwt, JWKS)
    return decoded;
}

function generateIAMPolicy(scopeClaims, decodedAccessToken) {
    // Declare empty policy statements array
    const policyStatements = [];
    // Iterate over API Permissions
    for (let i = 0; i < apiPermissions.length; i++) {
        // Check if token scopes exist in API Permission
        if (scopeClaims.indexOf(apiPermissions[i].scope) > -1) {
            // User token has appropriate scope, add API permission to policy statements
            policyStatements.push(generatePolicyStatement(apiPermissions[i].arn, apiPermissions[i].stage,
                apiPermissions[i].httpVerb, apiPermissions[i].resource, "Allow"));
        }
    }
    // Check if no policy statements are generated, if so, create default deny all policy statement
    if (policyStatements.length === 0) {
        return defaultDenyAllPolicy;
    } else {
        return generatePolicy('user', policyStatements, decodedAccessToken);
    }
};

exports.handler = async (event, context) => {
    // Declare Policy
    let iamPolicy = null;
    // Capture raw token and trim 'Bearer ' string, if present
    const token = event.authorizationToken.replace("Bearer ", "");
    console.log('JWT Token', token)
    // Validate token
    await verifyAccessToken(token).then(data => {
        // Retrieve token scopes
        const { decodedAccessToken, permissions } = data;
        console.log('Decoded JWT Token', JSON.stringify(decodedAccessToken))
        // For testing purposes using a ID token without scopes. If you have an access token with scopes, 
        // uncomment 'data.claims.scp' and pass the array of scopes present in the scp attribute instead.
        const scopeClaims = ['email']// data.claims.scp;
        // Generate IAM Policy
        iamPolicy = generateIAMPolicy(scopeClaims, decodedAccessToken);
    })
        .catch(err => {
            console.log(err);
            iamPolicy = defaultDenyAllPolicy;
        });
    console.log('IAM Policy', JSON.stringify(iamPolicy));
    return iamPolicy;
};