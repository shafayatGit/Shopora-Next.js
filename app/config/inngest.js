import { Inngest } from "inngest";
import { connect } from "mongoose";
import { connectDB } from "./db";
// import user from "../models/User";
import User from "../models/User";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "shopora-next" });

// Inngest function to save our user data to database
export const syncUserCreation = inngest.createFunction(
  {
    id: "sync-user-from-clerk",
  },
  {
    event: "clerk/user.created",
  },
  async ({ event }) => {
    const { id, email_addresses, first_name, image_url, last_name } =
      event.data;
    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: first_name + " " + last_name,
      imageUrl: image_url,
    };

    await connectDB();
    const user = await User.create(userData);
    console.log(user)
  }
);

// Inngest function to update user data
export const sycnUserUpdate = inngest.createFunction(
  {
    id: "update-user-from-clerk",
  },
  {
    event: "clerk/user.update",
  },
  async ({ event }) => {
    const { id, email_addresses, first_name, image_url, last_name } =
      event.data;
    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: first_name + " " + last_name,
      imageUrl: image_url,
    };
    await connectDB();
    await User.findByIdAndUpdate(id, userData);
  }
);

// Inngest function to delete user from the database
export const syncUserDelete = inngest.createFunction(
  {
    id: "delete-user-from-clerk",
  },
  {
    event: "clerk/user.deleted",
  },
  async ({ event }) => {
    const { id, email_addresses, first_name, image_url, last_name } =
      event.data;
    // const userData = {
    //   _id: id,
    //   email: email_addresses[0].email_address,
    //   name: first_name + " " + last_name,
    //   imageUrl: image_url,
    // };
    await connectDB();
    await User.findByIdAndDelete(id);
  }
);
