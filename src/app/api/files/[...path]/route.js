// src/app/api/files/[...path]/route.js
// Serves files from public/uploads/ ourselves instead of relying on
// Next.js's automatic /public static-file serving, which this host isn't
// reliably picking up for files written at runtime. Since this is an
// ordinary Next.js route, any request that reaches the app at all — which
// we've confirmed happens, since /api/admin/upload's POST works — is
// served correctly here, regardless of static-file quirks in front of
// Node on this host.

import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const APP_ROOT = process.env.APP_ROOT || process.cwd();

const CONTENT_TYPES = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
  mp4: "video/mp4",
  mov: "video/quicktime",
  webm: "video/webm",
};

export async function GET(request, { params }) {
  const segments = (await params).path || [];
  // Guard against path traversal — every segment must be a plain filename
  // component, never "..", a slash, or anything else.
  if (
    segments.length === 0 ||
    segments.some((s) => !/^[a-zA-Z0-9_.-]+$/.test(s))
  ) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const filePath = path.join(APP_ROOT, "public", "uploads", ...segments);

  try {
    const buffer = await fs.readFile(filePath);
    const ext = segments[segments.length - 1].split(".").pop().toLowerCase();
    const contentType = CONTENT_TYPES[ext] || "application/octet-stream";
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
