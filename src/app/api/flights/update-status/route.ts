/**
 * Pikky Assessment
 * @author Shuja Naqvi
 */
import { NextResponse } from "next/server";
import { startUpdatingFlightStatuses } from "@/utils/startUpdatingFlightStatuses";

export async function PATCH() {
  try {
    startUpdatingFlightStatuses();

    return NextResponse.json({
      message: "Started background status update process",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error starting background status update", error },
      { status: 500 }
    );
  }
}
