"use server";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getNotifications() {
  const supabase = await createClient();

  const [inquiriesRes, newsletterRes] = await Promise.all([
    supabase
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false }),
    supabase
      .from("newsletter_signups")
      .select("*")
      .order("created_at", { ascending: false }),
  ]);

  if (inquiriesRes.error) throw new Error(inquiriesRes.error.message);
  if (newsletterRes.error) throw new Error(newsletterRes.error.message);

  const inquiries = inquiriesRes.data.map((i) => ({
    id: `inquiry-${i.id}`,
    rawId: i.id,
    table: "inquiries",
    type: "inquiry",
    title: "New booking inquiry",
    detail: `${i.fullname} — ${i.preferred_trip || "Custom trip"}${i.travel_dates ? `, ${i.travel_dates}` : ""}`,
    time: i.created_at,
    read: i.read,
  }));

  const newsletter = newsletterRes.data.map((n) => ({
    id: `newsletter-${n.id}`,
    rawId: n.id,
    table: "newsletter_signups",
    type: "newsletter",
    title: "New newsletter signup",
    detail: `${n.email} subscribed`,
    time: n.created_at,
    read: n.read,
  }));

  return [...inquiries, ...newsletter].sort(
    (a, b) => new Date(b.time) - new Date(a.time),
  );
}

export async function markNotificationRead(table, rawId) {
  const supabase = await createClient();
  const { error } = await supabase
    .from(table)
    .update({ read: true })
    .eq("id", rawId);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/notifications");
}

export async function markAllNotificationsRead() {
  const supabase = await createClient();
  await supabase.from("inquiries").update({ read: true }).eq("read", false);
  await supabase
    .from("newsletter_signups")
    .update({ read: true })
    .eq("read", false);
  revalidatePath("/admin/notifications");
}

export async function dismissNotification(table, rawId) {
  const supabase = await createClient();
  const { error } = await supabase.from(table).delete().eq("id", rawId);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/notifications");
}

export async function getUnreadCount() {
  const supabase = await createClient();
  const [inquiriesRes, newsletterRes] = await Promise.all([
    supabase
      .from("inquiries")
      .select("id", { count: "exact", head: true })
      .eq("read", false),
    supabase
      .from("newsletter_signups")
      .select("id", { count: "exact", head: true })
      .eq("read", false),
  ]);
  return (inquiriesRes.count || 0) + (newsletterRes.count || 0);
}
