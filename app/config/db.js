// lib/mongoose.js
import mongoose from "mongoose";

require("dotenv").config();
// lib/mongodb.js

// let isConnected = false; // Global connection state
// export async function connectDB() {
//   if (isConnected) {
//     console.log("✅ Already connected to MongoDB");
//     return;
//   }

//   try {
//     await mongoose.connect(process.env.MONGODB_URI, {
//       dbName: "mydatabase", // optional: name of DB
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     isConnected = true;
//     console.log("✅ Connected to MongoDB");
//   } catch (error) {
//     console.error("❌ MongoDB connection error:", error);
//     throw new Error("Failed to connect to MongoDB");
//   }
// }
// connectDB()

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export default async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = { bufferCommands: false };
    if (mongoose.connection.readyState >= 1) return;
    return mongoose.connect(process.env.MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
