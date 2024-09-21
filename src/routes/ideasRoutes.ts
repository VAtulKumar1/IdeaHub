import express from "express";
import {postIdea} from '../controller/ideaController';

export const routes = express.Router();

routes.post('/post',postIdea);


