/**
 * Pikky Assessment
 * @author Shuja Naqvi
 */
import { updateRandomFlightStatus } from "@/utils/updateRandomFlightStatus"; 

// Function to automatically update flight statuses in the background
export async function startUpdatingFlightStatuses() {
  try {
    // Run the update function every 30 seconds (30000ms) or set a custom interval
    setInterval(async () => {
      await updateRandomFlightStatus();
    }, 6000);
  } catch (error) {
    console.error("Error starting flight status updates:", error);
  }
}

startUpdatingFlightStatuses();
