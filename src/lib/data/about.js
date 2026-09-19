import { query } from "@/lib/db";

export async function getAboutIntro() {
  try {
    const rows = await query("select * from about_intro limit 1");
    return rows[0] || null;
  } catch (err) {
    console.error("Failed to load about intro:", err.message);
    return null;
  }
}

export async function getPublicFounders() {
  try {
    return await query("select * from founders order by sort_order asc");
  } catch (err) {
    console.error("Failed to load founders:", err.message);
    return [];
  }
}

export async function getPublicLicenses() {
  try {
    return await query("select * from licenses order by sort_order asc");
  } catch (err) {
    console.error("Failed to load licenses:", err.message);
    return [];
  }
}
