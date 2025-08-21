// lib/mongoose.js
import mongoose from "mongoose";
import { cache } from "react";
require("dotenv").config();

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export default async function connectDB() {
  try {
    if (cached.conn) {
      return cached.conn;
    }
    if (!cached.promise) {
      const opts = {
        bufferCommands: false,
      };

      cached.promise = await mongoose
        .connect(
          `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hm729vm.mongodb.net/Shopora_DB?retryWrites=true&w=majority&appName=Cluster0`,
          opts
        )
        .then(() => {
          console.log("✅ MongoDB Connected");
          return mongoose;
        });
    }
    cached.conn = await cached.promise;
    return cached.promise;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
}
// connectDB()
