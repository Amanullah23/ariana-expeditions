import { createClient } from "@/lib/supabase/client";

export async function uploadImage(file, folder = "general") {
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
