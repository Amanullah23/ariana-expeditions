"use server";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getFaqItems() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("faq_items")
    .select("*")
    .order("category")
    .order("sort_order");

  if (error) throw new Error(error.message);
  return data;
}

export async function getFaqItemById(id) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("faq_items")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function createFaqItem(formData) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("faq_items")
    .insert({
      category: formData.category,
      question: formData.question,
      answer: formData.answer,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/admin/faq");
  revalidatePath("/faq");
  return data;
}

export async function updateFaqItem(id, formData) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("faq_items")
    .update({
      category: formData.category,
      question: formData.question,
      answer: formData.answer,
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/faq");
  revalidatePath("/faq");
}

export async function deleteFaqItem(id) {
  const supabase = await createClient();
  const { error } = await supabase.from("faq_items").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/faq");
  revalidatePath("/faq");
}
