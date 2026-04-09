import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  role: "superadmin" | "admin" | "employee";
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { 
      type: String, 
      enum: ["superadmin", "admin", "employee"], 
      default: "employee" 
    },
  },
  { timestamps: true }
);

// Prevent mongoose from recompiling the model in development
export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);