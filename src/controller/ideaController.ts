
import { Request,Response } from 'express'
import Idea from '../models/idea';
import Comment from '../models/comments';


interface Idea {
    title:string, 
    description:string,
    tag:string,
    industry:string
}


interface CommentReqBody{
    userName:string,
    ideaId:string,
    message:string,
    parentId?:string
}


export const postIdea= async (req :Request , res: Response)=>{

    try{
        const request:Idea = req.body;
        const idea = new Idea(request);
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
        const id:string = req.params['ideaId'];
        const idea = await Idea.findByIdAndUpdate(id,{ $inc : {likes : 1}});
        res.status(201).json(idea);

    }catch(error){
        console.log("some error occured")
    }

}

export const dislikeAnIdea = async (req: Request,res:Response)=>{
    try{
        const id = req.params['ideaId'];
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





export const addAComment = async(req:Request,res:Response)=>{
    try{
        const request:CommentReqBody = req.body;
        const comment = new Comment(request);
        await comment.save();
        res.status(200).json(comment);
        
    }catch(error){
        res.status(500).json(error);
    }

}

export const getAllCommentsOnAPost = async (req:Request,res:Response)=>{
    try{
        const ideaId:string = req.params['ideaId'];
        if(!ideaId){
            res.status(401).json({
                message:"Please provide an ideaId"
            })
        }
        else{
            const comments = await Comment.find({ideaId}).sort({createdAt:1});
            res.status(200).json(comments);
        }
        

    }catch(error){
        res.status(500).json(error);
    }

}


export const deleteAnIdea = async(req:Request,res:Response)=>{
    try{
        const ideaId:string = req.params['ideaId'];
        if(!ideaId){
            res.status(401).json({
                message:"Please provide an ideaId"
            });
        }else{
            await Idea.findByIdAndDelete({_id:ideaId});
            res.status(200).json({
                message:"Idea deleted succesfully"
            })
        }

    }catch(error){
        res.status(500).json(error);
    }    
}



export const getCoversation = async (req:Request,res:Response)=>{
    try{
        const parentId:string = req.params['parentId'];
        if(!parentId){
            res.status(401).json({
                message:"Please provide an parentId"
            })
        }
        else{
            const conversation = await Comment.find({parentId}).sort({createdAt:1});
            res.status(200).json(conversation);
        }
        

    }catch(error){
        res.status(500).json(error);
    }

}

