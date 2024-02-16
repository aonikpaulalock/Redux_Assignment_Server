# EyeGlass Management Instructions

### How to run locally this project locally

- Go MongoDb Atlas
- Create database
- Go to `network > accessList > click ADD IP ADDRESS > 0.0.0.0/0 (includes your current IP address)`
- Go to `database > connect > drivers > copy mongodb > ( mongodb+srv://<username_Your_database>:<password_Your_database>@cluster0.j1ployz.mongodb.net/?retryWrites=true&w=majority )`

### Clone Project

`git clone https://github.com/aonikpaulalock/Redux_Assignment_Server.git`

### Go to the project directory

`cd Redux_Assignment_Server`

### Install dependencies

`npm install or i`

### Setup .env File root folder

- PORT=`Your_Port`
- DATABASE_URL= `( mongodb+srv://<Your_Databse_Username>:<Your_Database_Password>@cluster0.j1ployz.mongodb.net/Your_Collection_Name?retryWrites=true&w=majority )`
- SALT_ROUND = `how number of password hash`
- JWT_ACCESS_TOKEN=`Generate your access token`
- JWT_ACCESS_TOKEN_EXPIRE=`Expire time your access token`

### Start the server on the terminal

`npm run start:dev`
