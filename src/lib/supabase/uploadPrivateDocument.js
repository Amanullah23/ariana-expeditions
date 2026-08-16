import { createClient } from "@/lib/supabase/client";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function uploadPrivateDocument(file, folder = "passports") {
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(
      `That file is ${(file.size / 1024 / 1024).toFixed(1)}MB — the maximum allowed size is 5MB.`,
    );
  }

  const supabase = createClient();

  const ext = file.name.split(".").pop();
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const { error } = await supabase.storage
    .from("private-documents")
    .upload(fileName, file, { cacheControl: "3600", upsert: false });

  if (error) throw new Error(error.message);

  // No public URL — this returns just the storage path, since the file is private.
  // Viewing it later requires generating a time-limited signed URL from the admin panel.
  return fileName;
}
