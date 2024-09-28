import express from "express";
import {
    postIdea, 
    getLatestIdeas, 
    getOldestIdeas, 
    likeAnIdea,
    getPopularIdeas,
    findARandomIdea

} from '../controller/ideaController';
import { login,register } from "../controller/userController";
import authorize from "../auth/authorize";

export const routes = express.Router();

routes.post('/post',authorize,postIdea);
routes.get('/ideas/latest',authorize,getLatestIdeas);
routes.get('/ideas/oldest',authorize,getOldestIdeas);
routes.patch('/like',authorize,likeAnIdea);
routes.get('/ideas/popular',authorize,getPopularIdeas);
routes.get('/random',authorize,findARandomIdea);


routes.post('/user/register',register);
routes.post('/user/login',login);

