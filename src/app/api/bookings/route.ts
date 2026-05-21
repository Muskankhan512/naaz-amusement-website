import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Booking from "@/models/Booking";

export async function GET() {
  try {
    await connectToDatabase();
    const bookingsList = await Booking.find().sort({ createdAt: -1 });

    return NextResponse.json(bookingsList);
  } catch (error: any) {
    console.error("Fetch bookings error:", error);
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const bookingDetails = await request.json();

    if (!bookingDetails.userName || !bookingDetails.userPhone || !bookingDetails.userEmail) {
      return NextResponse.json(
        { message: "Customer name, phone and email are required" },
        { status: 400 }
      );
    }

    const generatedId = `BK_${Math.random().toString(36).substring(2, 11).toUpperCase()}`;

    const newBooking = await Booking.create({
      ...bookingDetails,
      id: generatedId,
      status: bookingDetails.status || "Pending",
    });

    return NextResponse.json(newBooking, { status: 201 });
  } catch (error: any) {
    console.error("Create booking error:", error);
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
