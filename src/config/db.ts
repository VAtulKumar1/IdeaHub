import mongoose, { ConnectOptions }  from "mongoose";

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
        await mongoose.connect('mongodb+srv://atulkumarverma304:N7BocL3Yy7c9DmKe@cluster0.ct27x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', options);
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