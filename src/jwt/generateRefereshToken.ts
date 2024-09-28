import jwt from 'jsonwebtoken';
import configurations from '../config/getConfig';

const generateRefereshToken = (userName:String,email:string,role:string)=>{
    const payload = {
        userName,email,role
    }
    const secret = configurations.refereshTokenKey;
    const options = {
        expiresIn:'14d'
    }
    return jwt.sign(payload,secret,options);

}


export default generateRefereshToken;