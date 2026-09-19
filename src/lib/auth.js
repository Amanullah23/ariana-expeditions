// src/lib/auth.js
// Replaces Supabase Auth. Plain email/password + bcrypt + httpOnly session
// cookie, session validity checked against the `sessions` table on every
// protected request (per the migration plan — no JWT, no 2FA).

import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { query } from "./db";

const SESSION_COOKIE = "ariana_session";
const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

export async function verifyLogin(email, password) {
  const rows = await query(
    "select id, password_hash from admin_users where email = $1",
    [email],
  );
  const admin = rows[0];
  if (!admin) return null;

  const valid = await bcrypt.compare(password, admin.password_hash);
  if (!valid) return null;

  return { id: admin.id };
}

export async function createSession(adminId) {
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);
  const rows = await query(
    "insert into sessions (admin_id, expires_at) values ($1, $2) returning id",
    [adminId, expiresAt],
  );
  const sessionId = rows[0].id;

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });
}

export async function destroySession() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE)?.value;
  if (sessionId) {
    await query("delete from sessions where id = $1", [sessionId]);
  }
  cookieStore.delete(SESSION_COOKIE);
}

/**
 * Read-only check. Returns the session row (with admin email) if the cookie
 * is present and not expired, otherwise null. Lazily deletes expired rows.
 * Use in Server Components / layouts, where you can act on null yourself.
 */
export async function getSession() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE)?.value;
  if (!sessionId) return null;

  const rows = await query(
    `select s.id, s.admin_id, s.expires_at, a.email
     from sessions s join admin_users a on a.id = s.admin_id
     where s.id = $1`,
    [sessionId],
  );
  const session = rows[0];
  if (!session) return null;

  if (new Date(session.expires_at) < new Date()) {
    await query("delete from sessions where id = $1", [sessionId]);
    return null;
  }

  return session;
}

/**
 * Hard-stop version for Server Actions (per spec item: "checked manually in
 * each Server Action"). Throws if not logged in — catch this in the action
 * or let it surface as an error boundary.
 */
export async function requireSession() {
  const session = await getSession();
  if (!session) {
    throw new Error("Not authenticated");
  }
  return session;
}
