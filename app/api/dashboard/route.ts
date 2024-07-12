// app/api/dashboard/route.ts
import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  try {
    const users = await prisma.user.findMany();

    const statsData = {
      totalUsers: users.length,
    };
    return NextResponse.json(statsData);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
