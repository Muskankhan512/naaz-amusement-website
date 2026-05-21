import mongoose, { Schema } from "mongoose";

const BookingSchema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    date: { type: Date, required: true },
    eventType: { type: String, required: true },
    guests: { type: Number, required: true },
    selectedRides: { type: [String], default: [] },
    distanceSlab: { 
      type: String, 
      enum: ["inside", "medium", "far"], 
      default: "inside" 
    },
    totalPrice: { type: Number, required: true },
    status: { 
      type: String, 
      enum: ["Pending", "Confirmed"], 
      default: "Pending" 
    },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    userPhone: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
