import jwt, { SignOptions } from "jsonwebtoken";
import configurations from "../config/getConfig";


const generateToken = (userName:string,email:string,role:string)=>{
    const payload = {
        userName,email,role
    }
    const secret:string = configurations.tokenKey;
    const options:SignOptions = {expiresIn:'6h',algorithm:'HS256'};
    
    return jwt.sign(payload,secret,options);
}

export default generateToken;