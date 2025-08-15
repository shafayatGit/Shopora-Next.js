import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    required: true,
    email: String,
    required: true,
    unique: true,
    imageUrl: String,
    required: true,
    cartItems: Object,
    default: {},
  },
  { minimize: false }
);
const User = mongoose.models.user || mongoose.model("User", userSchema);

export default User;
