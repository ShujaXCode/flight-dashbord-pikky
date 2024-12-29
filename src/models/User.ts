/**
 * Pikky Assessment
 * @author Shuja Naqvi
 */
import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  email: string;
  password: string;
  role: "user" | "admin";
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
