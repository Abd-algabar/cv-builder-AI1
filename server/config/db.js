import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("MongoDB connected successfully");
        });

        let mongodbURI = process.env.MONGODB_URI ;
        const projectName = "cv Builder AI";
        if (!mongodbURI) {
            throw new Error("MONGODB_URI is not defined in environment variables");
        }

        if (mongodbURI.endsWith('/')) {
            mongodbURI = mongodbURI.slice(0, -1);
        }
        const fullUrl=process.env.FULL_STR_URL
        await mongoose.connect(fullUrl)
         mongoose.connection.on("connected", () => {
            console.log("MongoDB connected successfully2");
        });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        
    }
}

export default connectDB;