import mongoose from "mongoose";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is required");
}

// Track connection state globally to avoid reinitialization
let isConnected = false;

export const connectToDatabase = async () => {
  if (isConnected) return; // Skip if already connected

  try {
    const db = await mongoose.connect(DATABASE_URL,{
      serverSelectionTimeoutMS: 10000, // Timeout after 10 seconds
    });
    isConnected = db.connections[0].readyState === 1;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};
