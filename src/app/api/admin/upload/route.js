// src/app/api/admin/upload/route.js
// Replaces every direct browser -> Supabase Storage upload. Files now save
// to local disk instead, matching the migration plan's "custom file storage"
// step. The three client helpers below (uploadImage, uploadVideo,
// uploadPrivateDocument) all call this same route.
//
// Two kinds, matching the old Supabase RLS split exactly:
//  - kind="public" (default): site images/videos — admin-only, saved under
//    public/uploads/<folder>/ so Next.js serves them directly at
//    /uploads/<folder>/<filename>. Requires an admin session, same as the
//    old bucket's "authenticated only" write policy.
//  - kind="private": passport documents — saved under
//    private-uploads/passports/, OUTSIDE /public so nothing can fetch them
//    directly. Left OPEN to anonymous visitors on purpose — the old
//    Supabase bucket's RLS was "insert=public, select/delete=authenticated
//    only" because real site visitors upload their own passport from the
//    public /contact page. Reading them back is still admin-only, enforced
//    by src/app/api/admin/passport/route.js.

import { NextResponse } from "next/server";
import { requireSession } from "@/lib/auth";
import fs from "fs/promises";
import path from "path";

// On some hosts (e.g. cPanel's Node.js App Manager) process.cwd() does NOT
// match the folder the custom server (app.js) actually points Next.js at
// via `dir: __dirname`. When that happens, files saved here based on
// process.cwd() land in a different folder than the one Next.js serves
// /public from, producing 404s on files that really do exist on disk.
// app.js sets APP_ROOT to its own __dirname so this route always agrees
// with what Next.js is actually serving.
const APP_ROOT = process.env.APP_ROOT || process.cwd();

const MAX_SIZE = 25 * 1024 * 1024; // 25MB safety net — real per-type limits are enforced client-side before this is ever called

function sanitizeSegment(segment, fallback) {
  const cleaned = (segment || "").toString().replace(/[^a-zA-Z0-9_-]/g, "");
  return cleaned || fallback;
}

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get("file");
  const kind = formData.get("kind") === "private" ? "private" : "public";
  const folder = sanitizeSegment(formData.get("folder"), "general");

  // Only the public (site content) path requires an admin session — the
  // private/passport path must stay open for anonymous contact-form
  // submissions, matching the original bucket's public-insert policy.
  if (kind === "public") {
    try {
      await requireSession();
    } catch {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      {
        error: `File is ${(file.size / 1024 / 1024).toFixed(1)}MB — maximum allowed is 25MB.`,
      },
      { status: 400 },
    );
  }

  const ext = sanitizeSegment(file.name?.split(".").pop(), "bin").toLowerCase();
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  if (kind === "private") {
    // Always flat under private-uploads/passports/ — matches the fixed
    // PRIVATE_DIR in src/app/api/admin/passport/route.js exactly.
    const dir = path.join(APP_ROOT, "private-uploads", "passports");
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(path.join(dir, filename), buffer);
    return NextResponse.json({ path: `passports/${filename}` });
  }

  const dir = path.join(APP_ROOT, "public", "uploads", folder);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, filename), buffer);
  return NextResponse.json({ url: `/api/files/${folder}/${filename}` });
}
