import { Request,Response,NextFunction } from "express";
import jwt  from "jsonwebtoken";

const authorize = async (req:Request,res:Response,next:NextFunction)=>{
    const header = req.headers.authorization;
    const token = header && header.split(' ')[1];
    if(!token){
        res.status(401).send("Please provide token");
    }else{
        const secretKey = "mysecret";
        const user = jwt.verify(token,secretKey);
        if(!user){
            res.status(401).send("unauthorized access");
        }

    }

    next();
    
    

}

export default authorize;