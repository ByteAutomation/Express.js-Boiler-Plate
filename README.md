# ⚙️ Express.js Microservice boiler-plate

This boilerplate helps to create a quick Microservice. Please, if you can any questions feel free to create an issue. I will try my best to add some more documentation in the future.

### 🔧 Configurations

This boiler-plate doesn't include any database. Please add your favourite database and put your "models" accordingly. Before you run the application please update the ".env" file.

```bash
APP_NAME="Express.js boiler-plate"
APP_PORT=8080

DB_HOST=localhost
DB_NAME=demo
DB_USER=root
DB_PASS=root

JWT_SECRET="add your secret here"
JWT_EXPIRY_DAYS=2
BCRYPT_SALT_ROUNDS=10
```

### 🚝 Run

Create a .env as mentioned above in the root folder.
```bash
node app.js
```

### 🐳 Run in Docker
```bash
# https://hub.docker.com/r/vasuratanpara/express-js-microservice-boiler-plate
docker pull vasuratanpara/express-js-microservice-boiler-plate:latest
```
### ⬅️ GET Request

```bash
http://localhost:<port>/hello-world
```
Success Code: 200
```json
{
    "success": true,
    "message": "Welcome to Hello!"
}
```
### ➡️ POST Request
```bash
http://localhost:<port>/hello-world
```
Send this JSON as raw data (as JSON)
```json
{
    "param_1":"This is a test",
    "param_2":"This is a demo"
}
```
Send request without required parametres [Error Code: 422]
```json
{
    "success": false,
    "message": [
        "The param 1 field is mandatory.",
        "The param 2 field is mandatory."
    ]
}
```
Send request with required parametres [Success Code: 200]
```json
{
    "success": true,
    "message": "Welcome to Hello POST!"
}
```

### 📋 TODO

- [ ]  Add more documentation
- [ ]  Add Test support
- [ ]  Convert to ES6
- [ ]  Github Action Support
