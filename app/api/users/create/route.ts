import { writeFile } from "fs/promises";
import { existsSync, mkdirSync } from "fs";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { hash } from "bcrypt";

import { prisma } from "@/lib/prisma";

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || "12", 10);

const uploadDir = join(process.cwd(), "public/uploads/users");

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const name = data.get("name")?.toString();
  const email = data.get("email")?.toString();
  const password = data.get("password")?.toString();

  if (!name || !email || !password) {
    return new NextResponse("Missing required fields", { status: 400 });
  }

  const passwordHash = await hash(password, SALT_ROUNDS);
  const file = data.get("file") as File;

  // Ensure the upload directory exists
  if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir, { recursive: true });
  }

  let filePath;
  if (file.name) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    // Save the file
    filePath = join(uploadDir, file.name);
    await writeFile(filePath, buffer);
  }
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash,
        image: file.name ? `/uploads/users/${file.name}` : null,
      },
    });
    console.log(user);

    return NextResponse.json({
      success: true,
      message: "User created",
      user_id: user.id,
    });
  } catch (error) {
    const message =
      error.code == "P2002" && error.meta?.target.includes("email")
        ? "Email already exists"
        : "Error saving user data";

    return NextResponse.json({
      success: false,
      message: message,
    });
  }
}
