import express from "express";
import {
    postIdea, 
    getLatestIdeas, 
    getOldestIdeas, 
    likeAnIdea,
    getPopularIdeas,
    findARandomIdea,
    register,
    login

} from '../controller/ideaController';
import authorize from "../auth/authorize";

export const routes = express.Router();

routes.post('/post',authorize,postIdea);

routes.get('/ideas/latest',authorize,getLatestIdeas);
routes.get('/ideas/oldest',authorize,getOldestIdeas);
routes.patch('/like',authorize,likeAnIdea);
routes.get('/ideas/popular',authorize,getPopularIdeas);
routes.get('/random',authorize,findARandomIdea);
routes.post('/register',register);
routes.post('/login',login);

