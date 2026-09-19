"use server";
import { query } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

// SQL identifiers (table names) can't be parameterized like values can, so
// any table name coming from the client must be checked against this
// allowlist before being interpolated into a query string.
const ALLOWED_TABLES = new Set(["inquiries", "newsletter_signups"]);

function assertAllowedTable(table) {
  if (!ALLOWED_TABLES.has(table)) {
    throw new Error(`Invalid table: ${table}`);
  }
}

export async function getNotifications() {
  await requireSession();

  const [inquiries, newsletter] = await Promise.all([
    query("select * from inquiries order by created_at desc"),
    query("select * from newsletter_signups order by created_at desc"),
  ]);

  const inquiryNotifications = inquiries.map((i) => ({
    id: `inquiry-${i.id}`,
    rawId: i.id,
    table: "inquiries",
    type: "inquiry",
    title: "New booking inquiry",
    detail: `${i.fullname} — ${i.preferred_trip || "Custom trip"}${i.travel_dates ? `, ${i.travel_dates}` : ""}`,
    time: i.created_at,
    read: i.read,
  }));

  const newsletterNotifications = newsletter.map((n) => ({
    id: `newsletter-${n.id}`,
    rawId: n.id,
    table: "newsletter_signups",
    type: "newsletter",
    title: "New newsletter signup",
    detail: `${n.email} subscribed`,
    time: n.created_at,
    read: n.read,
  }));

  return [...inquiryNotifications, ...newsletterNotifications].sort(
    (a, b) => new Date(b.time) - new Date(a.time),
  );
}

export async function markNotificationRead(table, rawId) {
  await requireSession();
  assertAllowedTable(table);
  await query(`update ${table} set read = true where id = $1`, [rawId]);
  revalidatePath("/admin/notifications");
}

export async function markAllNotificationsRead() {
  await requireSession();
  await query("update inquiries set read = true where read = false");
  await query("update newsletter_signups set read = true where read = false");
  revalidatePath("/admin/notifications");
}

export async function dismissNotification(table, rawId) {
  await requireSession();
  assertAllowedTable(table);
  await query(`delete from ${table} where id = $1`, [rawId]);
  revalidatePath("/admin/notifications");
}

export async function getUnreadCount() {
  const [inquiriesCount, newsletterCount] = await Promise.all([
    query("select count(*) from inquiries where read = false"),
    query("select count(*) from newsletter_signups where read = false"),
  ]);
  return Number(inquiriesCount[0].count) + Number(newsletterCount[0].count);
}
