import { createClient } from "@/lib/supabase/client";
import { isHeic, heicTo } from "heic-to";

async function normalizeImage(file) {
  // HEIC/HEIF (common on iPhone photos) isn't viewable in any browser —
  // convert it to a real JPEG before it ever reaches Supabase or next/image.
  const looksLikeHeic =
    file.type === "image/heic" ||
    file.type === "image/heif" ||
    /\.(heic|heif)$/i.test(file.name);

  if (!looksLikeHeic) return file;

  try {
    const isActuallyHeic = await isHeic(file);
    if (!isActuallyHeic) return file;

    const converted = await heicTo({
      blob: file,
      type: "image/jpeg",
      quality: 0.85,
    });

    const newName = file.name.replace(/\.(heic|heif)$/i, ".jpg");
    return new File([converted], newName, { type: "image/jpeg" });
  } catch (err) {
    throw new Error(
      "This photo couldn't be converted automatically. Please export it as JPEG or PNG from your phone/computer and try again.",
    );
  }
}

export async function uploadImage(file, folder = "general") {
  const normalizedFile = await normalizeImage(file);

  const supabase = createClient();

  const ext = normalizedFile.name.split(".").pop();
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const { error } = await supabase.storage
    .from("site-images")
    .upload(fileName, normalizedFile, { cacheControl: "3600", upsert: false });

  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from("site-images").getPublicUrl(fileName);
  return data.publicUrl;
}
