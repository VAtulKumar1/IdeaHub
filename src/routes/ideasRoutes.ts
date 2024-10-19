import express from "express";
import cookieParser from "cookie-parser";
import {
    postIdea,
    getLatestIdeas,
    getOldestIdeas,
    likeAnIdea,
    dislikeAnIdea,
    getPopularIdeas,
    findARandomIdea,
    deleteAnIdea,
    getAllCommentsOnAPost,
    getCoversation,
    addAComment,
} from "../controller/ideaController";
import {
    login,
    refreshToken,
    register,
    updatePassword,
} from "../controller/userController";
import authorize from "../auth/authorize";

export const routes = express.Router();
routes.use(cookieParser());

routes
    .post("/post", postIdea)
    .get("/ideas/latest", getLatestIdeas)
    .get("/ideas/oldest", getOldestIdeas)
    .patch("/like/:ideaId", likeAnIdea)
    .patch("/dislike/:ideaId", dislikeAnIdea)
    .get("/ideas/popular", getPopularIdeas)
    .get("/random", findARandomIdea)
    .post("/comment", addAComment)
    .get("/comment/:ideaId", getAllCommentsOnAPost)
    .delete("/comment/:ideaId", deleteAnIdea)
    .get("/comment/coversation/:parentId", getCoversation)

    .post("/user/register", register)
    .post("/user/login", login)
    .post("/user/refresh/:id", refreshToken)
    .patch("/user/:id", updatePassword);
