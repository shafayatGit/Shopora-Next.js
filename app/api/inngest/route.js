import { serve } from "inngest/next";
import { inngest, sycnUserUpdate, syncUserCreation, syncUserDelete } from "@/app/config/inngest";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    syncUserCreation,
    sycnUserUpdate,
    syncUserDelete
     // <-- This is where you'll always add all your functions
  ],
});