// src/app/api/admin/create-user/route.js
// Convenience endpoint for creating a new admin_users login, since
// phpPgAdmin's SQL tool on this host wraps every query for row-count
// pagination and breaks on INSERT. Protected by requireSession() so only
// an already-logged-in admin can call it — never exposed publicly.

import { NextResponse } from "next/server";
import { requireSession } from "@/lib/auth";
import { query } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    await requireSession();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { email, password } = await request.json();
  if (!email || !password) {
    return NextResponse.json(
      { error: "Missing email or password" },
      { status: 400 },
    );
  }

  const passwordHash = await bcrypt.hash(password, 10);

  try {
    await query(
      "insert into admin_users (email, password_hash) values ($1, $2)",
      [email, passwordHash],
    );
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
