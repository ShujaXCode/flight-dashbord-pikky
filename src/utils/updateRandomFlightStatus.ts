/**
 * Pikky Assessment
 * @author Shuja Naqvi
 */
import Flight from "@/models/Flight";

// This function randomly updates the status of an existing flight
export async function updateRandomFlightStatus() {
  try {
    const flights = await Flight.find();

    if (flights.length === 0) {
      console.log("No flights available to update.");
      return;
    }

    // Randomly select a flight
    const randomFlight = flights[Math.floor(Math.random() * flights.length)];

    // Randomly determine the new status from all possible values
    const statuses: ("Scheduled" | "Delayed" | "Cancelled" | "In-flight")[] = [
      "Scheduled",
      "Delayed",
      "Cancelled",
      "In-flight",
    ];
    const newStatus = statuses[Math.floor(Math.random() * statuses.length)];

    randomFlight.status = newStatus;
    await randomFlight.save();

    console.log(
      `Flight ${randomFlight.flightNumber} status updated to: ${newStatus}`
    );
  } catch (error) {
    console.error("Error updating flight status:", error);
  }
}
