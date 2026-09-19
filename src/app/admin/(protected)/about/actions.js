"use server";
import { query } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

// ---- Intro (singleton) ----

export async function getIntro() {
  const rows = await query("select * from about_intro limit 1");
  if (!rows[0]) throw new Error("about_intro row not found");
  return rows[0];
}

export async function updateIntro(id, description) {
  await requireSession();
  await query(
    "update about_intro set description = $1, updated_at = now() where id = $2",
    [description, id],
  );

  revalidatePath("/admin/about");
  revalidatePath("/about");
}

// ---- Founders ----

export async function getFounders() {
  return query("select * from founders order by sort_order asc");
}

export async function getFounderById(id) {
  const rows = await query("select * from founders where id = $1", [id]);
  if (!rows[0]) throw new Error("Founder not found");
  return rows[0];
}

export async function createFounder(formData) {
  await requireSession();

  const countRows = await query("select count(*) from founders");
  const sortOrder = Number(countRows[0].count) || 0;

  const rows = await query(
    `insert into founders (full_name, position, bio, image, sort_order)
     values ($1, $2, $3, $4, $5)
     returning *`,
    [
      formData.fullName,
      formData.position,
      formData.bio,
      formData.image,
      sortOrder,
    ],
  );

  revalidatePath("/admin/about");
  revalidatePath("/about");
  return rows[0];
}

export async function updateFounder(id, formData) {
  await requireSession();
  await query(
    "update founders set full_name = $1, position = $2, bio = $3, image = $4 where id = $5",
    [formData.fullName, formData.position, formData.bio, formData.image, id],
  );

  revalidatePath("/admin/about");
  revalidatePath("/about");
}

export async function deleteFounder(id) {
  await requireSession();
  await query("delete from founders where id = $1", [id]);

  revalidatePath("/admin/about");
  revalidatePath("/about");
}

export async function reorderFounders(orderedIds) {
  await requireSession();
  await Promise.all(
    orderedIds.map((id, index) =>
      query("update founders set sort_order = $1 where id = $2", [index, id]),
    ),
  );

  revalidatePath("/admin/about");
  revalidatePath("/about");
}

// ---- Licenses ----

export async function getLicenses() {
  return query("select * from licenses order by sort_order asc");
}

export async function getLicenseById(id) {
  const rows = await query("select * from licenses where id = $1", [id]);
  if (!rows[0]) throw new Error("License not found");
  return rows[0];
}

export async function createLicense(formData) {
  await requireSession();

  const countRows = await query("select count(*) from licenses");
  const sortOrder = Number(countRows[0].count) || 0;

  const rows = await query(
    `insert into licenses (title, description, image, license_number, sort_order)
     values ($1, $2, $3, $4, $5)
     returning *`,
    [
      formData.title,
      formData.description,
      formData.image,
      formData.licenseNumber,
      sortOrder,
    ],
  );

  revalidatePath("/admin/about");
  revalidatePath("/about");
  return rows[0];
}

export async function updateLicense(id, formData) {
  await requireSession();
  await query(
    "update licenses set title = $1, description = $2, image = $3, license_number = $4 where id = $5",
    [
      formData.title,
      formData.description,
      formData.image,
      formData.licenseNumber,
      id,
    ],
  );

  revalidatePath("/admin/about");
  revalidatePath("/about");
}

export async function deleteLicense(id) {
  await requireSession();
  await query("delete from licenses where id = $1", [id]);

  revalidatePath("/admin/about");
  revalidatePath("/about");
}

export async function reorderLicenses(orderedIds) {
  await requireSession();
  await Promise.all(
    orderedIds.map((id, index) =>
      query("update licenses set sort_order = $1 where id = $2", [index, id]),
    ),
  );

  revalidatePath("/admin/about");
  revalidatePath("/about");
}
