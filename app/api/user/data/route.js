import { connectDB } from "@/config/db";
import UserModel from "@/models/User";
// import user from "@/app/models/User";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const { userId } = getAuth();
    await connectDB();
    const User = UserModel.findById(userId);

    if (!User) {
      return NextResponse.json({ success: false, message: "user not found" });
    }

    return NextResponse.json({ success: true, User });
  } catch (err) {
    return NextResponse.json({ success: false, message: "user not found" });
  }
};
