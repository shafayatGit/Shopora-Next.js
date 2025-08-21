import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerkId: { type: String, unique: true, required: true },
    name: { type: String },
    email: { type: String, required: true, unique: true },
    imageUrl: { type: String },
    cartItems: { type: Object, default: {} },
  },
  { timestamps: true }
);
const UserModel = mongoose.models.user || mongoose.model("user", userSchema);

export default UserModel;
