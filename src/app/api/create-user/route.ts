/**
 * Pikky Assessment
 * @author Shuja Naqvi
 */
import connectMongo from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password, role } = await req.json();

    if (!email || !password || !role) {
      return NextResponse.json(
        { message: "Email, password, and role are required" },
        { status: 400 }
      );
    }

    await connectMongo();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists with this email" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    return NextResponse.json({
      message: "User created successfully",
      status: 200,
      user: { email: newUser.email, role: newUser.role },
    });
  } catch (error) {
    console.error("Error inserting user:", error);
    return NextResponse.json(
      { message: "Error inserting user", error },
      { status: 500 }
    );
  }
}
