"use server";
import { query } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

// ---- Overall info (singleton) ----

export async function getInfo() {
  const rows = await query("select * from tripadvisor_info limit 1");
  if (!rows[0]) throw new Error("tripadvisor_info row not found");
  return rows[0];
}

export async function updateInfo(id, formData) {
  await requireSession();
  await query(
    `update tripadvisor_info
     set overall_rating = $1, review_count = $2, profile_url = $3, updated_at = now()
     where id = $4`,
    [formData.overallRating, formData.reviewCount, formData.profileUrl, id],
  );

  revalidatePath("/admin/tripadvisor");
  revalidatePath("/");
}

// ---- Reviews ----

export async function getReviews() {
  return query("select * from tripadvisor_reviews order by sort_order asc");
}

export async function getReviewById(id) {
  const rows = await query("select * from tripadvisor_reviews where id = $1", [
    id,
  ]);
  if (!rows[0]) throw new Error("Review not found");
  return rows[0];
}

export async function createReview(formData) {
  await requireSession();

  const countRows = await query("select count(*) from tripadvisor_reviews");
  const sortOrder = Number(countRows[0].count) || 0;

  const rows = await query(
    `insert into tripadvisor_reviews
      (reviewer_name, reviewer_location, review_date, rating, title, excerpt, review_url, sort_order)
     values ($1,$2,$3,$4,$5,$6,$7,$8)
     returning *`,
    [
      formData.reviewerName,
      formData.reviewerLocation,
      formData.reviewDate,
      formData.rating,
      formData.title,
      formData.excerpt,
      formData.reviewUrl,
      sortOrder,
    ],
  );

  revalidatePath("/admin/tripadvisor");
  revalidatePath("/");
  return rows[0];
}

export async function updateReview(id, formData) {
  await requireSession();
  await query(
    `update tripadvisor_reviews set
      reviewer_name=$1, reviewer_location=$2, review_date=$3, rating=$4,
      title=$5, excerpt=$6, review_url=$7
     where id=$8`,
    [
      formData.reviewerName,
      formData.reviewerLocation,
      formData.reviewDate,
      formData.rating,
      formData.title,
      formData.excerpt,
      formData.reviewUrl,
      id,
    ],
  );

  revalidatePath("/admin/tripadvisor");
  revalidatePath("/");
}

export async function deleteReview(id) {
  await requireSession();
  await query("delete from tripadvisor_reviews where id = $1", [id]);

  revalidatePath("/admin/tripadvisor");
  revalidatePath("/");
}

export async function reorderReviews(orderedIds) {
  await requireSession();
  await Promise.all(
    orderedIds.map((id, index) =>
      query("update tripadvisor_reviews set sort_order = $1 where id = $2", [
        index,
        id,
      ]),
    ),
  );

  revalidatePath("/admin/tripadvisor");
  revalidatePath("/");
}
