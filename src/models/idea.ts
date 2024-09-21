import mongoose from "mongoose";


const ideaSchema  = new mongoose.Schema({
    title: String,
    description: String,
    tag: String,
    industry: String
})

export default ideaSchema;