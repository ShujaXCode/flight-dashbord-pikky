/**
 * Pikky Assessment
 * @author Shuja Naqvi
 */
import connectMongo from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  try {
    await connectMongo();
    return NextResponse.json({ message: "MongoDB connection successful" });
  } catch (error: unknown) {
    console.error("Error connecting to MongoDB:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    const errorStack = error instanceof Error ? error.stack : null;

    return NextResponse.json(
      {
        message: "Error connecting to MongoDB",
        error: errorMessage,
        stack: errorStack,
      },
      { status: 500 }
    );
  }
}
