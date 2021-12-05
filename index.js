import express from 'express';
import { json } from 'body-parser';
import usersRoutes from './routes/users.js';
import logger from './config/logger.js'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken';

dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(json());

/*here token will be given to the user to make sure that user will be able to make request
user credentials could have been validated but this part is skipped
this is just a mock service to generate token regarding to secret key*/
app.get('/',(req,res)=>{
    const token = jwt.sign({user:"newUser"},process.env.ACCESS_TOKEN_SECRET)
    res.send(`Welcome! Use this token to be able to send request -> ${token}`)
});

//go to userRoutes when endpoint starts with /users
app.use('/users', usersRoutes)

//for other endpoints
app.all("*",(req,res)=>{
    res.status(404).send("Page is not found")
    logger.error(`User could not reach to -> ${req.method} ${req.url} and got error -> ${res.statusCode} `)

})

app.listen(PORT,()=>{
console.log(`Server is running on port http://localhost:${PORT}`)
});





