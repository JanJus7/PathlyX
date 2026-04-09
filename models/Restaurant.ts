import mongoose, { Schema, Document } from "mongoose";

export interface IRestaurant extends Document {
  name: string;
  ownerId: mongoose.Types.ObjectId;
  employeeIds: mongoose.Types.ObjectId[];
}

const RestaurantSchema = new Schema<IRestaurant>(
  {
    name: { type: String, required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    employeeIds: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export default mongoose.models.Restaurant || mongoose.model<IRestaurant>("Restaurant", RestaurantSchema);