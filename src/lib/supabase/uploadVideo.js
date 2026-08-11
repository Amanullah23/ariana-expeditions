import { createClient } from "@/lib/supabase/client";

const MAX_VIDEO_SIZE = 20 * 1024 * 1024; // 20MB, hard limit

export async function uploadVideo(file, folder = "videos") {
  if (file.size > MAX_VIDEO_SIZE) {
    throw new Error(
      `That video is ${(file.size / 1024 / 1024).toFixed(1)}MB — the maximum allowed size is 20MB. Please compress it and try again.`,
    );
  }

  if (!file.type.startsWith("video/")) {
    throw new Error("Please select a valid video file.");
  }

  const supabase = createClient();

  const ext = file.name.split(".").pop();
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const { error } = await supabase.storage
    .from("site-images")
    .upload(fileName, file, { cacheControl: "3600", upsert: false });

  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from("site-images").getPublicUrl(fileName);
  return data.publicUrl;
}
