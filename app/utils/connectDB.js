import mongoose from "mongoose";

const uri = process.env.MONGODB_URI ;

let isConnected = false; // global state to track connection

export async function connectDB() {
  if (isConnected) {
    // If already connected, just reuse it
    return;
  }

  try {
    const db = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = db.connections[0].readyState === 1;
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw new Error("Could not connect to MongoDB");
  }
}
