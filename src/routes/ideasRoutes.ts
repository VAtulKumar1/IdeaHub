import express from "express";
import {
    postIdea, 
    getLatestIdeas, 
    getOldestIdeas, 
    likeAnIdea,
    getPopularIdeas,
    findARandomIdea

} from '../controller/ideaController';

export const routes = express.Router();

routes.post('/post',postIdea);

routes.get('/ideas/latest',getLatestIdeas);
routes.get('/ideas/oldest',getOldestIdeas);
routes.patch('/like',likeAnIdea);
routes.get('/popular',getPopularIdeas);
routes.get('/random',findARandomIdea);


