import jwt from "jsonwebtoken";
import configurations from "../config/getConfig";


const generateToken = (userName:string,email:string,role:string)=>{
    const payload = {
        userName,email,role
    }
    const secret = configurations.tokenKey as string;
    console.log(configurations);
    const options = {expiresIn:'6h'}
    return jwt.sign(payload,secret,options);
}

export default generateToken;