"use server";
import { query } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function getFaqItems() {
  return query("select * from faq_items order by category asc, sort_order asc");
}

export async function getFaqItemById(id) {
  const rows = await query("select * from faq_items where id = $1", [id]);
  if (!rows[0]) throw new Error("FAQ item not found");
  return rows[0];
}

export async function createFaqItem(formData) {
  await requireSession();
  const rows = await query(
    `insert into faq_items (category, question, answer)
     values ($1, $2, $3)
     returning *`,
    [formData.category, formData.question, formData.answer],
  );

  revalidatePath("/admin/faq");
  revalidatePath("/faq");
  return rows[0];
}

export async function updateFaqItem(id, formData) {
  await requireSession();
  await query(
    "update faq_items set category = $1, question = $2, answer = $3 where id = $4",
    [formData.category, formData.question, formData.answer, id],
  );

  revalidatePath("/admin/faq");
  revalidatePath("/faq");
}

export async function deleteFaqItem(id) {
  await requireSession();
  await query("delete from faq_items where id = $1", [id]);

  revalidatePath("/admin/faq");
  revalidatePath("/faq");
}
