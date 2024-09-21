import mongoose from "mongoose";


const ideaSchema  = new mongoose.Schema({
    title: String,
    description: String,
    tag: String,
    industry: String
})

const Idea  = mongoose.model("Idea",ideaSchema); 


export default Idea;

