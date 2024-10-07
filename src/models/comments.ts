import mongoose from "mongoose";

const schema = mongoose.Schema;
const commentSchema = new schema({
    userName: { type: String, required: true },
    ideaId: { type: schema.Types.ObjectId, ref: "Idea", required: true },
    message: { type: String, required: true, maxLength: 500 },
    createdAt: { type: Date, default: Date.now() },
    parentId: { type: schema.Types.ObjectId, ref: "Comment", default: null },
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
