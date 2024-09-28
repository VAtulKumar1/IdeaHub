import mongoose, { ConnectOptions }  from "mongoose";
import configurations  from "./getConfig";

interface CustomConnectOptions extends ConnectOptions{
    useNewUrlParser? : boolean,
    useUnifiedTopology? : boolean
}

const options : CustomConnectOptions = {
    useNewUrlParser : true,
    useUnifiedTopology : true

}

const connectDB = async () => {
    try {
        await mongoose.connect(configurations.mongo_uri, options);
        console.log("MongoDB connected successfully.");
    } catch (error) {
        if( error instanceof Error){
            console.error(`MongoDB connection error: ${error.message}`);
        }
        else{
            console.log('An unknown error occured during mongoDB connection');
        }
        
        process.exit(1);
    }
};

export default connectDB;