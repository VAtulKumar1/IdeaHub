import jwt from "jsonwebtoken";


const generateToken = (userName:string)=>{
    const payload = {
        userName : userName
    }

    const secret = process.env.TOKEN_SECRET_KEY as string;
    const options = {expiresIn:'6h'}
    return jwt.sign(payload,secret,options);
}

export default generateToken;