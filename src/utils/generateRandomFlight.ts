/**
 * Pikky Assessment
 * @author Shuja Naqvi
 */
import Flight from "@/models/Flight";

// List of possible origins, destinations,  flight types and airlines
const origins = [
  "New York",
  "Los Angeles",
  "San Francisco",
  "Miami",
  "Dallas",
  "Atlanta",
];
const destinations = [
  "Chicago",
  "Houston",
  "Seattle",
  "Boston",
  "Denver",
  "Phoenix",
];
const flightTypes = ["Commercial", "Military", "Private"];
const airlines = ["Delta Airlines", "United Airlines", "American Airlines"];
function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export async function generateRandomFlights() {
  try {
    const newFlightData = {
      flightNumber: `FL${Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0")}`,
      origin: getRandomElement(origins),
      destination: getRandomElement(destinations),
      departureTime: new Date(
        Date.now() + Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)
      ), // Random time within the next 7 days
      status: "Scheduled",
      flightType: getRandomElement(flightTypes),
      airline: getRandomElement(airlines),
    };

    while (newFlightData.origin === newFlightData.destination) {
      newFlightData.destination = getRandomElement(destinations);
    }

    const newFlight = await Flight.create(newFlightData);
    console.log(`Generated and saved new flight: ${newFlight.flightNumber}`);
  } catch (error) {
    console.error("Error generating flights:", error);
  }
}
