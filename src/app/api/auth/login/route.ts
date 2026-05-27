import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const { email, password } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    const lowerEmail = email.toLowerCase();

    // Find user in database
    let user = await User.findOne({ email: lowerEmail });

    // Special handling for admin/demo login bypass:
    // If it's a naazamusement.com email, and user doesn't exist, we auto-create them.
    const isMockAdmin = lowerEmail.endsWith("@naazamusement.com");

    if (!user) {
      if (isMockAdmin) {
        // Auto-create admin mock user
        const mockName = lowerEmail.split("@")[0];
        const formattedName = mockName.charAt(0).toUpperCase() + mockName.slice(1);
        const defaultPasswordHash = await bcrypt.hash("admin123", 10);
        user = await User.create({
          name: formattedName,
          email: lowerEmail,
          phone: "9026752751",
          password: defaultPasswordHash,
        });
      } else {
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        );
      }
    }

    // Verify password if it is provided
    if (password) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return NextResponse.json(
          { message: "Invalid credentials" },
          { status: 401 }
        );
      }
    } else {
      // If no password is provided, only allow it if it's the mock admin login bypass
      if (!isMockAdmin) {
        return NextResponse.json(
          { message: "Password is required" },
          { status: 400 }
        );
      }
    }

    const response = NextResponse.json({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      phone: user.phone,
      createdAt: user.createdAt,
    });

    if (isMockAdmin) {
      response.cookies.set("naaz-admin", "1", {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
      });
    }

    return response;
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
