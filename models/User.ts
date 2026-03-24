import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  role: { 
    type: String, 
    enum: ["admin", "staff", "driver"],
    default: "staff" 
  },
  
  restaurantId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Restaurant", 
    required: true 
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);