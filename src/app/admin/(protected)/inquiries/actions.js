"use server";
import { createClient } from "@/lib/supabase/server";

export async function getInquiries() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

export async function getPassportSignedUrl(path) {
  if (!path) return null;
  const supabase = await createClient();
  const { data, error } = await supabase.storage
    .from("private-documents")
    .createSignedUrl(path, 300); // valid for 5 minutes

  if (error) {
    console.error("Failed to generate signed URL:", error.message);
    return null;
  }
  return data.signedUrl;
}
