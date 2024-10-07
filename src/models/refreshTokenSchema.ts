import mongoose from "mongoose";
import configurations from "../config/getConfig";

const schema = mongoose.Schema;

const refereshTokenSchema = new schema({
    refrehToken: { type: String, required: true },
    userId: { type: schema.Types.ObjectId, ref: "User" },
    createdAt: {
        type: Date,
        expires: configurations.refreshTokenExpiresIn,
        default: Date.now(),
    },
});

const Token = mongoose.model("Token", refereshTokenSchema);

export default Token;
