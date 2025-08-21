import connectDB from "@/config/db";

export async function GET() {
  try {
    await connectDB();
    return new Response(JSON.stringify({ success: true, message: "MongoDB connected!" }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
    });
  }
}