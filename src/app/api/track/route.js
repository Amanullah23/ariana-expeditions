import { createClient } from "@supabase/supabase-js";
import { headers } from "next/headers";
import crypto from "crypto";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

function getDeviceType(userAgent) {
  if (/mobile|android|iphone|ipad/i.test(userAgent || "")) return "Mobile";
  return "Desktop";
}

export async function POST(request) {
  try {
    const body = await request.json();
    const headersList = await headers();

    const ip =
      headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      headersList.get("x-real-ip") ||
      "unknown";
    const userAgent = headersList.get("user-agent") || "";
    const country = headersList.get("x-vercel-ip-country") || "Unknown";

    // Anonymous daily-rotating hash — never store the real IP.
    // Same visitor + same day = same hash. Different day = different hash.
    const today = new Date().toISOString().slice(0, 10);
    const rawFingerprint = `${ip}-${userAgent}-${today}`;
    const visitorHash = crypto
      .createHash("sha256")
      .update(rawFingerprint)
      .digest("hex");

    const { error } = await supabase.from("analytics_events").insert({
      event_type: body.eventType || "pageview",
      path: body.path || null,
      action_name: body.actionName || null,
      referrer: body.referrer || null,
      country,
      device: getDeviceType(userAgent),
      visitor_hash: visitorHash,
    });

    if (error) {
      console.error("Analytics insert failed:", error.message);
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Analytics tracking error:", err.message);
    return Response.json({ ok: false }, { status: 200 }); // never break the page for this
  }
}
