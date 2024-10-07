import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true, maxLength: 64 },
    email: { type: String, unique: true, required: true, maxLength: 128 },
    password: { type: String, required: true, minLength: 8, maxLength: 128 },
    role: { type: String, required: false, default: "User" },
});

const User = mongoose.model("User", userSchema);

export default User;
