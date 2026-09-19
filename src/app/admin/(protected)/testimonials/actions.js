"use server";
import { query } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function getTestimonials() {
  return query("select * from testimonials order by created_at desc");
}

export async function getTestimonialById(id) {
  const rows = await query("select * from testimonials where id = $1", [id]);
  if (!rows[0]) throw new Error("Testimonial not found");
  return rows[0];
}

export async function createTestimonial(formData) {
  await requireSession();

  const slug =
    formData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") +
    "-" +
    Math.random().toString(36).slice(2, 8);

  const countRows = await query("select count(*) from testimonials");
  const sortOrder = Number(countRows[0].count) || 0;

  const rows = await query(
    `insert into testimonials (slug, name, location, quote, img, sort_order)
     values ($1, $2, $3, $4, $5, $6)
     returning *`,
    [
      slug,
      formData.name,
      formData.location,
      formData.quote,
      formData.imagePreview,
      sortOrder,
    ],
  );

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  revalidatePath("/testimonials");
  return rows[0];
}

export async function updateTestimonial(id, formData) {
  await requireSession();
  await query(
    "update testimonials set name = $1, location = $2, quote = $3, img = $4 where id = $5",
    [
      formData.name,
      formData.location,
      formData.quote,
      formData.imagePreview,
      id,
    ],
  );

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}

export async function deleteTestimonial(id) {
  await requireSession();
  await query("delete from testimonials where id = $1", [id]);

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}
