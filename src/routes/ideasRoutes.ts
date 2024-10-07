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
    .post("/post", authorize, postIdea)
    .get("/ideas/latest", authorize, getLatestIdeas)
    .get("/ideas/oldest", authorize, getOldestIdeas)
    .patch("/like/:ideaId", authorize, likeAnIdea)
    .patch("/dislike/:ideaId", authorize, dislikeAnIdea)
    .get("/ideas/popular", authorize, getPopularIdeas)
    .get("/random", authorize, findARandomIdea)
    .post("/comment", authorize, addAComment)
    .get("/comment/:ideaId", authorize, getAllCommentsOnAPost)
    .delete("/comment/:ideaId", authorize, deleteAnIdea)
    .get("/comment/coversation/:parentId", authorize, getCoversation)

    .post("/user/register", register)
    .post("/user/login", login)
    .post("/user/refresh/:id", refreshToken)
    .patch("/user/:id", authorize, updatePassword);
