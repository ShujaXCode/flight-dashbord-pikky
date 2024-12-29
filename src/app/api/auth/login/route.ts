/**
 * Pikky Assessment
 * @author Shuja Naqvi
 */
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { signToken } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json(); 

    if (!email || !password) {
      return new Response(
        JSON.stringify({ message: "Both email and password are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    await dbConnect();

    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ message: "Invalid credentials" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new Response(JSON.stringify({ message: "Invalid credentials" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const token = signToken(user._id.toString());

    return new Response(
      JSON.stringify({
        message: "Login successful",
        token,
        user: {
          email: user.email,
          role: user.role,
        },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Login Error: ", error);
    return new Response(
      JSON.stringify({
        message: "An error occurred while processing the login request",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
