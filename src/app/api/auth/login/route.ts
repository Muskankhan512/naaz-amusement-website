import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

const ADMIN_COOKIE = "naaz-admin";
const DEFAULT_ADMIN_EMAIL = "admin@naazamusement.com";
const DEFAULT_ADMIN_PASSWORD = "admin123";
const DEFAULT_ADMIN_NAME = "Admin";
const DEFAULT_ADMIN_PHONE = "9026752751";

type LoginUser = {
  _id: { toString: () => string };
  name: string;
  email: string;
  phone: string;
  password: string;
  createdAt: Date;
  save: () => Promise<unknown>;
};

function getAdminCredentials() {
  return {
    email: (process.env.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL).trim().toLowerCase(),
    password: process.env.ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD,
    name: (process.env.ADMIN_NAME || DEFAULT_ADMIN_NAME).trim(),
    phone: (process.env.ADMIN_PHONE || DEFAULT_ADMIN_PHONE).trim(),
  };
}

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
    const adminCredentials = getAdminCredentials();
    const isConfiguredAdmin = lowerEmail === adminCredentials.email;
    const isDomainAdmin = lowerEmail.endsWith("@naazamusement.com");

    if (!lowerEmail) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    // Find user in database
    let user = await User.findOne({ email: lowerEmail });

    if (isConfiguredAdmin) {
      const usesConfiguredPassword =
        !suppliedPassword || suppliedPassword === adminCredentials.password;

      if (!user) {
        if (!usesConfiguredPassword) {
          return NextResponse.json(
            { message: "Invalid credentials" },
            { status: 401 }
          );
        }

        user = await User.create({
          name: adminCredentials.name,
          email: lowerEmail,
          phone: adminCredentials.phone,
          password: await bcrypt.hash(adminCredentials.password, 10),
        });
      } else if (usesConfiguredPassword) {
        const storedPasswordMatches = await bcrypt.compare(
          adminCredentials.password,
          user.password
        );

        if (!storedPasswordMatches) {
          user.password = await bcrypt.hash(adminCredentials.password, 10);
          user.name = user.name || adminCredentials.name;
          user.phone = user.phone || adminCredentials.phone;
          await user.save();
        }
      } else {
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
      }
    } else {
      if (!user) {
        return NextResponse.json(
          { message: "User not found" },
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
    }

    const response = NextResponse.json(userResponse(user));

    if (isDomainAdmin) {
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
