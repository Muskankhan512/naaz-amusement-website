import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { isAdminEmail } from "@/lib/admin";
import User from "@/models/User";
import bcrypt from "bcryptjs";

const ADMIN_COOKIE = "naaz-admin";

type LoginUser = {
  _id: { toString: () => string };
  name: string;
  email: string;
  phone: string;
  password: string;
  createdAt: Date;
  save: () => Promise<unknown>;
};

function userResponse(user: LoginUser) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    phone: user.phone,
    createdAt: user.createdAt,
  };
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Internal Server Error";
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const { email, password } = await request.json();
    const lowerEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
    const suppliedPassword = typeof password === "string" ? password : "";
    const isAdmin = isAdminEmail(lowerEmail);

    if (!lowerEmail) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email: lowerEmail });

    if (!user) {
      return NextResponse.json(
        { message: isAdmin ? "Admin account not found" : "User not found" },
        { status: 404 }
      );
    }

    if (!suppliedPassword) {
      return NextResponse.json(
        { message: "Password is required" },
        { status: 400 }
      );
    }

    const storedPasswordMatches = await bcrypt.compare(
      suppliedPassword,
      user.password
    );

    if (!storedPasswordMatches) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const response = NextResponse.json(userResponse(user));

    if (isAdmin) {
      response.cookies.set(ADMIN_COOKIE, "1", {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
      });
    }

    return response;
  } catch (error: unknown) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: getErrorMessage(error) },
      { status: 500 }
    );
  }
}
