import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

import { writeFile } from "fs/promises";
import { existsSync, mkdirSync, unlinkSync } from "fs";
import { join } from "path";
import { hash } from "bcrypt";

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || "12", 10);

const uploadDir = join(process.cwd(), "public/uploads/users");
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return new NextResponse("User ID is required", { status: 400 });
  }
  const userId = parseInt(id, 10);
  if (isNaN(userId)) {
    return new NextResponse("Invalid user ID", { status: 400 });
  }
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    return new NextResponse("Error fetching user data", { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const data = await request.formData();
  const name = data.get("name")?.toString();
  const email = data.get("email")?.toString();
  const password = data.get("password")?.toString();
  const file = data.get("file") as File;

  const userId = parseInt(id, 10);
  if (isNaN(userId)) {
    return new NextResponse("Invalid User ID", { status: 400 });
  }

  if (!name && !email && !password && !file) {
    return new NextResponse("No data to update", { status: 400 });
  }

  // Retrieve the current user to get the existing image path
  let currentImagePath: string | null = null;
  try {
    const currentUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { image: true },
    });

    if (currentUser) {
      currentImagePath = currentUser.image;
    }
  } catch (error) {
    return new NextResponse("Error fetching current user data", {
      status: 500,
    });
  }

  let passwordHash: string | undefined = undefined;
  if (password) {
    passwordHash = await hash(password, SALT_ROUNDS);
  }

  let newFilePath: string | null = null;
  if (file && file.name) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure the upload directory exists
    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir, { recursive: true });
    }

    // Save the new file
    newFilePath = join(uploadDir, file.name);
    await writeFile(newFilePath, buffer);
  }

  try {
    // Update the user in the database
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        email,
        password: passwordHash,
        image: newFilePath ? `/uploads/users/${file.name}` : null,
      },
    });
    // Delete the old image if it exists
    if (
      currentImagePath &&
      (!newFilePath || newFilePath !== currentImagePath)
    ) {
      if (existsSync("public" + currentImagePath)) {
        unlinkSync("public" + currentImagePath);
      }
    }

    return NextResponse.json({
      success: true,
      message: "User updated",
      user_id: updatedUser.id,
    });
  } catch (error) {
    const message =
      error.code == "P2002" && error.meta?.target.includes("email")
        ? "Email already exists"
        : "Error updating user data";

    return NextResponse.json({
      success: false,
      message: message,
    });
  }
}
