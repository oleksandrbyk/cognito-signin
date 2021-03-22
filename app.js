const express = require("express");
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json());

const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;

const AWS = require('aws-sdk');

const poolData = {    
  UserPoolId : "us-east-1_vygd5sGmE", // Your user pool id here    
  ClientId : "6c6a4ltrfmvsi4tdlkumkn6d6p" // Your client id here
}; 
const pool_region = 'us-east-1';

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

// get all todos
app.post('/signin', (req, res) => {
  const email = (req.body && req.body.email) || '';
  const password = (req.body && req.body.password) || '';
  const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
    Username : email,
    Password : password,
  });
  var userData = {
    Username : email,
    Pool : userPool
  };
  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  cognitoUser.setAuthenticationFlowType('USER_PASSWORD_AUTH');
  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function (result) {
      res.status(200).send({
        success: 'true',
        message: 'todos retrieved successfully',
        data: result,
      });
    },
    onFailure: function(err) {
      res.status(400).send({
        success: 'false',
        message: err.message,
        data: {},
      });
    },
  });
});
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});
