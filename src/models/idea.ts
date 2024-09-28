import mongoose from "mongoose";


const ideaSchema  = new mongoose.Schema({
    title: { type:String, required:true,maxLength:80},
    description: { type:String, required:true,maxLength:1000},
    tag: {type:String,required:true,enum:["Beginer","Intermediate","Advanced"]},
    industry: { type:String, required:false,maxLength:80},
    createdAt:{ type:Date,default:Date.now()},
    likes : { type:Number,default:0},
})

const Idea  = mongoose.model("Idea",ideaSchema); 


export default Idea;

