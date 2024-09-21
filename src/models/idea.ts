import mongoose from "mongoose";


const ideaSchema  = new mongoose.Schema({
    title: String,
    description: String,
    tag: String,
    industry: String,
    createdAt: Date,
    likes : Number 
})

const Idea  = mongoose.model("Idea",ideaSchema); 


export default Idea;

