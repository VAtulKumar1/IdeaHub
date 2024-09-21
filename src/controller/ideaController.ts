
import { Request,Response } from 'express'
import Idea from '../models/idea';


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
        const id = req.body.id;
        const idea = await Idea.findByIdAndUpdate(id,{ $inc : {likes : 1}});
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
