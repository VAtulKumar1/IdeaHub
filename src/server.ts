import express , {Request , Response}from 'express';
import bodyParser from 'body-parser';
import connectDB from './config/db'
import { routes } from './routes/ideasRoutes';

const app = express();
const port : number = 3000;
app.use(bodyParser.json());

connectDB();



app.use('/ideahub', routes);



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});