/**
 * Pikky Assessment
 * @author Shuja Naqvi
 */
import { generateRandomFlights } from "@/utils/generateRandomFlight";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await generateRandomFlights();

    return NextResponse.json({
      message: "Flight generation started successfully.",
    });
  } catch (error) {
    console.error("Error generating flights:", error);
    return NextResponse.json(
      { message: "Error generating flights", error },
      { status: 500 }
    );
  }
}
