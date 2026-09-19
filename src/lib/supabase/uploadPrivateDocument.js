// src/lib/supabase/uploadPrivateDocument.js
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function uploadPrivateDocument(file, folder = "passports") {
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(
      `That file is ${(file.size / 1024 / 1024).toFixed(1)}MB — the maximum allowed size is 5MB.`,
    );
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);
  formData.append("kind", "private");

  const res = await fetch("/api/admin/upload", {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Upload failed");
  // No public URL — this returns just the storage-relative path, since the
  // file is private. Viewing it later goes through the admin-only
  // /api/admin/passport route instead of a signed URL.
  return data.path;
}
