import mongoose from "mongoose";


const ideaSchema  = new mongoose.Schema({
    title: { type:String, required:true,maxLength:80},
    description: { type:String, required:true,maxLength:1000},
    tag: {type:String,required:true,enum:["Beginer","Intermediate","Advanced"]},
    industry: { type:String, required:false,maxLength:80},
    createdAt:{ type:Date, required:true},
    likes : { type:Number, required:true},
})

const Idea  = mongoose.model("Idea",ideaSchema); 


export default Idea;

