import { Request,Response,NextFunction } from "express";
import jwt  from "jsonwebtoken";
import configurations from "../config/getConfig";

const authorize = async (req:Request,res:Response,next:NextFunction)=>{
    const header = req.headers.authorization;
    const token = header && header.split(' ')[1];
    try{
        if(!token){
            res.status(401).send("Please provide token");
        }else{
            const secretKey = configurations.tokenKey as string;
            const user = jwt.verify(token,secretKey);
            if(!user){
                res.status(401).send("unauthorized access");
            }

        }
    }catch(error){
        res.status(500).json(error);
    }

    next();
    
    

}

export default authorize;