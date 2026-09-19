"use server";
import { redirect } from "next/navigation";
import { verifyLogin, createSession } from "@/lib/auth";

export async function login(formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const admin = await verifyLogin(email, password);
  if (!admin) {
    return { error: "Invalid email or password" };
  }

  await createSession(admin.id);
  redirect("/admin");
}
