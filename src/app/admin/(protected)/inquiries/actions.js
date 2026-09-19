"use server";
import { query } from "@/lib/db";
import { requireSession } from "@/lib/auth";

export async function getInquiries() {
  await requireSession();
  return query("select * from inquiries order by created_at desc");
}

export async function getPassportSignedUrl(path) {
  if (!path) return null;
  // Local disk storage has no time-limited signed URL like Supabase Storage did.
  // Instead, access is checked live on every request by the session cookie
  // inside /api/admin/passport — see that route handler. Equally private,
  // just checked continuously rather than via a 5-minute expiring token.
  return `/api/admin/passport?path=${encodeURIComponent(path)}`;
}
