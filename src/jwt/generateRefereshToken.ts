import jwt from 'jsonwebtoken';

const generateRefereshToken = (userName:String)=>{
    const payload = {
        userName
    }
    const secret = process.env.REFERESH_TOKEN_SECRET_KEY as string;
    const options = {
        expiresIn:'14d'
    }
    return jwt.sign(payload,secret,options);

}


export default generateRefereshToken;