
import { Request,Response } from 'express'
import Idea from '../models/idea';
import User from '../models/userSchema';
import generateToken from '../jwt/generateToken';
import bcrypt from 'bcrypt';
import generateRefereshToken from '../jwt/generateRefereshToken';

export const postIdea= async (req :Request , res: Response)=>{

    try{
        const {title,description,tag,industry,createdAt} = req.body;
        const idea = new Idea({
            title,
            description,
            tag,
            industry,
            createdAt,
            likes:0
        })
        await idea.save();
        res.status(201).json(idea);

    }
    catch(error){
        if(error instanceof Error){
            res.status(400).json({"message": error.message})
        }
    }

}

export const getLatestIdeas = async (req:Request,res:Response) => {
    try{
        const ideas = await Idea.find().sort({createdAt: -1});
        res.status(200).json(ideas);
    }
    catch(error){
        res.status(400).send("some error occured");
    }

}


export const getOldestIdeas = async (req:Request,res:Response) => {
    try{
        const ideas = await Idea.find().sort({createdAt : 1});
        res.status(200).json(ideas);
    }
    catch(error){
        res.status(400).send("some error occured");
    }

}

export const likeAnIdea = async (req: Request,res:Response)=>{
    try{
        const id = req.query.id;
        const idea = await Idea.findByIdAndUpdate(id,{ $inc : {likes : 1}});
        res.status(201).json(idea);

    }catch(error){
        console.log("some error occured")
    }

}

export const disLikeAnIdea = async (req: Request,res:Response)=>{
    try{
        const id = req.query.id;
        const idea = await Idea.findByIdAndUpdate(id,{ $inc : {likes : -1}});
        res.status(201).json(idea);

    }catch(error){
        console.log("some error occured")
    }

}


export const getPopularIdeas = async (req: Request,res:Response)=>{
    try{
        const ideas = await Idea.find().sort({likes: -1});
        res.status(201).json(ideas);

    }catch(error){
        console.log("some error occured")
    }

}


export const findARandomIdea = async (req: Request,res:Response)=>{
    try{
        const idea = await Idea.aggregate().sample(1);
        res.status(201).json(idea);

    }catch(error){
        console.log("some error occured")
    }

}

export const register = async (req:Request,res:Response)=>{
    const {userName,password} = req.body;
    try{
        const salt = await bcrypt.genSalt(8);
        const encryptedPassword =  await bcrypt.hash(password,salt);
        const user = await User.findOne({userName});
        if(user){
            res.status(200).json({message:"User already exists"});
            return;
        }
       
        const newUser = new User({
                userName: userName,
                password: encryptedPassword
           })
        newUser.save();
        const token = generateToken(userName);
        const refereshToken = generateRefereshToken(userName);
        const response = {
            _id: newUser._id,
            userName: newUser.userName, 
            accessToken:token,
            refereshToken

        }
        res.status(200).json(response);
        

    }catch(error){
        console.log({message:"some error occured"});
    }
}

export const login = async (req:Request,res:Response)=>{
    const {userName,password} = req.body;
    try{
        if(!(userName && password)){
            res.status(401).json({
                message:"please provide both values"
            })
        }
        const userExists = await User.findOne({userName});
        if(userExists && (await bcrypt.compare(password,userExists.password as string))){
            const token = generateToken(userName);
            res.status(200).json({
                userName,
                token
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
