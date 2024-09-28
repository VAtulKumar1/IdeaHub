import express from "express";
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
    addAComment

} from '../controller/ideaController';
import { login,refreshToken,register, updatePassword } from "../controller/userController";
import authorize from "../auth/authorize";

export const routes = express.Router();

routes.post('/post',authorize,postIdea);
routes.get('/ideas/latest',authorize,getLatestIdeas);
routes.get('/ideas/oldest',authorize,getOldestIdeas);
routes.patch('/like/:ideaId',authorize,likeAnIdea);
routes.patch('/like/:ideaId',authorize,dislikeAnIdea);
routes.get('/ideas/popular',authorize,getPopularIdeas);
routes.get('/random',authorize,findARandomIdea);
routes.post('/comment',authorize,addAComment);
routes.get('/comment/:ideaId',authorize,getAllCommentsOnAPost);
routes.delete('/comment/:ideaId',authorize,deleteAnIdea);
routes.get('/comment/coversation/:parentId',authorize,getCoversation);


routes.post('/user/register',register);
routes.post('/user/login',login);
routes.post('/user/refresh/:id',refreshToken)
routes.patch('/user/:id',authorize,updatePassword);

