/**
 * Pikky Assessment
 * @author Shuja Naqvi
 */
import connectMongo from "@/lib/mongodb";
import Flight from "@/models/Flight";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json(
        { error: "Flight ID is required" },
        { status: 400 }
      );
    }

    const body = await req.json();

    await connectMongo();

    const updatedFlight = await Flight.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updatedFlight) {
      return NextResponse.json({ error: "Flight not found" }, { status: 404 });
    }

    return NextResponse.json(updatedFlight);
  } catch (error) {
    console.error("Error updating flight status:", error);
    return NextResponse.json(
      { error: "Error updating flight status", details: error.message },
      { status: 500 }
    );
  }
}
