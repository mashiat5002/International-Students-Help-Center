import mongoose from "mongoose";
console.log("📦 MONGODB_URI in Vercel:", process.env.MONGODB_URI);

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/myDatabase";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

const cached = (global as any).mongooseCache || { conn: null, promise: null };

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI);
  }

  cached.conn = await cached.promise;
  (global as any).mongooseCache = cached;
  
  return cached.conn;
}
