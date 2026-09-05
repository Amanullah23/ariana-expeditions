import { createClient } from "@/lib/supabase/client";
import { isHeic, heicTo } from "heic-to";

const MAX_DIMENSION = 1920; // longest side, in pixels — plenty sharp, no larger than needed
const JPEG_QUALITY = 0.8; // 80% — strong size reduction with negligible visible quality loss

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

function compressImage(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      let { width, height } = img;

      // Scale down only if the image is larger than our target — never upscale
      if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
        if (width > height) {
          height = Math.round((height * MAX_DIMENSION) / width);
          width = MAX_DIMENSION;
        } else {
          width = Math.round((width * MAX_DIMENSION) / height);
          height = MAX_DIMENSION;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            // If compression fails for any reason, fall back to the original
            // file rather than blocking the upload entirely.
            resolve(file);
            return;
          }
          const newName = file.name.replace(/\.[^.]+$/, "") + ".jpg";
          resolve(new File([blob], newName, { type: "image/jpeg" }));
        },
        "image/jpeg",
        JPEG_QUALITY,
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      // If the browser can't even read the image to compress it, fall back
      // to uploading the original rather than blocking the user entirely.
      resolve(file);
    };

    img.src = objectUrl;
  });
}

export async function uploadImage(file, folder = "general") {
  const normalizedFile = await normalizeImage(file);
  const compressedFile = await compressImage(normalizedFile);

  const supabase = createClient();

  const ext = compressedFile.name.split(".").pop();
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const { error } = await supabase.storage
    .from("site-images")
    .upload(fileName, compressedFile, { cacheControl: "3600", upsert: false });

  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from("site-images").getPublicUrl(fileName);
  return data.publicUrl;
}
