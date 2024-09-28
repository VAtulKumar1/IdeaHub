import jwt from 'jsonwebtoken';

const generateRefereshToken = (userName:String)=>{
    const payload = {
        userName
    }
    const secret = "myRefereshToken";
    const options = {
        expiresIn:'14d'
    }
    return jwt.sign(payload,secret,options);

}


export default generateRefereshToken;