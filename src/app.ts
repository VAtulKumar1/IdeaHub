import express from "express";
import bodyParser from "body-parser";
import connectDB from "./config/db";
import { routes } from "./routes/ideasRoutes";
import configurations from "./config/getConfig";

const app = express();
const port: string = configurations.port;
app.use(bodyParser.json());

connectDB();

app.use("/ideahub", routes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
