import mongoose from "mongoose";

export const MongoDBConnection = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/air-pure';
    
    // Check if MONGO_URI is undefined and handle it appropriately
    if (!mongoUri) {
      throw new Error("MONGO_URI is not defined");
    }
    const conn = await mongoose.connect(mongoUri, {
      maxPoolSize: 10, // Adjust as needed
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit on failure
  }
};