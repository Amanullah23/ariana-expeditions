import { headers } from "next/headers";
import crypto from "crypto";
import { query } from "@/lib/db";

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
    // Note: x-vercel-ip-country was a Vercel-specific header — now that we're
    // off Vercel, this will always read "Unknown" unless Momtaz's proxy sets
    // an equivalent geo header. Left as-is; not worth solving right now.
    const country = headersList.get("x-vercel-ip-country") || "Unknown";

    // Anonymous daily-rotating hash — never store the real IP.
    // Same visitor + same day = same hash. Different day = different hash.
    const today = new Date().toISOString().slice(0, 10);
    const rawFingerprint = `${ip}-${userAgent}-${today}`;
    const visitorHash = crypto
      .createHash("sha256")
      .update(rawFingerprint)
      .digest("hex");

    await query(
      `insert into analytics_events
        (event_type, path, action_name, referrer, country, device, visitor_hash)
       values ($1, $2, $3, $4, $5, $6, $7)`,
      [
        body.eventType || "pageview",
        body.path || null,
        body.actionName || null,
        body.referrer || null,
        country,
        getDeviceType(userAgent),
        visitorHash,
      ],
    );

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Analytics tracking error:", err.message);
    return Response.json({ ok: false }, { status: 200 }); // never break the page for this
  }
}
