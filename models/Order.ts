import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  address: { type: String, required: true },
  price: { type: Number, required: true },
  platform: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  targetDeliveryTime: { type: String },
  status: { 
    type: String, 
    enum: ["active", "delivered"],
    default: "active" 
  },
  restaurantId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Restaurant", 
    required: true 
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);