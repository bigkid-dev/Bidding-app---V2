import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "not found, lol" }, { status: 404 });
}
