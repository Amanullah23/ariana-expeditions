// src/lib/supabase/uploadVideo.js
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

  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);

  const res = await fetch("/api/admin/upload", {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Upload failed");
  return data.url;
}
