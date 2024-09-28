import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './config/db'
import { routes } from './routes/ideasRoutes';
import cors from 'cors';

const app = express();
const port : number = 3000;
app.use(bodyParser);


const corsOptions = {
  origin: 'http://localhost:5173', // Your React app's origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control'], // Allowed headers
};

// Enable CORS for all routes
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

connectDB();

app.use('/ideahub', routes);




app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});