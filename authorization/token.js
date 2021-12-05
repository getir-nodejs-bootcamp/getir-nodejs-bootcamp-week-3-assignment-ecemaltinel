import jwt from 'jsonwebtoken';
import process from 'process';
import dotenv from 'dotenv'

if (process.env.NODE_ENV != 'production') {
    dotenv.config();
}
//verifying token given in the header of the req
 const verifyToken = (req,res,next) => {

    var token = req.header("Authorization")
    if(token==null) res.status(401).send("Token is missig")
    else
    {
       token = token.includes("Bearer") ? token.replace("Bearer ","") : token
       jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,decoded)=>{
           err ? res.status(403).send(`Invalid token`) : next()
       })
    }
}
export default verifyToken;