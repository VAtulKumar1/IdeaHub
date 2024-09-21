import express from "express";
import {postIdea,getAllIdeas} from '../controller/ideaController';

export const routes = express.Router();

routes.post('/post',postIdea);

routes.get('/ideas',getAllIdeas);


