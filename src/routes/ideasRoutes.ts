import express from "express";
import {
    postIdea, 
    getLatestIdeas, 
    getOldestIdeas, 
    likeAnIdea

} from '../controller/ideaController';

export const routes = express.Router();

routes.post('/post',postIdea);

routes.get('/ideas/latest',getLatestIdeas);
routes.get('/ideas/oldest',getOldestIdeas);
routes.patch('/like',likeAnIdea);


