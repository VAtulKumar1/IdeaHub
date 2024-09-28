import User from '../models/userSchema';
import generateToken from '../jwt/generateToken';
import bcrypt from 'bcrypt';
import generateRefereshToken from '../jwt/generateRefereshToken';
import { Request,Response } from 'express'
import Token from '../models/refreshTokenSchema';

export const register = async (req:Request,res:Response)=>{
    const {userName,email,password} = req.body;
    try{
        const salt = await bcrypt.genSalt(8);
        const encryptedPassword =  await bcrypt.hash(password,salt);
        const user = await User.findOne({email});
        if(user){
            res.status(200).json({message:"User already exists"});
            return;
        }
       
        const newUser = new User({
                userName,
                email,
                password: encryptedPassword
           })
        newUser.save();
        console.log(newUser);
        const accessToken = generateToken(userName,email,"User");
        console.log(accessToken);
        const refereshToken = generateRefereshToken(userName,email,"User");
        console.log(refereshToken);
        const token = new Token({
            refrehToken:refereshToken,
            userId:newUser._id,
        });
        token.save();

        console.log(`token${token}`);


        const response = {
            _id: newUser._id,
            userName: newUser.userName, 
            accessToken,
            refereshToken

        }
        res.status(200).json(response);
        

    }catch(error){
        console.log({message:"some error occured"});
    }
}

export const login = async (req:Request,res:Response)=>{
    const {email,password} = req.body;
    try{
        if(!( email && password)){
            res.status(401).json({
                message:"please provide both values"
            })
        }

        const userExists = await User.findOne({email},'+password');
        if(userExists && (await bcrypt.compare(password,userExists.password as string))){
            const accessToken = generateToken(userExists.userName,email,"User");
            const refreshToken = generateRefereshToken(userExists.userName,email,"User");
            res.status(200).json({
                userName:userExists.userName,
                _id:userExists._id,
                accessToken,
                refreshToken
            })
        }
        else{
            res.status(401).json({
                message:"Invalid credentials"
            })
        }

        
       
    }catch(error){
        console.log("somr error");
    }




}

export const refreshToken = async (req:Request,res:Response)=>{
    const refreshToken = req.headers['Refresh-Token'];
    const userId = req.params.id;

    if(!(userId && refreshToken)){
        res.status(401).send("Please provide a valid refresh token")
    }

    const tokenExists = await Token.findOne({userId},'+token');
    
    if(tokenExists!==null){
        const user = await User.findOne({_id:userId},'-password');
        if(user){
            const accessToken = generateToken(user?.userName as string ,user?.email as string,"User");
            const response = {
                user,
                accessToken
            }
            res.status(200).json(response);
        }
    }else{
        res.status(401).send("Please login refresh Token expired");
    }

}