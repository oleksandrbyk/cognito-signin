# cognito-signin

### Start
1. Install the project dependencies
```
npm install
```

2. Add `.env` file in the root dir of project.(Use `.env-sample`)

### Run server
4. Run server
```
node app.js
```
### Test
You can test the apis with postman or curl.
- With curl,
```
curl --location --request POST 'localhost:3000/signin' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "email",
    "password": "password"
}'
```
