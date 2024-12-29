/**
 * Pikky Assessment
 * @author Shuja Naqvi ..
 */
import mongoose, { Schema, Document, Model } from "mongoose";

interface Flight extends Document {
  flightNumber: string;
  origin: string;
  destination: string;
  departureTime: Date;
  status: "Scheduled" | "Delayed" | "Cancelled" | "In-flight";
  airline: string;
  flightType: "Commercial" | "Military" | "Private";
}

const FlightSchema: Schema<Flight> = new Schema(
  {
    flightNumber: { type: String, required: true, unique: true },
    origin: { type: String, required: true },
    destination: { type: String, required: true },
    departureTime: { type: Date, required: true },
    status: {
      type: String,
      enum: ["Scheduled", "Delayed", "Cancelled", "In-flight"],
      default: "Scheduled",
    },
    airline: { type: String, required: true },
    flightType: {
      type: String,
      enum: ["Commercial", "Military", "Private"],
      required: true,
    },
  },
  { timestamps: true }
);

const FlightModel: Model<Flight> =
  mongoose.models.Flight || mongoose.model<Flight>("Flight", FlightSchema);

export default FlightModel;
