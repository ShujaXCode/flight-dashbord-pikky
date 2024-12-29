/**
 * Pikky Assessment
 * @author Shuja Naqvi
 */
import connectMongo from "@/lib/mongodb";
import Flight from "@/models/Flight";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const filters: any = {};

  const flightNumber = searchParams.get("flightNumber");
  const origin = searchParams.get("origin");
  const destination = searchParams.get("destination");
  const status = searchParams.get("status");
  const flightType = searchParams.get("flightType");
  const airline = searchParams.get("airline");


  if (flightNumber) {
    filters.flightNumber = new RegExp(flightNumber, "i");
  }
  if (origin) {
    filters.origin = new RegExp(origin, "i");
  }
  if (destination) {
    filters.destination = new RegExp(destination, "i");
  }
  if (status && status !== "All") {
    filters.status = status;
  }
  if (flightType && flightType !== "All") {
    filters.flightType = flightType;
  }
  if (airline && airline !== "All") {
    filters.airline = airline;
  }

  try {
    // Connect to the database
    await connectMongo();

    const today = new Date();
    filters.departureTime = { $gte: today };

    const flights = await Flight.find(filters).sort({ departureTime: 1 });
    return NextResponse.json(flights);
  } catch (error) {
    // Handle any error in database or fetching
    return NextResponse.json(
      { message: "Error fetching flights", error: error.message },
      { status: 500 }
    );
  }
}
