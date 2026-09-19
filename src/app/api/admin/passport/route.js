// src/app/api/admin/passport/route.js
// Serves passport files from PRIVATE_UPLOADS_DIR (outside /public, never
// directly web-accessible) after checking the admin session cookie on every
// request. This is the route getPassportSignedUrl() in inquiries/actions.js
// points to.
//
// Passports are saved to <APP_ROOT>/private-uploads/passports/<filename> by
// src/app/api/admin/upload/route.js. APP_ROOT (set in app.js) is used here
// instead of process.cwd() because on this host process.cwd() at runtime
// doesn't reliably match the actual app folder.

import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import fs from "fs/promises";
import path from "path";

const APP_ROOT = process.env.APP_ROOT || process.cwd();
const PRIVATE_DIR = path.join(APP_ROOT, "private-uploads", "passports");

export async function GET(request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const requestedPath = searchParams.get("path");
  if (!requestedPath) {
    return NextResponse.json({ error: "Missing path" }, { status: 400 });
  }

  // Only allow the bare filename — strips any ../ path traversal attempt.
  const filename = path.basename(requestedPath);
  const filePath = path.join(PRIVATE_DIR, filename);

  try {
    const file = await fs.readFile(filePath);
    const ext = path.extname(filename).toLowerCase();
    const contentType =
      ext === ".pdf"
        ? "application/pdf"
        : ext === ".png"
          ? "image/png"
          : "image/jpeg";

    return new NextResponse(file, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `inline; filename="${filename}"`,
      },
    });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
