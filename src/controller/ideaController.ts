
import { Request,Response } from 'express'
import Idea from '../models/idea';


export const postIdea= async (req :Request , res: Response)=>{

    try{
        const {title,description,tag,industry} = req.body;
        const idea = new Idea({
            title,description,tag,industry
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

export const getAllIdeas = async (req:Request,res:Response) => {
    try{
        const ideas = await Idea.find();
        res.status(200).json(ideas);
    }
    catch(error){
        res.status(400).send("some error occured");
    }

}

